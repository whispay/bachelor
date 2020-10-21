<template>
  <v-card class="text-left" width="300">
    <v-list  style="height: 600px; min-width: 3 00px; max-width: 100%;"
       class="overflow-y-auto">
      <v-list-group v-for="schema in schemas_selected" :key="schema.index" :value="true">
        <template v-slot:activator>
          <v-list-item-title>{{ schema }}</v-list-item-title>
        </template>
        <v-list-group
          :value="true"
          no-action
          sub-group
          v-for="table in TABLES"
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
export default {
  props: {
      schemas_selected:{
          type:Array
      }}
      ,

  data: () => ({
    SCHEMAS: [{ SCHEMA_NAME: "Schema 1" }],
    TABLES: [{ TABLE_NAME: "Table 1.1" }],
    COLUMNS: [{ COLUMN_NAME: "Column 1" }, { COLUMN_NAME: "Column 2" }],
  }),
};
</script>