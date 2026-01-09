<template>
  <div class="v-main-wrapper">
    <router-view></router-view>
    <!-- <v-catalog /> -->
    <!-- <v-cart 
      v-if="CART.length"
      :cart_data="CART"    
    /> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
// import vCart from './v-cart.vue';
// import VCatalog from './v-catalog.vue';
export default {
  name: "v-main-wrapper",
  components: {
    // VCatalog,
    // vCart,
  },
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
  computed: {
    ...mapGetters([
      'CART'
    ])
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
