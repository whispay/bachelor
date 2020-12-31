<template>
  <nav>
    <!-- Toolbar verwenden Flexbox -->
    <v-app-bar app class="primary" flat>
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light"> SAP </span>
        <span>WEB</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-text-field
        v-show="!!!this.confirmation"
        background-color="white"
        class="pt-5 mx-2"
        input="white"
        color="white"
        label="Username"
        :rules="rules"
        v-model="user.username"
        :success="!!this.confirmation"
        
      ></v-text-field>

      <v-text-field
        v-show="!!!this.confirmation"
        background-color="white"
        class="pt-5 mx-2 input-group--focused"
        label="Password"
        color="white"
        :success="!!this.confirmation"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules"
        :type="show ? 'text' : 'password'"
        hint=""
        @click:append="show = !show"
        v-model="user.password"
      ></v-text-field>

      <v-dialog max-width="400" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on:click.stop.prevent="submit"
            :loading="loading"
            color="accent"
            dark
            v-bind="attrs"
            v-on="on"
          >
            {{LoginBtnText}} <v-icon right>login</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Notification
          </v-card-title>

          <v-card-text> {{ confirmationMsg }} </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <LoginPopup /> -->
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="secondary">
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>



<script>
//import LoginPopup from '../components/LoginPopup'
import axios from "axios";
export default {
  //components: { LoginPopup },
  data() {
    return {
      show: false,
      rules: [],
      LoginBtnText: "Sign In",
      dialog: false,
      drawer: false,
      loading: false,
      user: {
        username: "",
        password: "",
        LoginToggler: false,
      },
      confirmation: "",
      confirmationMsg: "",
      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "show_chart", text: "Graph", route: "/graph" },
        { icon: "person", text: "Team", route: "/team" },
      ],
    };
  },
  methods: {
    getConfirmation: async function () {
      let response = axios.get(
        "http://localhost:3000/authentication/uname=" +
          this.user.username +
          "&pwd=" +
          this.user.password
      );
      Promise.resolve(await response).then((values) => {
        this.confirmation = values.data;
      });
    },

    async submit() {
      if(this.user.LoginToggler == false) {
      if(this.user.username =="" || this.user.password ==""){
        this.rules = [(value) => !!value || "Required."]
        this.confirmationMsg= "Beide Felder müssen ausgefüllt sein!"
      }
      
      else{
      this.loading = true;
      console.log(this.user.username, this.user.password);
      //this.$router.push("/main");

      await this.getConfirmation();

      if (this.confirmation == true) {
        this.confirmationMsg = "Login war erfolgreich.";
        this.rules = [];
        this.LoginBtnText = "Sign Out";
        this.user.LoginToggler = true;
      } else if (this.confirmation == false) {
        this.confirmationMsg = "Login war nicht erfolgreich.";
        this.rules = [
          (value) => !!value || "Required.",
          () => `The username and password you entered don't match`,
        ];
      }
      this.loading = false;
      this.$emit("submit", this.user);
      }
      }
      else {
        this.user.username = "";
        this.user.password = "";
        this.user.LoginToggler = false;
        this.confirmationMsg = "Erfolgreich ausgeloggt";
        this.confirmation = "";

      }
    },
  },
};
</script>