<template>
  <div class="home">
    <h1>Homepage</h1>
    <p>{{Schemas}} s</p>
   
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {

  components: {},
  
  data() {
    return {
      Schemas: [],
    };
  },
  methods: {
    
  },
  mounted() {
    // fetch data from a url endpoint
    const response = axios.get("http://localhost:3000/");
    /*Promise.all([response]).then((values) => {
    console.log(JSON.stringify(values))});*/
    
    Promise.resolve(response).then((values) => {
    this.Schemas = (JSON.stringify(values.data))});
  },
};
</script>
