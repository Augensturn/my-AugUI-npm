<template>
  <div class="au-tree-node">
    <!-- 节点标题 -->
    <div
      class="au-tree-node__label"
      :class="{ 'is-disabled': node.disabled }"
      @click="handleClick"
    >
      <span class="au-tree-node__toggle" @click.stop="toggle">
        <Icon v-if="loading" icon="spinner" spin />
        <Icon v-else :icon="expanded ? 'minus' : 'plus'" />
      </span>
      {{ node.label }}
    </div>

    <!-- 子节点容器 + 动画 -->
    <transition @enter="enter" @leave="leave">
      <div v-show="expanded" class="au-tree-node__children-wrapper">
        <div
          class="au-tree-node__virtual-scroll"
          ref="scrollContainer"
          @scroll="onScroll"
          :style="{ height: `${containerHeight}px`, overflowY: 'auto' }"
        >
          <!-- 上方占位 -->
          <div :style="{ height: `${topPadding}px` }"></div>

          <!-- 可视子节点 -->
          <div
            v-for="child in visibleChildren"
            :key="child.id"
            class="au-tree-node__children"
          >
            <TreeNode
              :node="child"
              :defaultExpandAll="defaultExpandAll"
              :selectable="selectable"
              :loadChildren="loadChildren"
              @select="$emit('select', $event)"
            />
          </div>

          <!-- 下方占位 -->
          <div :style="{ height: `${bottomPadding}px` }"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import Icon from "../Icon/Icon.vue";
import type { TreeNodeType } from "./type";

const props = defineProps<{
  node: TreeNodeType;
  loadChildren?: (node: TreeNodeType) => Promise<TreeNodeType[]>;
  defaultExpandAll?: boolean;
  selectable?: boolean;
  scrollHeight?: number; // 动态传入滚动容器最大高度
}>();

const emits = defineEmits<{
  (e: "select", node: TreeNodeType): void;
}>();

const expanded = ref(false);
const loading = ref(false);

const itemHeight = 28; // 每个子节点高度
const scrollContainer = ref<HTMLElement | null>(null);
const scrollTop = ref(0);

// 动态计算容器高度
const containerHeight = computed(() => {
  const totalChildren = props.node.children?.length || 0;
  const defaultHeight = props.scrollHeight ?? 200;
  return Math.min(totalChildren * itemHeight, defaultHeight);
});

const hasChildren = computed(() => (props.node.children ?? []).length > 0);

// 点击展开 / 懒加载
async function toggle() {
  if (hasChildren.value) {
    expanded.value = !expanded.value;
  } else if (props.loadChildren && !loading.value) {
    loading.value = true;
    try {
      const children = await props.loadChildren(props.node);
      props.node.children = children ?? [];
      expanded.value = true;
    } finally {
      loading.value = false;
    }
  } else {
    expanded.value = !expanded.value;
  }
}

watch(
  () => props.defaultExpandAll,
  (val) => {
    if (val) expanded.value = true;
  },
  { immediate: true }
);

function handleClick() {
  if (props.selectable && !props.node.disabled) {
    emits("select", props.node);
  }
}

// ---------- 虚拟滚动 + buffer ----------
const buffer = 3; // 上下缓冲节点数

const startIndex = computed(() =>
  Math.max(Math.floor(scrollTop.value / itemHeight) - buffer, 0)
);
const endIndex = computed(() =>
  Math.min(
    startIndex.value + Math.ceil(containerHeight.value / itemHeight) + buffer * 2,
    (props.node.children ?? []).length
  )
);

const visibleChildren = computed(() =>
  (props.node.children ?? []).slice(startIndex.value, endIndex.value)
);

const topPadding = computed(() => startIndex.value * itemHeight);
const bottomPadding = computed(() =>
  Math.max((props.node.children?.length ?? 0 - endIndex.value) * itemHeight, 0)
);

// ---------- 滚动节流 ----------
function onScroll() {
  if (!scrollContainer.value) return;
  cancelAnimationFrame((scrollContainer.value as any)._raf);
  (scrollContainer.value as any)._raf = requestAnimationFrame(() => {
    scrollTop.value = scrollContainer.value!.scrollTop;
  });
}

// ---------- 展开收起动画 ----------
function enter(el: Element, done: () => void) {
  const element = el as HTMLElement;
  element.style.height = "0";
  element.style.overflow = "hidden";
  const height = element.scrollHeight;
  requestAnimationFrame(() => {
    element.style.transition = "height 0.2s ease-in-out";
    element.style.height = height + "px";
  });
  const afterEnter = () => {
    element.style.height = "auto";
    element.style.transition = "";
    element.style.overflow = "";
    done();
    element.removeEventListener("transitionend", afterEnter);
  };
  element.addEventListener("transitionend", afterEnter);
}

function leave(el: Element, done: () => void) {
  const element = el as HTMLElement;
  element.style.height = element.scrollHeight + "px";
  element.style.overflow = "hidden";
  requestAnimationFrame(() => {
    element.style.transition = "height 0.2s ease-in-out";
    element.style.height = "0";
  });
  const afterLeave = () => {
    element.style.transition = "";
    element.style.overflow = "";
    done();
    element.removeEventListener("transitionend", afterLeave);
  };
  element.addEventListener("transitionend", afterLeave);
}
</script>
