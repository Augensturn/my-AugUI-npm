<template>
  <div
    ref="popperContainNode"
    class="au-tooltip"
    v-on="outerEvent"
  >
    <div
      class="au-tooltip__trigger"
      ref="triggerNode"
      v-on="event"
    >
      <slot></slot>
    </div>
    <transition :name="transition">
      <div
      v-if="isOpen"
      class="au-tooltip__popper"
      ref="popperNode"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onUnmounted, computed } from 'vue';
import type { TooltipProps,TooltipEmits,TooltipInstance } from './type';
import type { Instance } from '@popperjs/core';
import { createPopper, placements } from '@popperjs/core';
import useClickOutside from '../../hooks/useClickOutside';
import { debounce } from 'lodash-es'
const props = withDefaults(defineProps<TooltipProps>(),{
  placement:'bottom',
  trigger:'hover',
  transition:'fade',
  openDelay:0,
  closeDelay:0,
})
const emit = defineEmits<TooltipEmits>()
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const popperContainNode = ref<HTMLElement>()
const isOpen = ref(false)
let event:Record<string,any> = reactive({})
let outerEvent:Record<string,any> = reactive({})
const popperOptions = computed(()=>{
  return {
    placements:props.placement,
    modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    ],
    ...props.popperOptions
  }
})

const open = () =>{
  isOpen.value = true
  emit('visible-change',true)
}
const close = () =>{
  isOpen.value = false
  emit('visible-change',false)
}
const openDebounce = debounce(open,props.openDelay)
const closeDebounce = debounce(close,props.closeDelay)
const openFinal = () =>{
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () =>{
  openDebounce.cancel()
  closeDebounce()
}
const togglePopper = ()=>{
  if(isOpen.value){
    closeFinal()
  }else{
    openFinal()
  }
}
useClickOutside(popperContainNode,()=>{
  if(props.trigger === 'click' && isOpen.value && !props.manual){
    closeFinal()
  }
})
const attachEvent = ()=>{
  if(props.trigger === 'click'){
    event['click'] = togglePopper
  }else if(props.trigger === 'hover'){
    event['mouseenter'] = openFinal
    outerEvent['mouseleave'] = closeFinal
  }
}
if(!props.manual){
  attachEvent()
}
watch(()=>props.manual,(isManual)=>{
  if(isManual){
    event = {}
    outerEvent = {}
  }else{
    attachEvent()
  }
})
//trigger修改要重新绑定
watch(()=>props.trigger,(newTrigger,oldTrigger)=>{
  if(newTrigger !== oldTrigger){
    //清除时间 重新绑定
    event = {}
    outerEvent = {}
    attachEvent()
  }
})
let popperInstance :null | Instance = null
watch(isOpen,(newValue)=>{
  if(newValue){
    if(triggerNode.value && popperNode.value){
      popperInstance = createPopper(triggerNode.value,popperNode.value,popperOptions.value)
    }else{
      popperInstance?.destroy()
    }
  }
},{flush:'post'})

defineExpose<TooltipInstance>({
  'show':openFinal,
  'hide':closeFinal
})
onUnmounted(()=>{
  popperInstance?.destroy()
})
</script>