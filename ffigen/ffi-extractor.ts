import { exec } from "../mod.ts";
import { CEnum, CFunction, CSymbol, CType, CTypeDef, CUnion } from "./types.ts";

export type LibInfo = {
  name: string;
  mapName: (name: string) => string;
  formatLocation: (location: string) => string;
  getTypeInfo: (
    ctx: GetTypeInfoContext,
    next: (ctx: GetTypeInfoContext) => TypeInfo,
  ) => TypeInfo;
  symbols: CSymbol[];
  exposedFunctions: string[];
  typeDefs: Map<string, TypeDef>;
};

export type FFIInfo = {
  lib: LibInfo;
  enums: Map<string, EnumDef>;
  unions: Map<string, UnionDef>;
  typeDefs: Map<string, TypeDef>;
  functions: Map<string, FunctionDef>;
};

export type GetTypeInfoContext = {
  type: CType;
  name: string | null;
  lib: LibInfo;
};

export type TypeDef = {
  originalName: string;
  location: string;
  type: TypeInfo;
};

export type EnumDef = TypeDef & {
  fields: { name: string; value: number }[];
};

export type UnionDef = TypeDef & {
  bitSize: number;
  bitAlignment: number;
  fields: {
    bitSize: number;
    bitAlignment: number;
    type: TypeInfo;
  }[];
};

export type TypeInfo = { tsType: string; nativeType: string };

export type FunctionDef = {
  fullName: string;
  location: string;
  parameters: { name: string; type: TypeInfo }[];
  result: TypeInfo;
};

/**
 * Extracts symbol definitions from the header file at path `opts.input`
 * and writes them to `opts.output` file in c2ffi's json format.
 */
export async function extractSymbolDefinitions(
  opts: { input: string; output: string },
) {
  await exec(
    `docker run -v $(pwd):/data glebbash/deno-ffigen-c2ffi ` +
      `/data/${opts.input} > ${opts.output}`,
  );
}

/** Extracts all FFI info from the library described in `lib`. */
export function extractFFIInfo(lib: LibInfo): FFIInfo {
  const symbols = linkTypeDefs(lib.symbols);

  const enums = extractEnums(lib, symbols);
  console.log("Total enums:", enums.size);
  lib.typeDefs = new Map([...lib.typeDefs, ...enums]);

  const unions = extractUnions(lib, symbols);
  console.log("Total unions:", unions.size);
  lib.typeDefs = new Map([...lib.typeDefs, ...unions]);

  const typeDefs = extractTypeDefs(lib, symbols);
  console.log("Total types:", typeDefs.size);
  lib.typeDefs = new Map([...lib.typeDefs, ...typeDefs]);

  const functions = extractFunctions(lib, symbols, lib.exposedFunctions);
  console.log("Total functions:", functions.size);

  return {
    lib,
    enums,
    typeDefs,
    unions,
    functions,
  };
}

function linkTypeDefs(symbols: CSymbol[]): CSymbol[] {
  const result: CSymbol[] = [];
  const unnamedSymbols = new Map<number, CSymbol>();

  for (const symbol of symbols) {
    if (symbol.name === "" && "id" in symbol) {
      unnamedSymbols.set(symbol.id, symbol);
      continue;
    }

    if (symbol.tag === "typedef") {
      const originalSymbol = unnamedSymbols.get(
        (symbol.type as { id: number }).id,
      );
      if (originalSymbol) {
        originalSymbol.name = symbol.name;
        result.push(originalSymbol);
        continue;
      }
    }

    result.push(symbol);
  }

  return result;
}

export function extractEnums(
  lib: LibInfo,
  symbols: CSymbol[],
): Map<string, EnumDef> {
  const enums = symbols.filter((s): s is CEnum => s.tag === "enum");

  return new Map(
    enums.map((e): [string, EnumDef] => {
      return [lib.mapName(e.name), {
        originalName: e.name,
        location: lib.formatLocation(e.location),
        type: { tsType: "enum", nativeType: "FFIType.i32" },
        fields: e.fields.map((v) => ({ name: v.name, value: v.value })),
      }];
    }),
  );
}

