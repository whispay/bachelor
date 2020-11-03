<template>
  <div class="pa-5">
    <h3 class="text-center">HELLO WORLD</h3>
    <v-container>
      <v-row no-gutters style="flex-wrap: nowrap">
        <v-col cols="3">
          <Schema v-on:schemaChangeEvent="updateSchema" :Schemas="Schemas" />

          <TableList v-bind:value="[schemas_selected, tables_selected]" />
        </v-col>

        <v-col cols="8">
          <Command />
        </v-col>
      </v-row>
    </v-container>

    <br />
    {{ tables_selected}}

    <h1>{{schemas_selected}}</h1>
    <Table />
  </div>
</template>


<script>
import Schema from "@/components/Schema";
import Table from "@/components/Table";
import TableList from "@/components/TableList";
import Command from "@/components/Command";
import axios from "axios";

export default {
  components: { Schema, Table, TableList, Command },

  data() {
    return {
      schemas_selected: [],
      Schemas: "",
      tables_selected: [],
    };
  },
  methods: {
    updateSchema(updatedSchemaSelection) {
      this.schemas_selected = updatedSchemaSelection;
      this.get_table_names2(this.schemas_selected);
    },

    get_table_names2(schema_names) {
      this.tables_selected = [];
      if (schema_names.length == 0) {
        this.tables_selected = [];
      } else {
        // fetch data from a url endpoint
        for (var i = 0; i < schema_names.length; i++) {
          const response = axios.get(
            "http://localhost:3000/tables/schema_name=" + schema_names[i]
          );
          Promise.resolve(response).then((values) => {
            this.tables_selected.push(values.data);    
          });
        }
      }
    },
    get_table_names(schema_names) {
      if (schema_names.length == 0) {
        this.table_names = "";
      } else {
        // fetch data from a url endpoint
        var concat_schema = "";

        for (var i = 0; i < schema_names.length; i++) {
          if (i + 1 == schema_names.length) {
            concat_schema = concat_schema + schema_names[i];
          } else {
            concat_schema = concat_schema + schema_names[i] + "&";
          }
        }

        const response = axios.get(
          "http://localhost:3000/tables/schema_name=" + concat_schema
        );
        Promise.resolve(response).then((values) => {
          this.tables_selected = values.data;
        });
      }
    },
  },
  mounted() {},
};
</script>