<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import base64url from "base64url";
import { merge } from "lodash";
import HelloWorld from "./components/HelloWorld.vue";

export default Vue.extend({
  name: "app",
  components: {
    HelloWorld
  },
  async mounted() {
    const rawRes = await fetch(`/webauthn/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "odan",
        username: "odan"
      })
    });
    const res = await rawRes.json();
    const publicKey = merge(res, {
      challenge: base64url.toBuffer(res.challenge),
      user: {
        id: base64url.toBuffer(res.user.id)
      }
    });
    console.log("publicKey", publicKey);
    const credential = await navigator.credentials!.create({ publicKey });
    console.log("credential", credential);
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
