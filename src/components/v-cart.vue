<template>
  <div class="v-cart">
    <router-link :to="{name: 'catalog'}">
      <div class="catalog_to_cart">Вернуться в каталог</div>
    </router-link>
    <div class="title"><h2>{{ title }}</h2> </div>
    
    <vCartItem
      v-for="(item, index) in cart_data" 
      :key="item.article" 
      :cart_item_data="item" 
      @deleteFromCart="deleteFromCart(index)"
    />
  </div>
</template>
<script>
import vCartItem from "./v-cart-item.vue";
import { mapActions } from "vuex";
export default {
  name: "v-cart",
  components: {
    vCartItem,
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      title: "корзина",
    };
  },
  computed: {},
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
    ]),
    deleteFromCart(index){
      this.DELETE_FROM_CART(index);
      
    }
  },
  watch: {},
};
</script>
<style lang="sass">
.v-cart
  width: 1200px
  a
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
