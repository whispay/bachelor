<template>
  <div class="home">
    <h1>Homepage</h1>
    {{Schemas}}
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";


export default {

  components: {},
  
  data() {
    return {
      Schemas: null,
    };
  },
  methods: {
    
  },
  mounted() {
    // fetch data from a url endpoint
    const response = axios.get("http://localhost:3000/");

    this.Schemas = response;
  },
};
</script>
