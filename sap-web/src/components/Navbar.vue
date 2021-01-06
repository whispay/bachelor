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
        v-show="!!!this.user.LoginToggler"
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
        v-show="!!!this.user.LoginToggler"
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
            {{ LoginBtnText }} <v-icon right>login</v-icon></v-btn
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
import axios from "axios";

export default {
  data() {
    return {
      show: false,
      rules: [],
      LoginBtnText: "Sign In",
      dialog: false,
      drawer: false,
      loading: false,
      user: {
        username: "uphan",
        password: "Bcdefgh1",
        LoginToggler: false,
        userToken: "",
      },
      confirmation: "",
      confirmationMsg: "",
      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "table_chart", text: "DBMS", route: "/dbms" },
        { icon: "show_chart", text: "Graph", route: "/graph" },
        { icon: "map", text: "Map", route: "/map" },
        { icon: "person", text: "Team", route: "/team" },
      ],
    };
  },
  methods: {
    //-------------------------Hilfsfunktionen v1-----------------------//
    submit: async function () {
      if (this.user.username === "" || this.user.password === "") {
        this.loginFailed();
      } else {
        await this.login(this.user);

        if (
          this.user.LoginToggler === true &&
          this.LoginBtnText === "Sign In"
        ) {
          this.loginSuccess();
        } else if (
          this.user.LoginToggler === true &&
          this.LoginBtnText === "Sign Out"
        ) {
          this.logout();
        } else {
          this.loginFailed();
        }
      }
    },

    login: async function (user) {
      let response = axios.post(
        "http://localhost:3000/api/user/login/uname=" +
          user.username +
          "&pwd=" +
          user.password
      );
      Promise.resolve(await response).then((values) => {
        if(values.data === false){
          this.user.LoginToggler = values.data;
        } else{
          this.user.LoginToggler = true;
          this.user.userToken = values.data;
        }
        
      });
    },
    loginSuccess: function () {
      this.confirmationMsg = "Login war erfolgreich.";
      this.rules = [];
      this.LoginBtnText = "Sign Out";
      this.$emit("submit", this.user);
      this.$router.push("/dbms");
    },
    loginFailed: function () {
      this.confirmationMsg = "Login war nicht erfolgreich.";
      this.rules = [
        (value) => !!value || "Required.",
        () => `The username and password you entered don't match`,
      ];
    },
    logout() {
      this.user.username = "";
      this.user.password = "";
      this.user.LoginToggler = false;
      this.user.userToken = "";
      this.confirmationMsg = "Erfolgreich ausgeloggt";
      this.confirmation = "";
      this.LoginBtnText = "Sign In";
      this.$router.push("/home");
      this.$emit("submit", this.user);
    },

    //-------------------------Hilfsfunktionen v2-----------------------//
    /*
    async submitV2() {
      if (this.user.LoginToggler == false) {
        if (this.user.username == "" || this.user.password == "") {
          this.rules = [(value) => !!value || "Required."];
          this.confirmationMsg = "Beide Felder müssen ausgefüllt sein!";
        } else {
          this.loading = true;

          //this.$router.push("/main");

          //Set the UserToken
          this.login(this.user);

          this.loading = false;
          //this.$emit("submit", this.user);
        }
      } else {
        this.logout();
      }
    },


    //Creates and checks the JWT Token and return a boolean
    loginV2: async function (user) {
      let response = axios.post("http://localhost:3000/api/v2/login", {
        user: user,
      });
      Promise.resolve(await response).then((values) => {
        //this.test = (Object.values(values.data));
        this.userToken = Object.values(values.data);
        this.authenticate(Object.values(values.data));
      });
    },

    // Sends the Token to the Server and tries to authenticate the userdata
    authenticateV2: async function (token) {
      var headers = this.createHeaders(token);
      let response = axios.post("http://localhost:3000/api/v2/auth", "", {
        headers: headers,
      });
      Promise.resolve(await response).then((values) => {
        if (values.data == true) {
          this.confirmation = true;
          this.confirmationMsg = "Login war erfolgreich.";
          this.rules = [];
          this.LoginBtnText = "Sign Out";
          this.user.LoginToggler = true;
          this.$emit("submit", headers);
          this.$router.push("/dbms");
        }
        if (values.data == false) {
          this.confirmation = false;
          this.confirmationMsg = "Login war nicht erfolgreich.";
          this.rules = [
            (value) => !!value || "Required.",
            () => `The username and password you entered don't match`,
          ];
        }
      });
    },

    createHeaders(token) {
      let headers = { Authorization: "Bearer " + token };
      return headers;
    },*/
  },
};
</script>