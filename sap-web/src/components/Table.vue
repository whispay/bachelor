<template>
<v-card>
 <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    </v-card>
</template>

<script>

  import axios from "axios";

export default {
  components: {},
  props: {
    table_name: {
      type: String,
    },
  },
  data() {
    return {
      col_names: [],
      headers: [],
      items: [],
    };
  },

  mounted() {
    // fetch data from a url endpoint
    const response = axios.get(
      "http://localhost:3000/tables/table_name="+this.table_name
    );
    Promise.resolve(response).then((values) => {
      this.headers = this.toVFormatHeader(this.getHeader(values.data));
      this.items =values.data;
    });
  },
  methods: {
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
  },
};
</script>