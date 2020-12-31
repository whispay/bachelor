<template>
  <div class="home">
    <v-container class="grey lighten-3">
      <v-row no-gutters>
        <v-col :key="1" cols="12" sm="4">
          <v-card class="pa-2 mr-3" outlined tile>
            <v-btn @click="getSchemaNames"> </v-btn>
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
        </v-col>
        <!-- 2nd Column -->
        <!-- SQL Textarea -->
        <v-col :key="2" cols="12" sm="8">
          <v-card class="pa-2 mb-3" outlined tile>
            <v-container fluid>
              <v-textarea
                label="SQL-Queries"
                rows="8"
                v-model="sqlText"
              ></v-textarea>
            </v-container>
            <v-btn @click="submitSqlText()" color="accent">Submit</v-btn>
            <v-btn @click="clearSqlText()" color="secondary">Clear</v-btn>
          </v-card>

          <!-- DatenTabelle -->
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            class="elevation-1"
            v-model="dataTable"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>

    <!--<v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>-->
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  components: {},
  props: ["loginToken"],
  data() {
    return {
      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"],
      ],
      sqlText: "HALLO",
      isLoading: false,
      table_names: "",
      schema_names: "",
      col_names: [],
      headers: [],
      items: [],
      dataTable: [],
    };
  },

  mounted() {
    /* fetch data from a url endpoint
    const response = axios.get(
      "http://localhost:3000/tables/table_name=Personen"
    );
    Promise.resolve(response).then((values) => {
      this.headers = this.toVFormatHeader(this.getHeader(values.data));
      this.items =values.data;
    });*/
  },
  methods: {
    clearSqlText() {
      this.sqlText = "";
    },
    submitSqlText() {
      axios
        .post("http://localhost:3000/sqlQuery", {
          sqlQuery: this.sqlText,
        })
        .then((response) => {
          Promise.resolve(response).then((values) => {
            this.headers = this.toVFormatHeader(this.getHeader(values.data));
        this.items = values.data;
        this.dataTable.$forceUpdate();
          });
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
      this.headers = [];
      this.items = [];

      const response = axios.get(
        "http://localhost:3000/tables/table_name=" + tablename
      );

      Promise.resolve(await response).then((values) => {
        this.headers = this.toVFormatHeader(this.getHeader(values.data));
        this.items = values.data;
        this.sqlText = values.data + " ";
      });
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
