<template>
  <v-data-table
    :headers="dataTable.headers"
    :items="dataTable.items"
    :items-per-page="5"
    class="elevation-1"
    v-model="dataTable"
  ></v-data-table>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
  props: ["dataTable"],
  data() {
    return {
   
    };
  },

  mounted() {},
  methods: {
    
  },
};
</script>
