<template>
  <div>
    <Navbar />
    <div class="container pt-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>
