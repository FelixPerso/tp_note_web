<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedQuantity: 1
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart-with-quantity', this.product.id, this.selectedQuantity);
    }
  }
};
</script>

<template>
  <div class="p-3 border bg-light">
    <h5>{{ product.name }}</h5>
    <p>{{ product.desc }}</p>
    <p>{{ product.price }}€</p>
    <p>Remaining stock: {{ product.stock }}</p>
    <div class="input-group mb-3">
      <input type="number" class="form-control" v-model="selectedQuantity" min="1" :max="product.stock">
      <button type="button" class="btn btn-success btn-sm" @click="addToCart">Add to cart</button>
    </div>
  </div>
</template>

<style scoped>

</style>
