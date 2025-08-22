<template>
  <div class="demo-tree-selectable">
    <h3>🌳 可选择的树形组件</h3>

    <Tree
      :data="treeData"
      :defaultExpandAll="true"
      :selectable="true"
      @select="handleSelect"
    />

    <div class="demo-result">
      <p v-if="selectedNode">✅ 已选中节点：{{ selectedNode.label }}</p>
      <p v-else>请点击一个节点进行选择</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tree from "../../../src/components/Tree/Tree.vue"; // 这里替换为你项目里的实际路径
import type { TreeNodeType } from "../../../src/components/Tree/type";


// 示例树数据
const treeData = ref<TreeNodeType[]>([
  {
    id: 1,
    label: "根节点 1",
    children: [
      { id: 2, label: "子节点 1-1" },
      { id: 3, label: "子节点 1-2", disabled: true },
    ],
  },
  {
    id: 4,
    label: "根节点 2",
    children: [
      { id: 5, label: "子节点 2-1" },
      { id: 6, label: "子节点 2-2" },
    ],
  },
]);

// 当前选中节点
const selectedNode = ref<TreeNodeType | null>(null);

function handleSelect(node: TreeNodeType) {
  console.log("选中节点：", node);
  selectedNode.value = node;
}
</script>
