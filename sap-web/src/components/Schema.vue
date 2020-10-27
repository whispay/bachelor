<template>
      <div class="text-left">
    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          style="min-width: 300px; max-width: 100%;"
        >
          Select Schemas
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(schema, index) in SCHEMAS"
          :key="index"
        >
          <v-list-item-title> <v-checkbox @click="emitSelection()" v-model="schemas_selected" :label="schema.SCHEMA_NAME" :value="schema.SCHEMA_NAME"></v-checkbox> </v-list-item-title>
        </v-list-item>

      </v-list>
     
    </v-menu>
    <!--<p>{{schemas_selected}}</p>-->
  </div>
</template>

<script>
 //const sqlQuery= "Select * from schemas where schema_owner ='"+req.params.owner_name+"'";
export default {
    
    created() {
      /*const config = require('@/data/schema.json');
      console.log(config.SCHEMAS.length);
      for(var i = 0; i < config.SCHEMAS.length; i++){
        this.SCHEMAS.push(config.SCHEMAS[i]);
      }*/

     
      
    },


    data: () => ({
      SCHEMAS: [],
      schemas_selected:[]
    }),
    props: {
        Schemas: {
            type: String,
            default: null
        }
    },
    methods:{
      emitSelection(){
          this.$emit('schemaChangeEvent', this.schemas_selected)
      }
    }
}
</script>