<template>
  <div 
  class="au-collapse"
  > 
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { ref,provide,watch } from 'vue';
  import type { NameType,CollapseProps,CollapseEmit } from './type';
  import { CollapseContextKey } from './type'
  defineOptions({
      name:'AUCollapse'
  })

  const props = defineProps<CollapseProps>()
  const emits = defineEmits<CollapseEmit>()
  const activeNames = ref<NameType[]>(props.modelValue)
  watch(() => props.modelValue,()=>{
    activeNames.value = props.modelValue
  })
  //2、在这里修改activeNames
  const handleItemClick = ((item:NameType)=>{
    if(props.accordion){
      activeNames.value = [activeNames.value[0] ===item ? '' : item]
    }else{
      const index = activeNames.value.indexOf(item)
      if(index>-1){
        //存在，删去
        activeNames.value.splice(index,1)
      }else{
        //不存在 加上
        activeNames.value.push(item)
      }
    }
//3、修改完之后告诉App改动了，维护openValue
    emits('update:modelValue',activeNames.value)
    emits('change',activeNames.value)
  })
//4、修改完后告诉子组件改完了，并且传递给子组件
  provide(CollapseContextKey,{
    activeNames,
    handleItemClick
  })
</script>