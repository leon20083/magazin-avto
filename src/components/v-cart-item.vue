<template>
  <div class="v-cart-item">
    <img class="cart_item_image" :src="cart_item_data.image" />
    <div class="v_cart_info">
      <p>{{ cart_item_data.name }}</p>
      <p>{{ cart_item_data.price }}</p>
      <p>{{ cart_item_data.article }}</p>
    </div>
    <div class="cart_item_quantity">{{ cart_item_data.quantity }}</div>
    <button @click="deleteFromCart">Удалить</button>
  </div>
</template>

<script>

export default {
  name: "v-cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default(){
        return {}
      } 
    }
  },
  methods:{
    deleteFromCart(){
      this.$emit('deleteFromCart');
    }
  },
  mounted(){
    // eslint-disable-next-line vue/no-mutating-props
    this.cart_item_data.quantity = 1;
  }
}
</script>
<style lang="sass">
.v-cart-item
  display: flex
  flex-wrap: nowrap
  justify-content: space-between  
  align-items: center
  border: 1px solid
  padding: 10px
  border-radius: 10px
  margin: 10px
  .cart_item_quantity
    padding: 25px
  button
    padding: 10px 20px
    font-size: 18px
    text-transform: uppercase
    font-weight: 700
</style>
