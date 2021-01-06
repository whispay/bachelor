<template>
  <v-app>
    <v-main class="blue lighten-4">
      <Navbar @submit="userToken = $event" />

      <router-view :userToken='userToken'  class="px-15 py-10"> </router-view>
    
  
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  
  data(){
    return {
      userToken: {
        
      }
    }
  },
};
</script>
