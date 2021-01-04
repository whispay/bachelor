<template>
  <v-card class="text-left">
    <!--
    <v-list style="height: 600px" class="overflow-y-auto">
      <v-list-group
        v-for="schema in value[0]"
        :key="schema.index"
        :value="true"
      >
        <template v-slot:activator>
          <v-list-item-title>{{schema}}</v-list-item-title>
        </template>
        <v-list-group
          :value="true"
          no-action
          sub-group
          v-for="table in value[1][0]"
          :key="table.index"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ table.TABLE_NAME }}</v-list-item-title>
            </v-list-item-content>
          </template>
          
          <v-list-item v-for="column in COLUMNS" :key="column.index" link>
            <v-list-item-icon>
              <v-icon>view_column</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="column.COLUMN_NAME"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>

    </v-list>-->
    <v-list style="height: 600px" class="overflow-y-auto">
      <v-list-group
        v-for="schema in value[0]"
        :key="schema.index"
        :value="true"
      >
        <template v-slot:activator>
          <v-list-item-title>{{ schema }}</v-list-item-title>
        </template>
        <v-list
          :value="true"
          no-action
          sub-group
          v-for="table in value[1][0]"
          :key="table.index"
        >
          <v-hover v-slot:default="{ hover }">
         
            <v-list-item>
              <v-card  :elevation="hover ? 12 : 2" class="pa-2">
              <v-list-item-title
                ><v-card></v-card><v-icon>subdirectory_arrow_right</v-icon>
                {{ table.TABLE_NAME }}</v-list-item-title
              >
              </v-card>
            </v-list-item>
              
          </v-hover>

        </v-list>
      </v-list-group>
    </v-list>
  </v-card>

  <!--
    <v-container class="my-5">
        <h3>List of Tables</h3>
        <v-hover  v-slot:default="{ hover }">
        <v-card   :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }" flat class="pa-3" v-for="table in TABLES" :key="table.index">
            <v-layout>
                <v-flex>
                    <div class="caption grey--text">Table Name</div>
                    <div>{{table.TABLE_NAME}}</div>
                </v-flex>
            </v-layout>
        </v-card>
        </v-hover>
    </v-container> -->
</template>

<script>
//import axios from "axios";

export default {
  props: {
    //Value is the combined variable from tables_selected and schemas_selected
    value: {
      type: Array,
    },
  },
  data: () => ({ hover:true, }),
  mounted() {},
  methods: {},
};
</script>