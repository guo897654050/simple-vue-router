<template>
  <div>
    <h2>app</h2>
    <p @click="gohome">go home</p>
    <p @click="gotest">go test</p>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    gohome() {
      this.$router.push('/home')
    },
    gotest() {
      this.$router.push('/test')
    }
  }
}
</script>