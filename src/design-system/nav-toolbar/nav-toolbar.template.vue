<template>
  <toolbar :className="classes">
    <ul :class="styles.menu">
      <li :class="`${styles.item}${activeClass(active)}`" v-for="{ routeName, text, active } in menuItems">
        <router-link :to="{ name: routeName }">{{ text }}</router-link>
      </li>
    </ul>
  </toolbar>
</template>
