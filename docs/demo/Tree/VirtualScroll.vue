<template>
  <div class="demo-tree-virtual">
    <h3>🌲 虚拟滚动树形组件</h3>

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


// 生成一个大数据量的树（每个根节点有 100 个子节点）
const treeData = ref<TreeNodeType[]>([
  {
    id: "root",
    label: "根节点",
    children: Array.from({ length: 1000 }).map((_, i) => ({
      id: `child-${i + 1}`,
      label: `子节点 ${i + 1}`,
    })),
  },
]);

// 当前选中节点
const selectedNode = ref<TreeNodeType | null>(null);

function handleSelect(node: TreeNodeType) {
  console.log("选中节点：", node);
  selectedNode.value = node;
}
</script>


