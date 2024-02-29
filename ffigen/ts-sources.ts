import { m } from "https://raw.githubusercontent.com/glebbash/multiline-str/master/src/multiline-str.ts";
import {
  EnumDef,
  FFIInfo,
  FunctionDef,
  LibInfo,
  TypeDef,
} from "./ffi-extractor.ts";

export type LibSources = {
  mod: string;
  types: string;
  symbols: string;
  safeFFI: string;
};

/** Generates TypeScript source code from extracted FFI info. */
export function generateSources(
  { lib, typeDefs, enums, functions }: FFIInfo,
): LibSources {
  const modSource = buildMod(lib);
  const typesSource = buildTypes(lib, typeDefs, enums, functions);
  const symbolsSource = buildSymbols(lib, functions);
  const safeFFISource = buildSafeFFI();

  return {
    mod: modSource,
    types: typesSource,
    symbols: symbolsSource,
    safeFFI: safeFFISource,
  };
}

/** Prints TypeScript source code to files in target `folder`. */
export async function printSources(
  sources: LibSources,
  outputFolder: string,
) {
  await Deno.mkdir(outputFolder, { recursive: true }).catch();
  await Deno.writeTextFile(`${outputFolder}/mod.ts`, sources.mod);
  await Deno.writeTextFile(`${outputFolder}/types.ts`, sources.types);
  await Deno.writeTextFile(`${outputFolder}/symbols.ts`, sources.symbols);
  await Deno.writeTextFile(`${outputFolder}/safe-ffi.ts`, sources.safeFFI);
}

function buildSymbols(
  ctx: LibInfo,
  functions: Map<string, FunctionDef>,
): string {
  const genFuncs = [...functions.entries()].map(([name, f]) => {
    const parameters = f.parameters
      .map((p) => `${p.type.nativeType}`)
      .join(", ");

    return m`
        var ${name} func(${parameters}) ${f.result.nativeType}
      `;
  }).join("\n");
  const genRegisterLibFunc = [...functions.entries()].map(([name, f]) => {
    return m`
        purego.RegisterLibFunc(&${name}, libpact_ffi, "${name}")
      `;
  }).join("\n");

  return m`

      type (
        size_t         uintptr
      )
    ${genFuncs}
    ${genRegisterLibFunc}
    `;
}

function buildTypes(
  ctx: LibInfo,
  typeDefs: Map<string, TypeDef>,
  enums: Map<string, EnumDef>,
  functions: Map<string, FunctionDef>,
): string {
  const typeDefsSource = buildTypeDefs(typeDefs);
  const enumsSource = buildEnums(enums);
  const functionsSource = buildFunctions(functions);

  const namespaceSource = m`
    // deno-lint-ignore-file
    import { Pointer, FnPointer, StructPointer } from "./safe-ffi.ts";

    export namespace ${ctx.name} {
    ${typeDefsSource}

    ${enumsSource}

    ${functionsSource}

      export declare function $$close(): void;
    }

    `;

  return namespaceSource;
}

function buildMod(ctx: LibInfo): string {
  return m`
    import { ${ctx.name} } from "./types.ts";
    import { ${ctx.name}_SYMBOLS } from "./symbols.ts";

    export * from "./safe-ffi.ts";
    export type { ${ctx.name} };

    export function load${ctx.name}(path: string): typeof ${ctx.name} {
      const lib = Deno.dlopen(path, ${ctx.name}_SYMBOLS);

      return { ...lib.symbols, $$close: () => lib.close() } as never;
    }

    `;
}

function buildSafeFFI() {
  return m`
    // deno-lint-ignore-file
    export type Opaque<BaseType, BrandType = unknown> = BaseType & {
      readonly [Symbols.base]: BaseType;
      readonly [Symbols.brand]: BrandType;
    };

    export type Pointer<T = string> = Opaque<bigint, T>;
    export type FnPointer<T = string> = Pointer<T>;
    export type StructPointer<T = string> = Pointer<T>;

    namespace Symbols {
      export declare const base: unique symbol;
      export declare const brand: unique symbol;
    }

    export function alloc<T>(): Pointer<T> {
      return Deno.UnsafePointer.of(new BigUint64Array(1)) as Pointer<T>;
    }
    
    export function cstr(str: string) {
      return Deno.UnsafePointer.of(
        new TextEncoder().encode(str + "\\0"),
      ) as Pointer<number>;
    }
    
    export function readCString(ptr: Pointer<number>): string {
      return new Deno.UnsafePointerView(ptr).getCString();
    }

    export function cstrAry2PtrAry(arr: string[]) {
      const buffer = new BigInt64Array(arr.length);
      arr.map((a, i) => {
        buffer[i] = BigInt(cstr(a));
      });
      return Deno.UnsafePointer.of(buffer) as Pointer<Pointer<number>>;
    }
    
    export function cstrJsonAry2PtrAry(arr: { [key: string]: string | boolean }[]) {
      const buffer = new BigInt64Array(arr.length);
      arr.map((a, i) => {
        buffer[i] = BigInt(cstr(JSON.stringify(a)));
      });
      return Deno.UnsafePointer.of(buffer) as Pointer<Pointer<number>>;
    }

    `;
}

function buildTypeDefs(typeDefs: Map<string, TypeDef>): string {
  const typeDefsSource = [...typeDefs.entries()].map(([name, t]) => {
    console.log('buildTypeDefs',{type:t.type.tsType,name,location:t.location})
    return `  /** ${t.location} */\n` +
      `  export type ${name} = ${t.type.tsType};`;
  }).join("\n\n");

  return typeDefsSource;
}

function buildEnums(enums: Map<string, EnumDef>): string {
  const enumsSource = [...enums.entries()].map(([name, e]) => {
    const fieldsGen = e.fields
      .map((f) => `    ${f.name} = ${f.value}`)
      .join(",\n");

    return `  /** ${e.location} */\n` +
      `  export enum ${name} {\n` +
      `${fieldsGen},\n` +
      `  }`;
  }).join("\n\n");

  return enumsSource;
}

function buildFunctions(functions: Map<string, FunctionDef>): string {
  const functionsSource = [...functions.entries()].map(([name, f]) => {
    console.log('buildFunctions',{name, f})

    return `  /** ${f.location} */\n` +
      `  ${`export declare function ${name}(${
        f.parameters.map((p) => `${p.name}: ${p.type.tsType}`).join(", ")
      }): ${f.result.tsType};`}`;
  }).join("\n\n");

  return functionsSource;
}
