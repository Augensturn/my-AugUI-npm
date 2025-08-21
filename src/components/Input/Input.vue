<template>
  <div
    class="au-input"
    :class="{
      [`au-input--${type}`]:type,
      [`au-input--${size}`]:size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="au-input__prepend">
        <slot name="prepend"/>
      </div>
      <div class="au-input__wrapper">
        <!-- prefix slot -->
         <span v-if="$slots.prefix" class="au-input__prefix">
          <slot name="prefix"/>
         </span>
         <!-- 输入框主体 -->
         <input
          ref="inputRef"
          @input="handleInput"
          class="au-input__inner"
          :type=" showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autoComplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          v-model="innerValue"
          v-bind="attrs"
         />
         <!-- suffix slot -->
        <span v-if="$slots.suffix  || showClear || showPasswordArea" class="au-input__suffix" @click="keepFocus">
          <slot name="suffix"/>
          <Icon 
            icon="circle-xmark"
            v-if="showClear"
            class="au-input__clear"
            @click.stop="clear"
            @mousedown.prevent="NOOP"
          ></Icon>
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="au-input__password"
            @click="togglePasswrodVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="au-input__password"
            @click="togglePasswrodVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="au-input__append">
        <slot name="append"/>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        v-bind="attrs"
        v-model="innerValue"
        ref="inputRef"
        @input="handleInput"
        class="au-textarea__wrapper"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autoComplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch, type Ref } from 'vue';
import type { InputProps, InputEmits } from './type';
import Icon from '../Icon/Icon.vue';


defineOptions({
  name:'AUInput',
  inheritAttrs:false
})
const props = withDefaults(defineProps<InputProps>(),{
  type:'text',
  autoComplete:'off'
})
const emits = defineEmits<InputEmits>()
const attrs = useAttrs()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)
const inputRef = ref() as Ref<HTMLInputElement>

const showClear = computed(() =>{
  if(props.clearable &&
  !props.disabled &&
  !!innerValue.value &&
  isFocus.value){
    return true
  }else return false
})
const showPasswordArea = computed(()=>
  props.showPassword &&
  !props.disabled &&
  !!innerValue.value
)
const togglePasswrodVisible = () =>{
  passwordVisible.value = !passwordVisible.value
}
const keepFocus =async () =>{
  await nextTick
  inputRef.value.focus()
}
const handleInput = () => {
  emits('update:modelValue',innerValue.value)
  emits('input',innerValue.value)
}
const handleChange = () => {
  emits('change',innerValue.value)
}
const handleFocus = (event:FocusEvent) =>{
  isFocus.value = true
  emits('focus',event)
}
const handleBlur = (event:FocusEvent) =>{
  isFocus.value = false
  emits('blur',event)
}
const clear = () =>{
  innerValue.value = ''
  emits('update:modelValue','')
  emits('clear')
  emits('input','')
  emits('change','')
}
watch(()=> props.modelValue,(newValue) => {
  innerValue.value = newValue
})
function NOOP() {}
defineExpose({
  inputRef
})
</script>