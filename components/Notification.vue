<template>
  <base-alert :type="`${type}`" >
    {{ message }}
  </base-alert>
</template>

<script lang="ts">
import  Vue from "vue"
import BaseAlert from './BaseAlert.vue';
export default Vue.extend({
  name: "Notification",
  components: {
    BaseAlert
    
  },
  props: {
    type: {
      type: String,
      default: "success",
      validator: (val:string) => ["danger", "success"].includes(val),
    },
    message: {
      type: String,
      default: "",
    },
  },
});
</script>