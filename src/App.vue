<template>

  <MainLayout>
    <router-view />
  </MainLayout>
</template>

//// src/App.vue 
<script>
import MainLayout from './layouts/mainLayout.vue';
export default {
  //// name: 'App',
  components: {
    MainLayout
  }
}
</script>
<style scoped></style>
