<template>
  <div class="form-field">
    <label v-if="label" :for="id" class="form-field__label">
      {{ label }}
      <span v-if="required" class="form-field__required">*</span>
    </label>
    <select
      :id="id"
      class="form-field__select"
      v-model="modelValue"
      v-bind="$attrs"
    >
      <option value="" disabled selected v-if="placeholder">
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="String(option.value)"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { FormFieldOption } from '@/types/forms'

const modelValue = defineModel<string | number>()

withDefaults(
  defineProps<{
    label?: string
    id: string
    required?: boolean
    placeholder?: string
    options?: FormFieldOption[]
  }>(),
  { options: () => [] as FormFieldOption[] }
)
</script>
