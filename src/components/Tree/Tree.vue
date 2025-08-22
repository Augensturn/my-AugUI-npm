<template>
  <div class="au-tree">
    <TreeNode
      v-for="node in data"
      :key="node.id"
      :node="node"
      :defaultExpandAll="defaultExpandAll"
      :loadChildren="loadChildren"
      :selectable="selectable"
      :containerHeight="containerHeight"
      :itemHeight="itemHeight"
      @select="onSelect"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type { TreeProps, TreeNodeType } from "./type";
import TreeNode from "./TreeNode.vue";

const props = defineProps<
  TreeProps & {
    loadChildren?: (node: TreeNodeType) => Promise<TreeNodeType[]>;
    containerHeight?: number; // 可视区域高度
    itemHeight?: number; // 节点高度
  }
>();

const emits = defineEmits<{
  (e: "select", node: TreeNodeType): void;
}>();

function onSelect(node: TreeNodeType) {
  emits("select", node);
}
</script>
