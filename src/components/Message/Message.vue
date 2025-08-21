<template>
  <Transition
    :name="transitionName"
    @enter="updataHeight"
    @afterLeave="destoryComponent"
  >
    <div
      class="au-message"
      v-show="visible"
      :class="{
        [`au-message-${type}`]:type,
        'is-close':showClose
      }"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="au-message__content">
        <slot>
          <RenderVnode :vNode="message" v-if="message"></RenderVnode>
        </slot>
      </div>
      <div class="au-message__close" v-if="showClose">
        <Icon @click.stop="visible=false" icon="xmark"></Icon>
      </div>
    </div>
  </Transition>
  
</template>
<script setup lang="ts">
import type { MessageProps } from './type'
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';
import { getLastBottomOffset } from './method';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import useEventListener from '../../hooks/useEventListener';
defineOptions({
  name:'AUMessage'
})
const props = withDefaults(defineProps<MessageProps>(),{
  type:'info',
  duration:3000,
  offset:20,
  showClose: true,
  transitionName:'fade-up'
})

const visible = ref(false)
const messageRef = ref<HTMLElement>()
// const instance = getCurrentInstance()
//计算偏移高度
const height = ref(0)
//上一个实例的最下面的坐标数字，第一个是0
const lastOffset = computed(()=>getLastBottomOffset(props.id))
const topOffset = computed(() => props.offset + lastOffset.value)
//为下一个元素预留一个offset，也就是它最底端bottom的值
const bottomOffset = computed(() => height.value+ topOffset.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex : props.zIndex
}))
let timer: any
function startTimer(){
  if(props.duration ===0) return
  timer = setTimeout(()=>{
    visible.value = false
  },props.duration)
}
function clearTimer(){
  clearTimeout(timer)
}
onMounted(async()=>{
  visible.value = true
  startTimer()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})
function keydown(e:Event){
  const event = e as KeyboardEvent
  if(event.code === 'Escape'){
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)
// watch(visible,(newValue)=>{
//   if(!newValue){
//     props.onDestory()
//   }
// })
function destoryComponent(){
  props.onDestory()
}
function updataHeight(){
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
  bottomOffset,
  visible
})
</script>
