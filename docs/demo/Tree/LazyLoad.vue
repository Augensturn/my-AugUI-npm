<template>
  <div class="demo-lazy-tree">
    <h3>🌲 Tree 懒加载示例</h3>

    <!-- 树组件 -->
    <Tree
      :data="data"
      :defaultExpandAll="false"
      :selectable="true"
      :loadChildren="mockLoad"
      @select="onSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tree from "../../../src/components/Tree/Tree.vue"; // 这里替换为你项目里的实际路径
import type { TreeNodeType } from "../../../src/components/Tree/type";

// 根节点数据（可以有多棵子树）
const data = ref<TreeNodeType[]>([
  { id: "1", label: "根节点 1", children: [] },
  { id: "2", label: "根节点 2", children: [] },
]);

// 模拟异步加载子节点
function mockLoad(node: TreeNodeType): Promise<TreeNodeType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: node.id + "-1", label: `子节点 ${node.id}-1` },
        { id: node.id + "-2", label: `子节点 ${node.id}-2` },
        { id: node.id + "-3", label: `子节点 ${node.id}-3`, disabled: true },
      ]);
    }, 800);
  });
}

// 选中事件
function onSelect(node: TreeNodeType) {
  console.log("选中节点：", node);
  alert(`你选中了：${node.label}`);
}
</script>


