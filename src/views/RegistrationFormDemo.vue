<template>
  <div class="registration-form-demo">
    <h1 class="page-title">Регистрационная форма</h1>

    <div class="card">
      <p class="mb-lg">Пример регистрационной формы с валидацией полей.</p>

      <div v-if="formSubmitted" class="alert alert-success mb-lg">
        Регистрация успешно завершена! На ваш email отправлено письмо с
        подтверждением.
      </div>

      <FormGenerator
        :config="formConfig"
        v-model="formValues"
        @submit="onSubmit"
        @cancel="onCancel"
      >
        <!-- Кастомизация поля пароля с информацией о требованиях -->
        <template #password-field="{ field, modelValue, updateModelValue }">
          <div class="form-field">
            <label :for="field.name" class="form-field__label">
              {{ field.label }}
              <span v-if="field.required" class="form-field__required">*</span>
            </label>
            <input
              :id="field.name"
              type="password"
              class="form-field__input"
              :value="modelValue"
              @input="
                updateModelValue(($event.target as HTMLInputElement).value)
              "
              :placeholder="field.placeholder"
              :required="field.required"
            />
            <div class="password-requirements">
              <small>Пароль должен содержать:</small>
              <ul>
                <li :class="{ valid: passwordValidation.hasMinLength }">
                  Минимум 8 символов
                </li>
                <li :class="{ valid: passwordValidation.hasUppercase }">
                  Заглавную букву
                </li>
                <li :class="{ valid: passwordValidation.hasLowercase }">
                  Строчную букву
                </li>
                <li :class="{ valid: passwordValidation.hasNumber }">Цифру</li>
              </ul>
            </div>
          </div>
        </template>
      </FormGenerator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import FormGenerator from '@/components/FormGenerator/FormGenerator.vue'
import type { FormConfig, FormValues } from '@/types/forms'

const store = useStore()
const formSubmitted = ref(false)

const formValues = ref<FormValues>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
  country: '',
  subscription: false,
})

const passwordValidation = computed(() => {
  const password = (formValues.value.password as string) || ''
  return {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  }
})

const formConfig: FormConfig = {
  fields: [
    {
      name: 'username',
      label: 'Имя пользователя',
      type: 'input',
      placeholder: 'Введите имя пользователя',
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
      name: 'password',
      label: 'Пароль',
      type: 'input',
      placeholder: 'Введите пароль',
      required: true,
      attributes: {
        type: 'password',
      },
    },
    {
      name: 'confirmPassword',
      label: 'Подтверждение пароля',
      type: 'input',
      placeholder: 'Повторите пароль',
      required: true,
      attributes: {
        type: 'password',
      },
    },
    {
      name: 'birthDate',
      label: 'Дата рождения',
      type: 'input',
      attributes: {
        type: 'date',
      },
    },
    {
      name: 'country',
      label: 'Страна',
      type: 'select',
      placeholder: 'Выберите страну',
      options: [
        { value: 'ru', label: 'Россия' },
        { value: 'by', label: 'Беларусь' },
        { value: 'kz', label: 'Казахстан' },
        { value: 'ua', label: 'Украина' },
      ],
    },
    {
      name: 'subscription',
      label: 'Я хочу получать новости и специальные предложения',
      type: 'checkbox',
    },
  ],
  submitButtonText: 'Зарегистрироваться',
  cancelButtonText: 'Очистить',
}

const validateForm = (): boolean => {
  // Проверка на совпадение паролей
  if (formValues.value.password !== formValues.value.confirmPassword) {
    alert('Пароли не совпадают!')
    return false
  }

  // Проверка сложности пароля
  if (
    !passwordValidation.value.hasMinLength ||
    !passwordValidation.value.hasUppercase ||
    !passwordValidation.value.hasLowercase ||
    !passwordValidation.value.hasNumber
  ) {
    alert('Пароль не соответствует требованиям!')
    return false
  }

  return true
}

const onSubmit = (values: FormValues) => {
  if (!validateForm()) {
    return
  }

  // Сохраняем в хранилище
  store.dispatch('forms/saveForm', {
    formId: 'registrationForm',
    values,
  })

  // Показываем сообщение об успехе
  formSubmitted.value = true

  // Сбрасываем форму после успешной отправки
  formValues.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    country: '',
    subscription: false,
  }
}

const onCancel = () => {
  // Сбрасываем форму
  formValues.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    country: '',
    subscription: false,
  }
}
</script>

<style lang="scss" scoped>
.password-requirements {
  margin-top: $margin-sm;
  font-size: $font-size-sm;
  color: $text-color-light;

  ul {
    margin-top: 4px;
    padding-left: $padding-md;

    li {
      position: relative;
      margin-bottom: 2px;
      list-style-type: none;

      &:before {
        content: '✕';
        display: inline-block;
        margin-right: 5px;
        color: $danger-color;
      }
    }

    .valid {
      color: $success-color;

      &:before {
        content: '✓';
        color: $success-color;
      }
    }
  }
}
</style>
