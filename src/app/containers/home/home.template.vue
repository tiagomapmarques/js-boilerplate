<template>
  <page-container :routeName="route.name">
    <div jsbp-aboutcontainer :class="styles.container">
      <autocomplete :onChange="handleChange" :useMockApi="mockapiData" :translate="translate"/>
      <daily-forecasts :forecastList="forecastList" />
    </div>
  </page-container>
</template>
