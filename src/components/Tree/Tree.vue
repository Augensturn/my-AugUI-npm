<template>
  <div class="au-tree">
    <TreeNode
      v-for="node in data"
      :key="node.id"
      :node="node"
      :defaultExpandAll="defaultExpandAll"
      :selectable="selectable"
      @select="onSelect"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type { TreeProps, TreeNode as TreeNodeType } from "./type";
import TreeNode from "./TreeNode.vue";

const props = defineProps<TreeProps>();
const emits = defineEmits<{
  (e: "select", node: TreeNodeType): void;
}>();

function onSelect(node: TreeNodeType) {
  emits("select", node);
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
