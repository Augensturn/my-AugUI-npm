import type { App } from 'vue'
import Switch from './Switch.vue'

Switch.install = (app: App) => {
  app.component(Switch.name as string, Switch)
}

export default Switch
export * from './type'