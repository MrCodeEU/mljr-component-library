// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { AvailableLanguageTag } from "$lib/paraglide/runtime"
import type { ParaglideLocals } from "@inlang/paraglide-sveltekit"


declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			paraglide: ParaglideLocals<AvailableLanguageTag>
		}
	}
}

export {};
