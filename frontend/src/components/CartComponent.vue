<script>
export default {
  props: {
    cart: {
      type: Object,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    productCount: {
      type: Number,
      required: true
    },
    getProductName: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      showConfirmationDeleteAllFromCart: false,
      showConfirmationRemoveProductFromCart: false,
      productIdToDelete: null,
    };
  },
  methods: {
    openModalDeleteAll() {
      this.showConfirmationDeleteAllFromCart = true;
    },
    deleteAll() {
      this.$emit('clear-cart');
    },
    openModalRemoveProduct(productId) {
      this.productIdToDelete = productId;
      this.showConfirmationRemoveProductFromCart = true;
    },
    deleteProduct() {
      this.$emit('remove-all-from-cart', this.productIdToDelete);
    }
  }
};
</script>

<template>
  <div>
    <div class="col">
      <div class="p-3 border bg-success">
        <h5>Cart</h5>
      </div>
    </div>
    <div class="row gx-4 row-cols-1">
      <div class="col" v-for="(quantity, id) in cart" :key="id">
        <div class="p-3 border bg-light">
          <h5>{{ getProductName(id) }}</h5>
          <h6>Quantity: {{ quantity }}</h6>
          <b-button type="button" class="btn btn-success btn-sm" @click="$emit('remove-from-cart', id)">Remove 1</b-button>
          <b-button type="button" class="btn btn-danger btn-sm" @click="openModalRemoveProduct(id)">Remove this product</b-button>
        </div>
      </div>

      <div class="col">
        <div class="p-3 border bg-success">
          <h5>Total: {{ totalPrice }}€</h5>
          <h6>Number of products: {{ productCount }}</h6>
        </div>
      </div>
    </div>
    <div class="col mt-3">
      <b-button type="button" class="btn btn-danger btn-sm" @click="openModalDeleteAll">Delete all from the cart</b-button>
    </div>
    <b-modal
        v-model="showConfirmationDeleteAllFromCart"
        title="Delete all products from the cart"
        centered
        ok-variant="danger"
        ok-title="Yes, proceed"
        @ok="deleteAll"
        cancel-variant="primary"
        cancel-title="No,cancel">

      <p>Do you want to delete all the products from the cart ? This action is permanent.</p>
    </b-modal>

    <b-modal
        v-model="showConfirmationRemoveProductFromCart"
        title="Remove this product from the cart"
        centered
        ok-variant="danger"
        ok-title="Yes, proceed"
        @ok="deleteProduct"
        cancel-variant="primary"
        cancel-title="No,cancel">

      <p>Do you want to delete this product from the cart ? This action is permanent.</p>
    </b-modal>
  </div>
</template>

<style scoped>
</style>
