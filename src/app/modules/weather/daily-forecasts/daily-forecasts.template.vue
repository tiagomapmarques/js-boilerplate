<template>
  <ul :class="styles.list">
    <li :class="styles.item" v-for="{ title, metric, min, max, icon, alt } in forecastListMapped">
      <h3 :class="styles.title">{{ title }}</h3>
      <div :class="styles.image">
        <img :src="icon" :alt="alt" />
      </div>
      <div :class="styles.information">
        <div>{{ alt }}</div>
        <div>
          <span>{{ min }} {{ metric }}</span> - <span>{{ max }} {{ metric }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
