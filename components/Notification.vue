<template>
  <base-alert :type="`${type}`" >
    {{ message }}
  </base-alert>
</template>

<script>
import BaseAlert from './BaseAlert.vue';
export default {
  name: "Notification",
  components: {
    BaseAlert
    
  },
  props: {
    type: {
      type: String,
      default: "success",
      validator: (val) => ["danger", "success"].includes(val),
    },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>