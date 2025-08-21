<template>
  <div
    class="au-switch"
    :class="{
      [`au-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      ref="switchRef"
      class="au-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />

    <div class="au-switch__core">
      <div class="au-switch__core-inner">
        <span v-if="activeText ||  inactiveText" class="au-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="au-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { SwitchProps, SwitchEvents } from './type'

defineOptions({
  name: 'AUSwitch',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emits = defineEmits<SwitchEvents>()

const switchRef = ref<HTMLInputElement>()
const innerValue = ref(props.modelValue)
const checked = computed(() => innerValue.value === props.activeValue)

function switchValue() {
  if (props.disabled) return

  const changedValue = checked.value ? props.inactiveValue : props.activeValue  
  innerValue.value = changedValue
  emits('update:modelValue', changedValue)
  emits('change', changedValue)
}

watch(checked, (newVal) => {
  switchRef.value!.checked = newVal
})
watch(() => props.modelValue, (newVal) => {
  innerValue.value = newVal
})

onMounted(() => {
  switchRef.value!.checked = checked.value
})
</script>