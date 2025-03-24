<template>
  <div class="contact-form-demo">
    <h1 class="page-title">Контактная форма</h1>

    <div class="card">
      <p class="mb-lg">
        Базовый пример контактной формы с использованием компонента
        FormGenerator.
      </p>

      <div v-if="formSubmitted" class="alert alert-success mb-lg">
        Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.
      </div>

      <FormGenerator
        :config="formConfig"
        v-model="formValues"
        @submit="onSubmit"
        @cancel="onCancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import FormGenerator from '@/components/FormGenerator/FormGenerator.vue'
import type { FormConfig, FormValues } from '@/types/forms'

const store = useStore()
const formSubmitted = ref(false)

const formConfig: FormConfig = {
  fields: [
    {
      name: 'fullName',
      label: 'Ф.И.О',
      type: 'input',
      placeholder: 'Введите ваше полное имя',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      placeholder: 'email@example.com',
      required: true,
      attributes: {
        type: 'email',
      },
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'input',
      placeholder: '+7 (___) ___-__-__',
      attributes: {
        type: 'tel',
      },
    },
    {
      name: 'subject',
      label: 'Тема',
      type: 'select',
      placeholder: 'Выберите тему обращения',
      options: [
        { value: 'general', label: 'Общий вопрос' },
        { value: 'support', label: 'Техническая поддержка' },
        { value: 'billing', label: 'Вопросы оплаты' },
        { value: 'partnership', label: 'Сотрудничество' },
      ],
      required: true,
    },
    {
      name: 'message',
      label: 'Сообщение',
      type: 'textarea',
      placeholder: 'Введите ваше сообщение',
      required: true,
    },
    {
      name: 'agreement',
      label: 'Я согласен на обработку персональных данных',
      type: 'checkbox',
      required: true,
    },
  ],
  submitButtonText: 'Отправить',
  cancelButtonText: 'Отменить',
}

const formValues = ref<FormValues>({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  agreement: false,
})

const onSubmit = (values: FormValues) => {
  // Сохраняем в хранилище
  store.dispatch('forms/saveForm', {
    formId: 'contactForm',
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
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreement: false,
  }
}
</script>
