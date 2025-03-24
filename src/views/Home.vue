<template>
  <div class="home">
    <h1 class="page-title">Генератор форм на Vue 3 + TypeScript</h1>

    <div class="card mb-lg">
      <p class="mb-md">
        Добро пожаловать в демонстрацию компонента-генератора форм. Этот проект
        показывает, как можно создать универсальный компонент для генерации форм
        на основе JSON-конфигурации.
      </p>

      <h2 class="page-subtitle">Возможности</h2>
      <ul class="features-list">
        <li>
          Поддержка различных типов полей: input, select, checkbox, textarea
        </li>
        <li>Кастомизация полей с помощью слотов</li>
        <li>Валидация данных форм</li>
        <li>Интеграция с Vuex для хранения данных</li>
        <li>Полная поддержка TypeScript</li>
      </ul>
    </div>

    <h2 class="page-subtitle">Демонстрационные формы</h2>
    <div class="demo-cards">
      <div class="demo-card" v-for="demo in demoPages" :key="demo.path">
        <h3 class="demo-card__title">{{ demo.title }}</h3>
        <p class="demo-card__description mb-md">{{ demo.description }}</p>
        <router-link :to="demo.path" class="btn btn-primary">
          Открыть пример
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const demoPages = [
  {
    title: 'Контактная форма',
    description: 'Простая форма обратной связи с базовыми полями',
    path: '/contact-form',
  },
  {
    title: 'Регистрационная форма',
    description: 'Форма регистрации с валидацией полей',
    path: '/registration-form',
  },
  {
    title: 'Форма товара',
    description: 'Форма для создания или редактирования товара',
    path: '/product-form',
  },
  {
    title: 'Форма с кастомизацией',
    description: 'Пример использования слотов для настройки полей',
    path: '/custom-form',
  },
]
</script>

<style lang="scss" scoped>
.features-list {
  margin-bottom: $margin-lg;
  padding-left: $padding-lg;

  li {
    margin-bottom: $margin-sm;
  }
}

.demo-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: $margin-lg;
}

.demo-card {
  padding: $padding-lg;
  border-radius: $border-radius;

  background-color: $background-color;
  box-shadow: $shadow-sm;

  transition: transform $transition-duration $transition-timing,
    box-shadow $transition-duration $transition-timing;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
  }

  &__title {
    margin-bottom: $margin-sm;
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
  }

  &__description {
    margin-bottom: $margin-md;
    color: $text-color-light;
  }
}
</style>
