<template>
  <div :class="classes" :id="rootId">
    <page-body>
      <top-toolbar :routeName="routeName" />
      <page-content>
        <slot />
      </page-content>
    </page-body>
    <bottom-toolbar />
  </div>
</template>
