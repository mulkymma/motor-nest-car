/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as React from 'react';

// Minimal pragmatic declaration: treat any @radix-ui/* import as `any`.
// This is a short-term unblock. Replace with precise module augmentations later.
declare module '@radix-ui/*' {
	const _any: any;
	export = _any;
}

