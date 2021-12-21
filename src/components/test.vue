<template>
  <div>
    <p @click="clickHandle">test</p>
    <router-link to="/" tag="div">to home</router-link>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    created() {
    },
    methods: {
      clickHandle() {
        console.log('click', this.$router.push('/'))
      }
    }
  }
</script>