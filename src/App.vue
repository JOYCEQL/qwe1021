<template>
  <div id="app" onselectstart="return false">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /* eslint太严格了 */
 height: 100%;
}
</style>
