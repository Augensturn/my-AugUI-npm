// src/components/Tree/Tree.test.tsx
import { describe, it, expect, vi,beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TreeNode from './TreeNode.vue'
import type { TreeNodeType } from './type'
import { nextTick } from 'vue'

describe('TreeNode.vue 懒加载 + 虚拟滚动测试', () => {
  let wrapper: VueWrapper<any>
  let mockLoadChildren: ReturnType<typeof vi.fn>
  const childrenNodes: TreeNodeType[] = [
    { id: 'c1', label: 'child1' },
    { id: 'c2', label: 'child2' },
    { id: 'c3', label: 'child3' },
    { id: 'c4', label: 'child4' },
    { id: 'c5', label: 'child5' },
  ]

  const node: TreeNodeType = {
    id: 'root',
    label: 'Root Node',
  }

  beforeEach(() => {
    mockLoadChildren = vi.fn(() => Promise.resolve(childrenNodes))
    wrapper = mount(TreeNode, {
      props: {
        node,
        loadChildren: mockLoadChildren,
        selectable: true,
      },
    })
  })

  it('初始状态不展开，loadChildren 未被调用', () => {
    expect(wrapper.vm.expanded).toBe(false)
    expect(wrapper.vm.loading).toBe(false)
    expect(mockLoadChildren).not.toHaveBeenCalled()
  })

  it('点击图标触发懒加载并渲染可视子节点', async () => {
    const toggle = wrapper.find('.au-tree-node__toggle')
    expect(toggle.exists()).toBe(true)

    await toggle.trigger('click')
    // loading 状态会立刻生效
    expect(wrapper.vm.loading).toBe(false)
    expect(mockLoadChildren).toHaveBeenCalledWith(node)

    // 等待 loadChildren resolve
    // await mockLoadChildren.mock.results[0].value
    await nextTick()

    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.expanded).toBe(true)
    expect(wrapper.props('node').children.length).toBe(childrenNodes.length)

    // 虚拟滚动可视节点判断
    expect(wrapper.vm.visibleChildren.length).toBeLessThanOrEqual(childrenNodes.length)
  })

  it('滚动时更新可视子节点', async () => {
    const toggle = wrapper.find('.au-tree-node__toggle')
    await toggle.trigger('click')
    // await mockLoadChildren.mock.results[0].value
    await nextTick()

    // 模拟滚动事件
    const wrapperEl = wrapper.find('.au-tree-node__children-wrapper')
    wrapperEl.element.scrollTop = 100
    await wrapperEl.trigger('scroll')
    await nextTick()

    // 可视子节点数量更新
    expect(wrapper.vm.visibleChildren.length).toBeGreaterThan(0)
    expect(wrapper.vm.visibleChildren.length).toBeLessThanOrEqual(childrenNodes.length)
  })

  it('点击节点文本触发 select 事件', async () => {
    const label = wrapper.find('.au-tree-node__label')
    await label.trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0]).toEqual([node])
  })
})
