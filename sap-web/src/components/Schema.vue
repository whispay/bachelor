<template>
      <div class="text-center">
    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Select Schemas
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(schema, index) in schemas"
          :key="index"
        >
          <v-list-item-title> <v-checkbox v-model="schemas_selected" :label="schema.title" :value="schema.title"></v-checkbox> </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!--<p>{{schemas_selected}}</p>-->
  </div>
</template>

<script>
export default {
    data: () => ({
      schemas: [
        { title: 'Schema1' },
        { title: 'Schema2' },
        { title: 'Schema3' },
        { title: 'Schema4' },
      ],
      schemas_selected:[]
    }),
}
</script>