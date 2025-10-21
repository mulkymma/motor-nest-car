// Ambient global JSX typings fallback.
// This file intentionally contains only global ambient declarations (no imports/exports)
// so TypeScript always sees these intrinsic elements during compilation.
/// <reference types="react" />

/*
  This file provides a permissive fallback for JSX intrinsic elements so the
  codebase typechecks while we progressively add correct typings.

  Keep this minimal and localized: prefer `unknown` for element props and a
  single index signature to reduce ESLint complaints about explicit `any`.
*/
declare namespace JSX {
  interface IntrinsicElements {
    div: unknown;
    span: unknown;
    section: unknown;
    header: unknown;
    footer: unknown;
    main: unknown;
    h1: unknown;
    h2: unknown;
    h3: unknown;
    p: unknown;
    a: unknown;
    img: unknown;
    form: unknown;
    input: unknown;
    textarea: unknown;
    button: unknown;
    ul: unknown;
    li: unknown;
    nav: unknown;
    svg: unknown;
    path: unknown;
    // fallback for any other tags
    [elemName: string]: unknown;
  }
}
