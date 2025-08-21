<template>
  <button
    ref="_ref"
    class="au-button"
    :class="{
        [`au-button--${type}`]:type,
        [`au-button--${size}`]:size,
        'is-plain':plain,
        'is-round':round,
        'is-circle':circle,
        'is-disabled':disabled,
        'is-loading' :loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span>
    <slot></slot>
  </span>
  </button>

</template>

<script setup lang="ts">

import { ref } from 'vue';
import type { ButtonProps } from './type';
import Icon from '../Icon/Icon.vue';
defineOptions({
    name:'AUButton'
})
withDefaults (defineProps<ButtonProps>(),{
    nativeType:'button',
    plain:false
})
//暴露节点
const _ref = ref<HTMLButtonElement>()
defineExpose({
    ref:_ref
})
</script>



<style>
    
</style>