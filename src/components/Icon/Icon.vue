<template>
    <i 
    class="au-icon"
    :class="{[`au-icon--${type}`]:type}"
    :style="customStyle"
    v-bind="$attrs"
    > 
        <font-awesome-icon v-bind="$props"/>
    </i>
</template>

<script lang="ts" setup>
import type { ExtendFontAwesomeIconProps } from './type';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue';
defineOptions({
    name:'AUIcon',
    inheritAttrs:false
})
const props = defineProps<ExtendFontAwesomeIconProps>()

const customStyle = computed(()=>{
    return props.color ? {color:props.color} : {}
})
</script>