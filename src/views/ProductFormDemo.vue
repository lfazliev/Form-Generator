<template>
  <div class="product-form-demo">
    <h1 class="page-title">Форма товара</h1>

    <div class="card">
      <p class="mb-lg">
        Форма для создания или редактирования товара с более сложной структурой.
      </p>

      <div v-if="formSubmitted" class="alert alert-success mb-lg">
        Товар успешно сохранен!
      </div>

      <FormGenerator
        :config="formConfig"
        v-model="formValues"
        @submit="onSubmit"
        @cancel="onCancel"
      >
        <template #form-header>
          <div class="form-header mb-lg">
            <h2>
              {{
                isEditMode ? 'Редактирование товара' : 'Создание нового товара'
              }}
            </h2>
            <div class="form-id" v-if="isEditMode">ID: {{ formValues.id }}</div>
          </div>
        </template>
      </FormGenerator>

      <div class="mt-lg">
        <h3 class="mb-md">Демонстрационные данные</h3>
        <button class="btn btn-secondary mr-md" @click="loadSampleData">
          Загрузить пример товара
        </button>
        <button class="btn btn-secondary" @click="resetForm">
          Сбросить форму
        </button>
      </div>
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
  id: '',
  name: '',
  category: '',
  price: '',
  quantity: '',
  description: '',
  features: '',
  availableColors: [],
  isAvailable: true,
  hasDiscount: false,
})

const isEditMode = computed(() => !!formValues.value.id)

const formConfig: FormConfig = {
  fields: [
    {
      name: 'name',
      label: 'Название товара',
      type: 'input',
      placeholder: 'Введите название товара',
      required: true,
    },
    {
      name: 'category',
      label: 'Категория',
      type: 'select',
      placeholder: 'Выберите категорию',
      options: [
        { value: 'electronics', label: 'Электроника' },
        { value: 'clothing', label: 'Одежда' },
        { value: 'home', label: 'Товары для дома' },
        { value: 'sports', label: 'Спорт и отдых' },
        { value: 'beauty', label: 'Красота и здоровье' },
      ],
      required: true,
    },
    {
      name: 'price',
      label: 'Цена (₽)',
      type: 'input',
      placeholder: 'Введите цену товара',
      required: true,
      attributes: {
        type: 'number',
        min: '0',
        step: '0.01',
      },
    },
    {
      name: 'quantity',
      label: 'Количество на складе',
      type: 'input',
      placeholder: 'Введите количество',
      required: true,
      attributes: {
        type: 'number',
        min: '0',
      },
    },
    {
      name: 'description',
      label: 'Описание товара',
      type: 'textarea',
      placeholder: 'Введите описание товара',
    },
    {
      name: 'features',
      label: 'Характеристики',
      type: 'textarea',
      placeholder: 'Укажите основные характеристики товара',
    },
    {
      name: 'isAvailable',
      label: 'Товар доступен для продажи',
      type: 'checkbox',
    },
    {
      name: 'hasDiscount',
      label: 'Применить скидку к товару',
      type: 'checkbox',
    },
  ],
  submitButtonText: isEditMode.value ? 'Сохранить изменения' : 'Создать товар',
  cancelButtonText: 'Отмена',
}

const onSubmit = (values: FormValues) => {
  // Сохраняем в хранилище
  store.dispatch('forms/saveForm', {
    formId: 'productForm',
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
  // Подтверждение отмены если есть изменения
  if (confirm('Вы уверены, что хотите отменить изменения?')) {
    resetForm()
  }
}

const resetForm = () => {
  formValues.value = {
    id: '',
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    features: '',
    availableColors: [],
    isAvailable: true,
    hasDiscount: false,
  }
}

const loadSampleData = () => {
  formValues.value = {
    id: 'PROD-' + Math.floor(Math.random() * 10000),
    name: 'Смартфон XYZ Pro 5G',
    category: 'electronics',
    price: '49999',
    quantity: '15',
    description:
      'Новейший смартфон с поддержкой 5G, высокопроизводительным процессором и отличной камерой.',
    features:
      '- Дисплей: 6.5" AMOLED, 2400x1080\n- Процессор: 8 ядер, 2.8 ГГц\n- Память: 8 ГБ RAM, 128 ГБ ROM\n- Камера: 64 МП (основная) + 12 МП (ультра) + 5 МП (макро)\n- Аккумулятор: 5000 мАч',
    isAvailable: true,
    hasDiscount: true,
  }
}
</script>

<style lang="scss" scoped>
.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: $padding-md;
  border-bottom: 1px solid $border-color;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: $text-color;
  }

  .form-id {
    padding: $padding-sm $padding-md;
    border-radius: $border-radius;

    font-family: monospace;
    font-size: $font-size-sm;

    background-color: $background-color-dark;
  }
}

.mt-lg {
  margin-top: $margin-lg;
}

.mr-md {
  margin-right: $margin-md;
}
</style>