export function extractUnions(
  lib: LibInfo,
  symbols: CSymbol[],
): Map<string, UnionDef> {
  const enums = symbols.filter((s): s is CUnion => s.tag === "union");

  return new Map(
    enums.map((u): [string, UnionDef] => {
      return [lib.mapName(u.name), {
        originalName: u.name,
        location: lib.formatLocation(u.location),
        // TODO: check for better union types
        type: { tsType: "unknown", nativeType: "u" + u["bit-size"] },
        bitSize: u["bit-size"],
        bitAlignment: u["bit-alignment"],
        // TODO: check how to handle this: field types depend on type info before this definition
        fields: [],
      }];
    }),
  );
}

export function extractTypeDefs(
  lib: LibInfo,
  symbols: CSymbol[],
): Map<string, TypeDef> {
  const typeDefs = symbols.filter((s): s is CTypeDef => s.tag === "typedef");

  const resultTypeDefs = new Map<string, TypeDef>();

  for (const t of typeDefs) {
    const mappedName = lib.mapName(t.name);
    const typeDef = {
      originalName: t.name,
      location: lib.formatLocation(t.location),
      type: getTypeInfo({ type: t.type, name: mappedName, lib }),
    };
    lib.typeDefs.set(mappedName, typeDef);
    resultTypeDefs.set(mappedName, typeDef);
  }

  return resultTypeDefs;
}

export function extractFunctions(
  lib: LibInfo,
  symbols: CSymbol[],
  exposedFunctions: string[],
): Map<string, FunctionDef> {
  const allFunctions = symbols.filter((s): s is CFunction =>
    s.tag === "function"
  );
  const uniqueFunctions = uniqueByKey(allFunctions, "name");
  const nonInlinedFunctions = uniqueFunctions.filter((f) => !f.inline);
  const functions = nonInlinedFunctions.filter((f) =>
    exposedFunctions.includes(f.name as never)
  );

  return new Map(functions.map((f) => [
    lib.mapName(f.name),
    {
      fullName: f.name,
      location: lib.formatLocation(f.location),
      parameters: f.parameters.map((p, index) => ({
        name: p.name || "_" + index,
        type: getTypeInfo({ type: p.type, name: null, lib }),
      })),
      result: getTypeInfo({ type: f["return-type"], name: null, lib }),
    },
  ]));
}

function uniqueByKey<T>(values: T[], key: keyof T): T[] {
  const seen = new Set<T[keyof T]>();
  const result: T[] = [];

  for (const value of values) {
    const keyValue = value[key];
    if (!seen.has(keyValue)) {
      seen.add(keyValue);
      result.push(value);
    }
  }

  return result;
}

function getTypeInfo(ctx: GetTypeInfoContext): TypeInfo {
  return ctx.lib.getTypeInfo(ctx, getTypeInfoBasic);
}

