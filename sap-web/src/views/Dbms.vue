<template>
  <div class="dbms">
    <v-container class="grey lighten-3" v-show="loginToken">
      <v-row no-gutters>
        <v-col :key="1" cols="12" sm="4">
          <DbNavigator @getTable="dataTable = $event"/>   
        </v-col>
        <!-- 2nd Column -->
        <v-col :key="2" cols="12" sm="8">
            <!-- SQL Textarea -->
           <SqlTextfield @getTable="dataTable = $event" /> 
          <!-- DatenTabelle -->
          <DataTable :dataTable='dataTable'/>
       
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import DbNavigator from "@/components/DbNavigator"
import SqlTextfield from "@/components/SqlTextfield"
import DataTable from "@/components/DataTable"
export default {
  components: {DbNavigator, SqlTextfield, DataTable},
  props: ["loginToken"],
  data() {
    return {

      col_names: [],
      dataTable:{},
    };
  },

  mounted() {
   
  },
  methods: {
   
  },
};
</script>
