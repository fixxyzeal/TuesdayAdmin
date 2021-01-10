<template>
  <section class="section">
    <br />
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Log In To Tuesday Admin</h2>

          <Notification v-if="error" type="danger" :message="error" />

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <base-input
                  addon-left-icon="tim-icons icon-single-02"
                  placeholder="Email"
                  v-model="email"
                  type="text"
                  name="email"
                >
                </base-input>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <base-input
                  addon-left-icon="tim-icons icon-key-25"
                  placeholder="Password"
                  v-model="password"
                  type="password"
                  name="password"
                >
                </base-input>
              </div>
            </div>
            <div class="control">
              <br />
              <base-button
                class="animation-on-hover"
                type="primary"
                nativeType="submit"
                >Log In</base-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">

import  Vue from "vue"
import  Notification  from "@/components/Notification.vue";
import { BaseButton } from "@/components";

export default Vue.extend({
  layout: "login",
  middleware: "guest",
  components: {
    Notification,
    BaseButton,
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login(): Promise<void> {
      this.error = null;
      try {
        await this.$auth.loginWith("local", {
          data: {
            identifier: this.email,
            password: this.password,
          },
        });
        await this.$router.push("/");
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message;
      }
    },
  }
})
</script>