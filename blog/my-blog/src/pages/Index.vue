<template>
  <div>
    <v-header/>
    <img src="../assets/logo.png">
    <v-footer/>
  </div>
</template>

<script>
  import vHeader from '@/components/Header.vue';
  import vFooter from '@/components/Footer.vue';

  export default {
    name: "index",
    components: {
      vHeader,
      vFooter
    }
  }
</script>

<style scoped>

</style>
