<template>
  <div class="home">
    <h1>Homepage</h1>
    <p>{{Schemas[0]}} </p>
   
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

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
    const response = axios.get("http://localhost:3000/tables/schema_name=UPHAN");
    Promise.resolve(response).then((values) => {
    this.Schemas = ((values.data))});
  },
};
</script>
