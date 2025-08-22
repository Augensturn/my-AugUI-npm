<template>
  <Tree
    :data="treeData"
    :defaultExpandAll="false"
    
    selectable
    @select="handleSelect"
  />
</template>

<script setup>
import Tree from '@/components/Tree/Tree.vue'
// import  { TreeNodeType } from "@/components/Tree/type";

const treeData = [
  {
    id: 1,
    label: "根节点",
    children: [
      { id: 2, label: "子节点 1" },
      {
        id: 3,
        label: "子节点 2",
        children: [
          { id: 4, label: "子节点 2-1" },
          { id: 5, label: "子节点 2-2", disabled: true },
        ],
      },
    ],
  },
];

function handleSelect(node) {
  console.log("选中节点：", node);
}
</script>
