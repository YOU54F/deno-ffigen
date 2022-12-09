import { loadPactFfi, readCString } from "../lib/mod.ts";

// const lib = loadPactFfi(Deno.env.get("HOME")+"/.pact/ffi/v0.3.15/libpact_ffi.dylib");
const lib = loadPactFfi("./input/libpact_ffi.so");

const version = readCString(lib.pactffi_version());

console.log("Hello from libpact_ffi: %s", version);



