<template>
  <v-app>
    <v-main class="blue lighten-4">
      <Navbar />

      <router-view> </router-view>

    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  
  data: () => ({
    //
  }),
};
</script>
