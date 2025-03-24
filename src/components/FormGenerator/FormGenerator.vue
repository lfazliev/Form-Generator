<template>
  <form class="form-generator" @submit.prevent="handleSubmit">
    <slot name="form-header"></slot>

    <div class="form-generator__fields">
      <template v-for="field in config.fields" :key="field.name">
        <FormField :field="field" v-model="modelValue[field.name]">
          <template
            v-for="(_, slotName) in $slots"
            #[`${field.name}-${slotName}`]="slotData"
          >
            <slot :name="`${field.name}-${slotName}`" v-bind="slotData"></slot>
          </template>
        </FormField>
      </template>
    </div>

    <div class="form-generator__actions">
      <slot name="actions" :submit="handleSubmit" :cancel="handleCancel">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="spinner"></span>
          {{ config.submitButtonText || 'Сохранить' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          {{ config.cancelButtonText || 'Отмена' }}
        </button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormField from './FormField.vue'
import type { FormConfig, FormValues } from '@/types/forms'

defineProps<{ config: FormConfig }>()
const emit = defineEmits(['submit', 'cancel'])
const modelValue = defineModel<FormValues>({
  required: true,
})
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Имитация задержки, как при отправке на сервер
  await new Promise((resolve) => setTimeout(resolve, 500))

  emit('submit', modelValue.value)
  isSubmitting.value = false
}

const handleCancel = () => {
  emit('cancel')
}
</script>
