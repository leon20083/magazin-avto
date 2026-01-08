<template>
  <div class="v-main-wrapper">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "v-main-wrapper",
  props: {},
  data() {
    return {
    };
  },
  methods: {
    goToCatalogItem() {
      this.$router.push('/catalog-item')
    },
  },
  watch: {},
};
</script>
<style lang="sass">
.v-main-wrapper
    display: flex
    justify-content: center
    flex-wrap: nowrap
    flex-direction: column
    align-items: center
    max-width: 1200px
    margin: 0 auto
    padding-bottom: 96px
    // color: red
// .v-catalog
//   display: flex
</style>
