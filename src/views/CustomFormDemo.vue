<template>
  <div class="custom-form-demo">
    <h1 class="page-title">Форма с кастомизацией</h1>

    <div class="card">
      <p class="mb-lg">
        Пример использования слотов для кастомизации полей формы.
      </p>

      <div v-if="formSubmitted" class="alert alert-success mb-lg">
        Форма успешно отправлена!
      </div>

      <FormGenerator
        :config="formConfig"
        v-model="formValues"
        @submit="onSubmit"
        @cancel="onCancel"
      >
        <!-- Кастомное поле с рейтингом -->
        <template #rating-field="{ field, modelValue, updateModelValue }">
          <div class="form-field">
            <label :for="field.name" class="form-field__label">
              {{ field.label }}
            </label>
            <div class="rating-stars">
              <button
                v-for="star in 5"
                :key="`star-${star}`"
                type="button"
                class="rating-star"
                :class="{ active: modelValue >= star }"
                @click="updateModelValue(star)"
              >
                ★
              </button>
            </div>
          </div>
        </template>

        <!-- Кастомное поле для выбора цветов -->
        <template #colors-field="{ field }">
          <div class="form-field">
            <label class="form-field__label">
              {{ field.label }}
            </label>
            <div class="color-selector">
              <div
                v-for="color in colorOptions"
                :key="color.value"
                class="color-option"
                :class="{ selected: isColorSelected(color.value) }"
                :style="{ backgroundColor: color.hex }"
                @click="toggleColor(color.value)"
                :title="color.label"
              ></div>
            </div>
          </div>
        </template>

        <!-- Кастомизация кнопок -->
        <template #actions="{ submit, cancel }">
          <div class="custom-actions">
            <button type="button" class="btn btn-secondary" @click="cancel">
              <span class="icon">✕</span> Отменить
            </button>
            <button type="button" class="btn btn-primary" @click="submit">
              <span class="icon">✓</span> Готово
            </button>
          </div>
        </template>
      </FormGenerator>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  ref } from 'vue'
import { useStore } from 'vuex'
import FormGenerator from '@/components/FormGenerator/FormGenerator.vue'
import type { FormConfig, FormValues } from '@/types/forms'

const store = useStore()
const formSubmitted = ref(false)

const colorOptions = [
  { value: 'red', label: 'Красный', hex: '#e74c3c' },
  { value: 'blue', label: 'Синий', hex: '#3498db' },
  { value: 'green', label: 'Зеленый', hex: '#2ecc71' },
  { value: 'yellow', label: 'Желтый', hex: '#f1c40f' },
  { value: 'purple', label: 'Фиолетовый', hex: '#9b59b6' },
  { value: 'orange', label: 'Оранжевый', hex: '#e67e22' },
  { value: 'black', label: 'Черный', hex: '#34495e' },
  { value: 'white', label: 'Белый', hex: '#ecf0f1' },
]

const formValues = ref<FormValues>({
  name: '',
  type: 'feedback',
  comment: '',
  rating: 0,
  colors: [],
  terms: false,
})

const formConfig: FormConfig = {
  fields: [
    {
      name: 'name',
      label: 'Ваше имя',
      type: 'input',
      placeholder: 'Введите ваше имя',
      required: true,
    },
    {
      name: 'type',
      label: 'Тип обратной связи',
      type: 'select',
      options: [
        { value: 'feedback', label: 'Общий отзыв' },
        { value: 'feature', label: 'Предложение функции' },
        { value: 'bug', label: 'Сообщение об ошибке' },
        { value: 'question', label: 'Вопрос' },
      ],
    },
    {
      name: 'comment',
      label: 'Комментарий',
      type: 'textarea',
      placeholder: 'Введите ваш комментарий',
      required: true,
    },
    {
      name: 'rating',
      label: 'Оцените наш сервис',
      type: 'input', // Будет заменено на кастомный компонент
    },
    {
      name: 'colors',
      label: 'Выберите предпочитаемые цвета',
      type: 'input', // Будет заменено на кастомный компонент
    },
    {
      name: 'terms',
      label: 'Я принимаю условия использования',
      type: 'checkbox',
      required: true,
    },
  ],
}

const isColorSelected = (color: string): boolean => {
  return (formValues.value.colors as string[])?.includes(color) || false
}

const toggleColor = (color: string) => {
  const colors = [...((formValues.value.colors as string[]) || [])]
  const index = colors.indexOf(color)

  if (index === -1) {
    colors.push(color)
  } else {
    colors.splice(index, 1)
  }

  formValues.value.colors = colors
}

const onSubmit = (values: FormValues) => {
  // Валидация
  if (!values.terms) {
    alert('Вы должны принять условия использования!')
    return
  }

  // Сохраняем в хранилище
  store.dispatch('forms/saveForm', {
    formId: 'customForm',
    values,
  })

  // Показываем сообщение об успехе
  formSubmitted.value = true

  // Сбрасываем статус через 3 секунды
  setTimeout(() => {
    formSubmitted.value = false
  }, 3000)
}

const onCancel = () => {
  // Сбрасываем форму
  formValues.value = {
    name: '',
    type: 'feedback',
    comment: '',
    rating: 0,
    colors: [],
    terms: false,
  }
}
</script>

<style lang="scss" scoped>
.rating-stars {
  display: flex;
  gap: 8px;
  margin-top: $margin-sm;
}

.rating-star {
  cursor: pointer;

  padding: 0;
  border: none;

  font-size: 2rem;
  color: #d1d8e0;

  background: none;

  transition: color 0.2s ease;

  &:hover {
    color: #f39c12;
  }

  &.active {
    color: #f39c12;
  }
}

.color-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: $margin-sm;
}

.color-option {
  cursor: pointer;

  position: relative;

  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  border-radius: 50%;

  box-shadow: $shadow-sm;

  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &.selected {
    border-color: $primary-color;

    &:after {
      content: '✓';

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      color: white;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
    }
  }
}

.custom-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .btn {
    display: flex;
    gap: 8px;
    align-items: center;

    .icon {
      font-size: 1.2rem;
    }
  }
}
</style>
