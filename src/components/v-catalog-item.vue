<template>
  <div class="v-catalog-item">
    <div class="image"><img :src="product_data.image"/></div>
    <h5 class="name">{{ product_data.name }}</h5>
    <!-- <p class="desc-mod">{{ product_data.desc_mod }}</p> -->
    <!-- <p class="article">{{ product_data.article }}</p> -->
    <!-- <p class="price">Стоимость {{ product_data.price }} р</p> -->
    <button
      class="v-catalog-item-add_to_card_btn btn"
      @click="addToCart"
    >
      В корзину
    </button>
  </div>
</template>
<script>
export default {
  name: "v-catalog-item",
  components: {},
  props: {
    product_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      title: "Я деталь каталога",
      isHovered: false,
      noHovered: true,
    };
  },
  computed: {},
  methods: {
    addToCart(){
      this.$emit("addToCart",this.product_data)
    },
    handleMouseEnter() {
      this.isHovered = true; // при наведении
    },
    handleMouseLeave() {
      this.isHovered = false; // при уходе
    }
  },
  watch: {},
};
</script>
<style lang="sass">
.v-catalog-item
  position: relative
  border: 1px solid
  border-radius: 1em
  padding-top: 20px
  display: flex
  flex-direction: column
  max-width: 18%
  min-width: 18%
  margin: 10px
  cursor: pointer
  .image
    height: 75px
    margin: 0 auto  
    img
      max-width: calc(100% - 32px)
      max-height: 92px
  &:hover
    .desc-mod
      position: absolute
      display: flex
      flex-wrap: wrap
  .desc-mod
    display: none
    background: #fff
    z-index: 1
    width: 100% 
    margin-top: 120px
    min-height: 100px
    padding: 5px
</style>
