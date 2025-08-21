<template>
    <div 
    class="au-collapse-item"
    :class="{
        'is-disabled':disabled
    }"
    >
        <div 
        class="au-collapse-item__header" 
        :class="{
            'is-disabled':disabled,
            'is-active':isActive
        }"
        :id="`item-header-${name}`" 
        @click="handleClick"
        >
            <slot name="title">{{ title }}</slot>
            <Icon icon="angle-right" class="header-angle"></Icon>
        </div>
        <Transition name="slide" v-on="transitionEvents">
            <div class="au-collapse-wrapper" v-show="isActive">
                <div class="au-collapse-item__content" :id="`item-content-${name}`" >
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </div>
</template>
<script lang="ts" setup>
import { inject,computed } from 'vue';
import { CollapseContextKey } from './type';
import type { CollapseItemProps } from './type'
import Icon from '../Icon/Icon.vue';
defineOptions({
    name:'AUCollapseItem'
})
const props = defineProps<CollapseItemProps>()
//5、接受父组件更新完的数据并且判断isActive
const collapseContext = inject(CollapseContextKey)
const isActive = computed(()=>collapseContext?.activeNames.value.includes(props.name))
//1、通过父组件的handleItemClick修改activeName数组
const handleClick = () =>{
    if(props.disabled){return}
    collapseContext?.handleItemClick(props.name)
}
const transitionEvents:Record<string,(el:HTMLElement)=>void> = {
    beforeEnter(el){
        el.style.height = '0px'
        el.style.overflow = 'hidden'
    },
    enter(el){
        el.style.height = `${el.scrollHeight}px`
    },
    afterEnter(el){
        el.style.height = ''
        el.style.overflow = ''
    },
    beforeLeave(el){
        el.style.height = `${el.scrollHeight}px`
        el.style.overflow = 'hidden'
    },
    leave(el){
        el.style.height = '0px'
    },
    afterLeave(el){
        el.style.height = ''
        el.style.overflow = ''
    }
}
</script>