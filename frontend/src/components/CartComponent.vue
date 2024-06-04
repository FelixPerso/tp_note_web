<script>
import { BASE_URL } from "@/ApiConfig";

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
    }
  },
  watch: {
    cart: {
      handler: 'loadProductsInCart',
      deep: true
    }
  },
  data() {
    return {
      productsInCart: [],
      showConfirmationDeleteAllFromCart: false,
      showConfirmationRemoveProductFromCart: false,
      productIdToDelete: null
    };
  },
  async created() {
    await this.loadProductsInCart();
  },
  methods: {
    async loadProductsInCart() {
      try {
        const products = [];
        for (const cartItem of this.cart.products) {
          const response = await fetch(`${BASE_URL}/products/${cartItem.productId._id}`);

          if (response.ok) {
            const product = await response.json();
            products.push({ product, quantity: cartItem.quantity });
          }
        }

        this.productsInCart = products;

      } catch (error) {
        console.error('Error loading products in cart:', error);
      }
    },
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
      <div class="col" v-for="productInCart in productsInCart" :key="productInCart.productId">
        <div class="p-3 border bg-light">
          <h5>{{ productInCart.product.name }}</h5>
          <p>Quantity: {{ productInCart.quantity }}</p>
          <b-button type="button" size="sm" variant="primary" @click="$emit('remove-from-cart', productInCart.product._id)">Remove 1</b-button>
          <b-button type="button" size="sm" variant="danger" @click="openModalRemoveProduct(productInCart.product._id)">Remove this product</b-button>
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
      <b-button type="button" size="sm" variant="danger" @click="openModalDeleteAll">Delete all from the cart</b-button>
    </div>
    <b-modal
        v-model="showConfirmationDeleteAllFromCart"
        title="Delete all products from the cart"
        centered
        ok-variant="danger"
        ok-title="Yes, proceed"
        @ok="deleteAll"
        cancel-variant="primary"
        cancel-title="No, cancel">
      <p>Do you want to delete all the products from the cart? This action is permanent.</p>
    </b-modal>

    <b-modal
        v-model="showConfirmationRemoveProductFromCart"
        title="Remove this product from the cart"
        centered
        ok-variant="danger"
        ok-title="Yes, proceed"
        @ok="deleteProduct"
        cancel-variant="primary"
        cancel-title="No, cancel">
      <p>Do you want to delete this product from the cart? This action is permanent.</p>
    </b-modal>
  </div>
</template>

<style scoped>
</style>
