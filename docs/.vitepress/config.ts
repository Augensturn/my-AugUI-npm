import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx';
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { fileURLToPath, URL } from 'node:url'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "Augensturn-UI",
  description: "轻量级组件库",
  vite: {    
    plugins: [
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  // appearance: false,
  themeConfig: {
    siteTitle:  'Augensturn-UI',
    logo: 'https://vitepress.dev/vitepress-logo-mini.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件及API', link: '/component' },
      { text: '相关思考', link: '/think' },
    ],

    sidebar: [
      {
        text: '组件及API',
        items: [
          { text: 'Button', link: '/components/button.md' },
          { text: 'Collapse', link: '/components/collapse.md' },
          // { text: 'Icon', link: '/components/Icon.md' },
          { text: 'Form', link: '/components/form.md' },
          { text: 'Input', link: '/components/input.md' },
          { text: 'Message', link: '/components/message.md' },
          { text: 'Select', link: '/components/select.md' },
          { text: 'Switch', link: '/components/switch.md' },
          { text: 'Tooltip', link: '/components/tooltip.md' },
          { text: 'Tree', link: '/components/tree.md' },
        ],
      },
      {
        text: '相关思考及总结',
        items: [
          { text: '色彩参考', link: '/note/0色彩参考.md' },          
          { text: '基础组件', link: '/note/1基础组件.md' },          
          { text: '表单组件', link: '/note/2表单组件.md' },          
          { text: '需要测试', link: '/note/3你需要测试.md' },          
          { text: '编写测试代码', link: '/note/4编写测试代码.md' },
          { text: '组件通信', link: '/note/5组件通信.md' },
          { text: '了解模块化', link: '/note/6模块化了解.md' },
          { text: '打包发布', link: '/note/7组件库打包.md' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Augensturn/my-AugUI-npm.git' }
    ],
  },
})