<template>
  <v-card class="pa-2 mb-3" outlined tile>
    <v-container fluid>
      <v-textarea label="SQL-Queries" rows="8" v-model="sqlText"></v-textarea>
      <p id="hintText" class="red--text font-weight-light">
        {{ hintText }}
      </p>
      <p class="green--text font-weight-light">{{ successText }}</p>
    </v-container>
    <v-btn @click="submitSqlText()" color="accent">Submit</v-btn>
    <v-btn @click="clearSqlText()" color="secondary">Clear</v-btn>
    <v-btn @click="forceUpdate()" color="success"
      ><v-icon>cached</v-icon></v-btn
    >
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
      sqlText: "",
       hintText: "",
      successText: "",
      table: {
        headers: [],
        items: [],
      },
   
    };
  },

  mounted() {},
  methods: {
    submitSqlText() {
      this.hintText = "";
      this.successText = "";
      axios
        .post("http://localhost:3000/api/sql/sqlQuery", {
          sqlQuery: this.sqlText,
        })
        .then((response) => {
          Promise.resolve(response).then((values) => {
            //Anfrage ohne Statuscode = kein Fehler
            if (values.data.code == undefined) {
              //Anfrage mit einer Leeren Rückgabe
              if (values.data.length != 0) {
                this.table.headers = this.toVFormatHeader(
                  this.getHeader(values.data)
                );
                this.table.items = values.data;
                this.successText = "Success";
                this.$emit('getTable', this.table);
              } else {
                this.successText = "Success - But Table is empty.";
              }
            } else {
              this.hintText =
                "Code: " + values.data.code + " Msg: " + values.data.message;
            }
          });
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getHeader(data) {
      var header = Object.getOwnPropertyNames(data[0]);
      return header;
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

    clearSqlText() {
      this.sqlText = "";
      this.successText = "";
      this.hintText = "";
    },
  },
};
</script>