function getTypeInfoBasic({ type, name, lib }: GetTypeInfoContext): TypeInfo {
  if (type.tag === ":pointer") {
    if (type.type.tag === ":char") {
      console.log('pppppointer',{tag: type.type.tag,name})
      return { tsType: `FFIType.cstring`, nativeType: `FFIType.cstring` };
    }
    if (name === null) {
      const rec = getTypeInfo({ type: type.type, name: null, lib });

      return { tsType: `Pointer<${rec.tsType}>`, nativeType: "FFIType.pointer" };
    }

    return { tsType: `Pointer<"${name}">`, nativeType: "FFIType.pointer" };
  }

  if (type.tag === ":function-pointer") {
    return {
      tsType: name !== null ? `FnPointer<"${name}">` : "FnPointer",
      nativeType: "function",
    };
  }

  if (type.tag === ":struct") {
    return { tsType: `StructPointer<"${type.name}">`, nativeType: "FFIType.pointer" };
  }

  if (type.tag === "struct") {
    if (name === null && type.name !== null) {
      return { tsType: `StructPointer<"${type.name}">`, nativeType: "FFIType.pointer" };
    } else if (name === null && type.name === null) {
      throw new Error("Struct does not have a name: " + JSON.stringify(type));
    }

    return { tsType: `StructPointer<"${name}">`, nativeType: "FFIType.pointer" };
  }

  if (type.tag === "union") {
    // TODO: check for better union types
    return { tsType: `unknown`, nativeType: "u" + type["bit-size"] };
  }

  if (type.tag === ":union") {
    const union = lib.typeDefs.get(lib.mapName(type.name));

    return union!.type;
  }

  if (type.tag === ":void") {
    return { tsType: "FFIType.void", nativeType: "FFIType.void" };
  }

  if (type.tag === "size_t") {
    return { tsType: `FFIType.usize`, nativeType: "FFIType.usize" };
  }

  if (
    (type.tag === ":char" && type["bit-size"] === 8) ||
    (type.tag === ":signed-char" && type["bit-size"] === 8)
  ) {
    return { tsType: `FFIType.i8`, nativeType: "int8_t" };
  }

  if (
    (type.tag === ":_Bool" && type["bit-size"] === 8)
  ) {
    console.log('bool?',{type})
    return { tsType: `FFIType.bool`, nativeType: "FFIType.bool" };
  }
  if (
    (type.tag === ":unsigned-char" && type["bit-size"] === 8)
  ) {
    return { tsType: `FFIType.u8`, nativeType: "FFIType.u8" };
    // return { tsType: `FFIType.u8`, nativeType: "uint8_t" };
  }

  if (
    (type.tag === ":short" && type["bit-size"] === 16)
  ) {
    return { tsType: `FFIType.i16`, nativeType: "FFIType.i16" };
    // return { tsType: `FFIType.i16`, nativeType: "int16_t" };
  }

  if (
    (type.tag === ":unsigned-short" && type["bit-size"] === 16)
  ) {
    return { tsType: `FFIType.u16`, nativeType: "FFIType.u16" };
    // return { tsType: `FFIType.u16`, nativeType: "uint16_t" };
  }

  if (type.tag === ":int" && type["bit-size"] === 32) {
    return { tsType: `FFIType.i32`, nativeType: "FFIType.i32" };
    // return { tsType: `FFIType.i32`, nativeType: "int32_t" };
  }

  if (
    (type.tag === ":unsigned-int" && type["bit-size"] === 32)
  ) {
    return { tsType: `FFIType.u32`, nativeType: "FFIType.u32" };
    // return { tsType: `FFIType.u32`, nativeType: "uint32_t" };
  }

  if (
    (type.tag === ":long" && type["bit-size"] === 64) ||
    (type.tag === ":long-long" && type["bit-size"] === 64)
  ) {
    return { tsType: `FFIType.i64`, nativeType: "FFIType.i64" };
    // return { tsType: `FFIType.i64`, nativeType: "int64_t" };
  }

  if (type.tag === ":float" && type["bit-size"] === 32) {
    return { tsType: `FFIType.f32`, nativeType: "FFIType.f32" };
    // return { tsType: `FFIType.f32`, nativeType: "float" };
  }

  if (type.tag === ":double" && type["bit-size"] === 64) {
    return { tsType: `FFIType.f64`, nativeType: "FFIType.f64" };
    // return { tsType: `FFIType.f64`, nativeType: "double" };
  }

  if (type.tag === ":long-double" && type["bit-size"] === 128) {
    return { tsType: `bigint`, nativeType: "f128" };
  }

  if (
    (type.tag === ":unsigned-long" && type["bit-size"] === 64) ||
    (type.tag === ":unsigned-long-long" && type["bit-size"] === 64)
  ) {
    return { tsType: `FFIType.u64`, nativeType: "FFIType.u64" };
    // return { tsType: `FFIType.u64`, nativeType: "uint64_t" };
  }

  // TODO: check if this works
  if (type.tag === "__builtin_va_list") {
    return {
      tsType: "bigint",
      nativeType: "pointer",
    };
  }

  const typeName = lib.mapName(
    type.tag === ":enum" ? type.name : type.tag,
  );

  const typeDef = lib.typeDefs.get(typeName);

  if (typeDef === undefined) {
    throw new Error(`Unknown type ${JSON.stringify({ type, name })}`);
  }

  return {
    tsType: `${lib.name}.${typeName}`,
    nativeType: typeDef.type.nativeType,
  };
}
