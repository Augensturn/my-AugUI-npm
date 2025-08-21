<script setup lang="ts">
import { ref,onMounted, h } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import type { ButtonInstance } from './components/Button/type';
import type { TooltipInstance } from './components/Tooltip/type'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import type { MenuOptions } from './components/Dropdown/type'
import Message from './components/Message/Message.vue'
import { createMessage } from './components/Message/method'
import Input from './components/Input/Input.vue'
const tooltipRef = ref<TooltipInstance | null>(null)
const options1 :MenuOptions[] = [
  {key:1,label: h('b','this is bold')},
  {key:2,label: 'item2',disabled:true},
  {key:3,label: 'item3',divided:true},
  {key:4,label: 'item4'},
] 
const open = () =>{
  tooltipRef.value?.show()
}
const close = () =>{
  tooltipRef.value?.hide()
}
const buttonRef = ref<ButtonInstance | null>(null)
// onMounted(()=>{
//   if(buttonRef.value){
//     console.log(buttonRef.value.ref)
//   }
// })
onMounted(()=>{
  const instance = createMessage({message:'hello'})
  createMessage({message:'hello again',type:'error'})
  createMessage({message:'hello third',duration:0,type:'error'})
  setTimeout(() => {
    instance.destory()
  },2000)
})

const openedValue = ref(['a'])
const trigger = ref<any>('click')
</script>

<template>

  <!-- <Message message="hello" :duration="0" :show-close="true"></Message> -->
  <Button plain>Plain Button</Button>
  <Button round>Round Button</Button>
  <Button circle>au</Button>
  <Button disabled>Disabled Button</Button>
  <br /><br />
  <Button type="primary">Primary</Button>
  <Button type="success">Success</Button>
  <Button type="info">Info</Button>
  <Button type="warning">Warning</Button>
  <Button type="danger">Danger</Button>
  <br /><br />
  <Button type="primary" plain>Primary</Button>
  <Button type="success" plain>Success</Button>
  <Button type="info" plain>Info</Button>
  <Button type="warning" plain>Warning</Button>
  <Button type="danger" plain>Danger</Button>
  <br /><br />
  <Button size="large" @click="open">Large</Button>
  <Button size="small" @click="close">Small</Button>
  <br /><br />
  <Collapse v-model="openedValue" accordion>
    <Item name="a">
      <template #title>
        <h1>a title</h1>
      </template>
      <h1>headline title</h1>
      <div>content a</div>
    </Item>
    <Item name="b" title="title b">
      <div>content b</div>
    </Item>
    <Item name="c" title="title c" disabled>
      <div>content c</div>
    </Item>
  </Collapse>
  <br></br>
  <Icon icon="fa-solid fa-house" ></Icon>
  <Icon icon="arrow-up" type="primary" color="red"></Icon>
  <br></br>
  <Button size="large" loading>Loading</Button>
  <Dropdown :trigger="trigger" placement="top"  :menu-options="options1"  >
      <Button size="large" icon="arrow-up">Icon</Button>
      <template #content>
        <h1>hello</h1>
      </template>
  </Dropdown>

</template>

<style ></style>
