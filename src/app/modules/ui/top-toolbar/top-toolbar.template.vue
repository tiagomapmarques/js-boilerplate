<template>
  <div :class="classes">
    <hero :className="styles.hero">
      <h1>{{ title }}</h1>
    </hero>
    <nav-toolbar :routeName="routeName" />
  </div>
</template>
