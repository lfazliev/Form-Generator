<template>
  <div class="form-field form-field--checkbox">
    <input
      :id="id"
      type="checkbox"
      class="form-field__checkbox"
      v-model="modelValue"
      v-bind="$attrs"
    />
    <label :for="id" class="form-field__label">
      {{ label }}
      <span v-if="required" class="form-field__required">*</span>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  id: string
  required?: boolean
}>()

const modelValue = defineModel<boolean>()
</script>
