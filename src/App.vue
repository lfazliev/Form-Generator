<template>
  <div id="app">
    <nav class="nav">
      <div class="container nav__container">
        <div class="nav__logo">Генератор форм</div>
        <ul class="nav__menu">
          <li class="nav__menu-item">
            <router-link to="/" exact-active-class="active">
              Главная
            </router-link>
          </li>
          <li class="nav__menu-item">
            <router-link to="/contact-form" active-class="active">
              Контактная форма
            </router-link>
          </li>
          <li class="nav__menu-item">
            <router-link to="/registration-form" active-class="active">
              Регистрация
            </router-link>
          </li>
          <li class="nav__menu-item">
            <router-link to="/product-form" active-class="active">
              Товар
            </router-link>
          </li>
          <li class="nav__menu-item">
            <router-link to="/custom-form" active-class="active">
              Кастомизация
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main class="container">
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2025 Генератор форм на Vue 3 + TypeScript</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/main';
</style>
