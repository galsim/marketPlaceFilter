<template>
  <div id="app">
    <skeleton />
  </div>
</template>

<script>
import skeleton from "./components/skeleton.vue";

export default {
  name: "app",
  components: {
    skeleton
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
