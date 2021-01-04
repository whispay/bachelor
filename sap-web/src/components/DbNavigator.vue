<template>
  <v-card class="pa-2 mr-3" outlined tile>
    <!--<v-btn @click="getSchemaNames"> </v-btn> -->
    <v-list :disabled="isLoading">
      <v-list-group v-for="s in schema_names" :key="s.index">
        <template v-slot:activator>
          <v-list-item-content
            ><v-list-item-title @click="getTableNames(s.SCHEMA_NAME)"
              ><v-progress-circular
                :indeterminate="isLoading"
                v-show="isLoading"
                color="primary"
                class="mr-5"
              ></v-progress-circular
              >{{ s.SCHEMA_NAME }}</v-list-item-title
            >
          </v-list-item-content>
        </template>
        <v-list v-for="t in table_names" :key="t.index">
          <v-list-item link @click="getTable(t.TABLE_NAME)">
            <v-list-item-icon
              ><v-icon class="ml-15"
                >subdirectory_arrow_right</v-icon
              ></v-list-item-icon
            >
            <v-list-item-title>{{ t.TABLE_NAME }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
// @ is an alias to /src
import axios from "axios";


export default {
  components: {},
  props: ["loginToken"],
  data() {
    return {
 
      isLoading: false,
      table_names: "",
      schema_names: "",
      table:{
          headers: [],
          items: []
      }

    };
  },

  mounted() {
    this.getSchemaNames();
  },
  methods: {
 
   
    getSchemaNames() {
      let response = axios.get("http://localhost:3000/schemas/names");
      Promise.resolve(response).then((values) => {
        this.schema_names = values.data;
      });
    },

    async getTableNames(schema_name) {
      this.isLoading = true;
      let response = axios.get(
        "http://localhost:3000/tables/names/schema_name=" + schema_name
      );
      Promise.resolve(await response).then((values) => {
        this.table_names = values.data;
        this.isLoading = false;
      });
    },

    getHeader(data) {
      var header = Object.getOwnPropertyNames(data[0]);
      return header;
    },

    async getTable(tablename) {
      this.table.headers = [];
      this.table.items = [];

      const response = axios.get(
        "http://localhost:3000/tables/table_name=" + tablename
      );

      Promise.resolve(await response).then((values) => {
        this.table.headers = this.toVFormatHeader(this.getHeader(values.data));
        this.table.items = values.data;
      });
      this.$emit('getTable', this.table);
    },
    toVFormatHeader(data) {
      var array = [];
      for (var i = 0; i < data.length; i++) {
        var obj = {};
        if (i == 0) {
          (obj.text = data[i]),
            (obj.value = data[i]),
            (obj.align = "start"),
            (obj.sortable = false);
        } else {
          (obj.text = data[i]), (obj.value = data[i]);
        }

        array.push(obj);
      }
      return array;
    },
  },
};
</script>
