import type { App } from 'vue'
import Tree from './Tree.vue'

Tree.install = (app: App) => {
  app.component(Tree.name as string, Tree)
}

export default Tree
export * from './type'