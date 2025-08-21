import type { App } from 'vue'
import Input from './Input.vue'

Input.install = (app: App) => {
  app.component(Input.name as string, Input)
}

export default Input
export * from './type'