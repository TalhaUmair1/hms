<template>
  <div>
    <Header/>
    <slot />
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>
