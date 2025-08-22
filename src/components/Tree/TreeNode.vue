<template>
  <div class="au-tree-node">
    <div
      class="au-tree-node__label"
      :class="{ 'is-disabled': node.disabled }"
      @click="handleClick"
    >
      <span
        v-if="hasChildren"
        class="au-tree-node__toggle"
        @click.stop="toggle"
      >
        {{ expanded ? "-" : "+" }}
      </span>
      {{ node.label }}
    </div>

    <div v-show="expanded" class="au-tree-node__children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :defaultExpandAll="defaultExpandAll"
        :selectable="selectable"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { TreeNode as TreeNodeType } from "./type";

const props = defineProps<{
  node: TreeNodeType;
  defaultExpandAll?: boolean;
  selectable?: boolean;
}>();

const emits = defineEmits<{
  (e: "select", node: TreeNodeType): void;
}>();

const expanded = ref(false);

const hasChildren = props.node.children && props.node.children.length > 0;

watch(
  () => props.defaultExpandAll,
  (val) => {
    if (val) expanded.value = true;
  },
  { immediate: true }
);

function toggle() {
  expanded.value = !expanded.value;
}

function handleClick() {
  if (props.selectable && !props.node.disabled) {
    emits("select", props.node);
  }
}
</script>
