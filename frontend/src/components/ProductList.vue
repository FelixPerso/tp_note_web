<script>
import ProductComponent from "@/components/ProductComponent.vue";

export default {
  components: {
    ProductComponent
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    addToCartWithQuantity(productId, quantity) {
      this.$emit("add-to-cart", productId, quantity);
    }
  }
};
</script>

<template>
  <div class="row gx-4 gy-4 row-cols-3">
    <div class="col" v-for="product in products" :key="product.id">
      <ProductComponent
          :product="product"
          @add-to-cart-with-quantity="addToCartWithQuantity"/>
    </div>
  </div>
</template>

<style scoped>
</style>