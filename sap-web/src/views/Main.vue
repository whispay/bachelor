<template>
  <div class="pa-5">
    <h3 class="text-center">HELLO WORLD</h3>
    <v-container>
      <v-row no-gutters style="flex-wrap: nowrap">
        <v-col cols="3">
          <Schema v-on:schemaChangeEvent="updateSchema" />
          <TableList v-bind:schemas_selected="schemas_selected" />
        </v-col>

        <v-col cols="8">
          <Command />
        </v-col>
      </v-row>
    </v-container>

    <p>{{Schemas}} HIER </p>
    <br />
    <Table />
  </div>
</template>


<script>
import Schema from "@/components/Schema";
import Table from "@/components/Table";
import TableList from "@/components/TableList";
import Command from "@/components/Command";
import axios from 'axios'


export default {
  components: { Schema, Table, TableList, Command },

  data() {
    return {
      schemas_selected: [],
      Schemas:"",
    };
  },
  methods: {
    updateSchema(updatedSchemaSelection) {
      this.schemas_selected = updatedSchemaSelection;
    },
  },
     mounted(){
    
 
          // fetch data from a url endpoint
          const response = axios.get('http://localhost:3000/');
          
            
          this.Schemas = response;
   
      
    }
  
};
</script>