// eslint-disable-next-line prettier/prettier
<template>
  <h2><br />{{ title }}</h2>
  <div class="v-catalog">
    <router-link :to="{ name: 'cart', query: {cart_data}}">
      <div class="catalog_to_cart">Корзина: {{ CART.length }} </div>
    </router-link>
    <vCatalogItem
      v-for="product in PRODUCTS"
      :key="product.article"
      :product_data="product"
      @addToCart="addToCart"
    />
  </div>
</template>
<script>
import vCatalogItem from "./v-catalog-item.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-catalog",
  components: {
    vCatalogItem,
  },
  props: {},
  data() {
    return {
      title: "Каталог",
    };
  },
  computed: {
    ...mapGetters([
      "PRODUCTS",
      "CART"
    ]),
  },
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_API", 
      "ADD_TO_CART"
    ]),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    .then((response)=>{
      if(response.data){
        console.log('Data arrived');
        
      }
    });
  },
  watch: {},
};
</script>
<style lang="sass">
.v-catalog
  width: 1200px
  display: flex
  flex-flow: wrap
  justify-content: start
  .catalog_to_cart
    position: absolute
    right: 95px
    top: 50px 
    padding: 20px 30px
    background: red
    color: #000
    border-radius: 10px
    text-transform: uppercase
    font-weight: bold 
</style>
