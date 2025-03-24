<template>
  <div class="form-field-wrapper">
    <slot
      :name="`${field.name}-field`"
      :field="field"
      :modelValue="modelValue"
      @update:modelValue="(newVal: FormFieldValueType<T>) => (modelValue = newVal)"
    >
      <component
        :is="getFieldComponent"
        :id="field.name"
        :label="field.label"
        v-model="modelValue"
        :required="field.required"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        :options="field.options"
        v-bind="field.attributes || {}"
      />
    </slot>
  </div>
</template>

<script setup lang="ts" generic="T extends FormFieldType">
import { computed } from 'vue'
import type {
  FormField,
  FormFieldType,
  FormFieldValueType,
} from '@/types/forms'
import BaseInput from '@/components/UI/BaseInput.vue'
import BaseSelect from '@/components/UI/BaseSelect.vue'
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue'
import BaseTextarea from '@/components/UI/BaseTextarea.vue'

// Определяем, что поле должно быть конкретного типа T
const props = defineProps<{
  field: FormField & { type: T }
}>()

// Модель с привязкой к типу поля
const modelValue = defineModel<FormFieldValueType<T>>({
  required: true,
})

const getFieldComponent = computed(() => {
  const componentMap = {
    input: BaseInput,
    select: BaseSelect,
    checkbox: BaseCheckbox,
    textarea: BaseTextarea,
  }
  return componentMap[props.field.type] || BaseInput
})
</script>
