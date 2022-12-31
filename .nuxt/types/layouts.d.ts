import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "header"
declare module "/Users/asunder/Desktop/work/me/nuxt-tcc/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}