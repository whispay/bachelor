<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="accent"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Sign In
          <v-icon right>login</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
         Sign In
        </v-card-title>

        <v-card-text>
            <v-form class="px-3">
                <v-text-field label="Username" v-model="username"></v-text-field>

                <v-text-field label="Password" v-model="password"></v-text-field>
        
            </v-form>
                <v-btn class="accent mr-2" v-on:click.stop.prevent="submit"> Login </v-btn>
                <v-btn class="secondary"  @click="dialog = false"> Abort </v-btn>
        </v-card-text>

        <v-divider></v-divider>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
 export default {
    data () {
      return {
        dialog: false,
        username:'',
        password:'',
      }
    },
    methods:{
        submit(){
            console.log(this.username, this.password)
            this.$router.push("/main");
            
        },

    }
  }
</script>