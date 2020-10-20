<template>
  <div class="pa-5">
    <h3 class="text-center">HELLO WORLD</h3>
    <Schema v-on:schemaChangeEvent="updateSchema"/>

    <TableList v-bind:schemas_selected="schemas_selected"/>
    <br />
    <Table />
  </div>
</template>


<script>
import Schema from "@/components/Schema";
import Table from "@/components/Table";
import TableList from "@/components/TableList";
export default {
  components: { Schema, Table, TableList },

  data() {
    return {
      schemas_selected: [],
    };
  },
  methods:{
      updateSchema(updatedSchemaSelection){
         this.schemas_selected = updatedSchemaSelection;
         
      }
  }
};
</script>