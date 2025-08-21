<template>
  <div
    class="au-dropdown"
  >
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popperOptions="popperOptions"
      :openDelay="openDelay"
      :closeDelay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
    <slot/>
      <template #content>
        <ul class="au-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li 
              v-if="item.divided"
              class="divided-placeholder"
              role="separator"
            />
            <li 
              class="au-dropdown__item"
              @click="$event => itemClick(item)"
              :class="{'is-disabled':item.disabled,'is-divided':item.divided}"
              :id="`dropdown-item-${item.key}`"
              >
              <RenderVnode :vNode="item.label"></RenderVnode>
            </li>
          </template>

        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import type { DropdownProps,DropdownEmits,DropdownInstance, MenuOptions } from './type';
import Tooltip from '../Tooltip/Tooltip.vue';
import type { TooltipInstance } from '../Tooltip/type';
import { ref, type Ref } from 'vue';
import RenderVnode from '../Common/RenderVnode';
defineOptions({
  name:'AUDropdown'
})
const props = withDefaults(defineProps<DropdownProps>(),{ hideAfterClick:true}) 
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const visibleChange = (e:boolean)=>{
  emits('visible-change',e)
}

const itemClick = (e:MenuOptions)=>{
  if(e.disabled) {return}
  emits('select',e)
  if(props.hideAfterClick){
    tooltipRef.value.hide()
  }
}
defineExpose<DropdownInstance>({
  show:tooltipRef.value?.show,
  hide:tooltipRef.value?.hide
})
</script>
