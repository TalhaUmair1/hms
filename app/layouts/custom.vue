<template>
  <div>
    <AppHeader/>
    <slot />
<AppFooter/>
  </div>
</template>

<script lang="ts" setup>
import AppFooter from '~/components/landing/AppFooter.vue'
import AppHeader from '~/components/landing/AppHeader.vue'

</script>

<style>

</style>