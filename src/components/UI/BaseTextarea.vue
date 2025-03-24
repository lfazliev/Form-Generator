<template>
  <div class="form-field">
    <label v-if="label" :for="id" class="form-field__label">
      {{ label }}
      <span v-if="required" class="form-field__required">*</span>
    </label>
    <textarea
      :id="id"
      class="form-field__textarea"
      v-model="modelValue"
      v-bind="$attrs"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  id: string
  required?: boolean
}>()

const modelValue = defineModel<string>()
</script>
