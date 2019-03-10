<template>
  <div :id="parentId">
    <div
      v-if="!!text"
      :class="style.content"
    >
      {{ title }} says {{ text }}!
    </div>
    <div :class="style.footer">
      {{ version }}
    </div>
  </div>
</template>
