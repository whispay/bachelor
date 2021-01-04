<template>
  <v-container fill-height ma-0 pa-5 class="justify-center">
    <v-card class="pa-10" elevation="10" outlined>
      <v-form>
        <h1 class="mb-5">Login</h1>

        <v-text-field
          outlined
          label="Username"
          v-model="user.username"
          style="width: 400px !important"
        ></v-text-field>

        <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="rules"
          :type="show ? 'text' : 'password'"
          hint=""
          value="wqfasds"
          class="input-group--focused"
          @click:append="show = !show"
          outlined
          label="Password"
          v-model="user.password"
          style="width: 400px !important"
        ></v-text-field>
        <v-btn class="primary" v-on:click.stop.prevent="submit"> Login </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>



<script>
import axios from "axios";
export default {
  //components: { LoginPopup },
  data() {
    return {
      dialog: false,
      drawer: false,
      show: false,
      rules: {},

      user: {
        username: "",
        password: "",
      },
      confirmation: "",
    };
  },
  methods: {
    submit() {
      (this.rules = [
        (value) => !!value || "Required.",
        (v) => v.length >= 8 || "Min 8 characters",
        () => `The username and password you entered don't match`,
      ]),
      console.log(this.username, this.password);

      //this.$router.push("/main");
      const response = axios.get(
        "http://localhost:3000/authentication/uname=" +
          this.user.username +
          "&pwd=" +
          this.user.password
      );
      Promise.resolve(response).then((values) => {
        this.confirmation = values.data;
      });
      if (this.confirmation == "success") {
        this.$router.push("/main");
      }

      this.$emit("submit", this.user);
    },
  },
};
</script>