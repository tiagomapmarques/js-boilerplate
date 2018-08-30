<template>
  <div :class="classNames">
    <input type="text" v-model="innerValue" v-on:keyup="handleInputChange" :class="styles.input" :placeholder="placeholder"/>
    <ul v-if="!hideSuggestions" :class="styles.suggestions">
      <li v-for="item in suggestions" v-on:click="handleSuggestionClick(item.data)" :tabindex="0" v-on:keyup.enter="handleSuggestionClick(item.data)">
        {{ item.text }}
      </li>
    </ul>
    <div v-if="!hideSuggestions" :class="styles.invisible" v-on:click="handleInvisibleClick"></div>
  </div>
</template>
