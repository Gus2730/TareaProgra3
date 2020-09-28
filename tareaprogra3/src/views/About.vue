<template>
  <div class="about">
    <h1>This is an about page: {{token}}</h1>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([ "token"]),
  },
}
</script>