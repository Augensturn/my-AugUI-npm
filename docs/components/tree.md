---
title: Tree | Augensturn-UI
description: Tree 树形组件的文档
---

# Tree

用于展示具有层级结构的数据，支持节点展开/收起、懒加载、虚拟滚动和节点选择。

## 基础用法

展示树的基本结构，支持点击展开/收起子节点。

<preview path="../demo/Tree/Basic.vue" title="基础用法" description="展示树的基本结构和展开/收起功能"></preview>

## 懒加载

当数据量较大或需要异步获取子节点时，可使用 `loadChildren` 实现懒加载。

<preview path="../demo/Tree/LazyLoad.vue" title="懒加载" description="异步加载子节点数据"></preview>

## 可选择节点

设置 `selectable` 为 `true`，允许用户点击节点进行选择。

<preview path="../demo/Tree/Selectable.vue" title="可选择节点" description="支持节点选中，常用于目录选择"></preview>

## 虚拟滚动

支持虚拟滚动，提升大量节点渲染时的性能。

<preview path="../demo/Tree/VirtualScroll.vue" title="虚拟滚动" description="使用虚拟滚动优化长列表性能"></preview>

## Props

| 键名             | 描述                                 | 类型                                  | 默认值  |
| ---------------- | ------------------------------------ | ------------------------------------- | ------- |
| data             | 树节点数据                           | `TreeNodeType[]`                      | `[]`    |
| defaultExpandAll | 是否默认展开所有节点                 | `boolean`                             | `false` |
| selectable       | 节点是否可被选中                     | `boolean`                             | `true`  |
| loadChildren     | 异步加载子节点的方法，用于懒加载     | `(node: TreeNodeType) => Promise<TreeNodeType[]>` | -       |

## Events

| 事件名   | 描述                   | 回调参数             |
| -------- | ---------------------- | -------------------- |
| select   | 当节点被选中时触发     | `(node: TreeNodeType)` |

## Slots

暂无插槽。

## 类型定义 (`type.ts`)

```ts
export interface TreeNodeType {
  id: number | string;
  label: string;
  children?: TreeNodeType[];
  disabled?: boolean;
  // 可根据需要扩展其他字段
}

export interface TreeProps {
  data: TreeNodeType[];
  defaultExpandAll?: boolean;
  selectable?: boolean;
  loadChildren?: (node: TreeNodeType) => Promise<TreeNodeType[]>;
}