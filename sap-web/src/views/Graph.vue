<template>
  <div class="graph">
    <!-- JavaScript Graph/Network Lib - cytoscape (link)
JavaScript  Interactive Maps Lib - leaflet 
https://github.com/ic-htw/adb -->

    <v-container
      class="white"
      id="cy"
      style="width: 100vw; height: 80vh; position: absolute"
    ></v-container>
  </div>
</template>
<script>
import cytoscape from "cytoscape";
//import avsdf from 'cytoscape-avsdf';
export default {
  name: "App",
  components: {},

  data() {
    return {
      user: {},
    };
  },
  mounted() {

    cytoscape({
      container: document.getElementById("cy"),
      layout: {name: 'random'},
      elements: [
      this.createNodes("A"),
      this.createNodes("B"),
      this.connectNodes("A","B")        
      ],
      style: [
        {
          selector: "node",
          style: {
            label: "data(id)",
          },
        },
      ], 
    }, 
   );

  },

  methods: {
    //Cytoscape Object = {container: container.id, Elements:[...]}
    //Elements
    createNodes(node_name) {
      return { data: { id: node_name } };
    },

    connectNodes(node_a, node_b) {
      return {data: { id:node_a+node_b, source:node_a, target: node_b}}
    },
  },
};
</script>
