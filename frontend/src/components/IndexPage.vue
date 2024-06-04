<template>
  <div>
    <BannerComponent />
    <div class="row">
      <div class="col-md-9">
        <ProductList v-if="list_products" :products="list_products" @add-to-cart="add_to_cart" />
      </div>
      <div class="col-6 col-md-3">
        <CartComponent v-if="cart"
                       :cart="cart"
                       :totalPrice="total_price"
                       :productCount="nbr_product"
                       @remove-from-cart="remove_from_cart"
                       @remove-all-from-cart="remove_all_from_cart"
                       @clear-cart="clear_cart"
        />
      </div>
    </div>
    <b-modal
        v-model="showNotEnoughStockModal"
        centered
        title="Insufficient quantity"
        ok-only>
      <p>Not enough stock available for this product.</p>
    </b-modal>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import CartComponent from "@/components/CartComponent.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import {BASE_URL} from "@/ApiConfig";

export default {
  components: {
    BannerComponent,
    ProductList,
    CartComponent
  },
  data() {
    return {
      cart: null,
      list_products: null,
      total_price: 0,
      nbr_product: 0,
      showNotEnoughStockModal: false
    };
  },
  async created() {
    await this.fetchProducts();
    await this.fetchCart();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        this.list_products = await response.json();
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchCart() {
      try {
        const response = await fetch(`${BASE_URL}/cart`);
        this.cart = await response.json() || {products: []};
        this.update_cart();
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    },
    async add_to_cart(productId, quantityToBuy) {
      const quantity = parseInt(quantityToBuy);
      const product = this.list_products.find(p => p._id === productId);
      if (product && product.stock - (this.cart.products.find(p => p.productId._id === productId)?.quantity || 0) >= quantity) {
        try {
          await fetch(`${BASE_URL}/cart`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({productId, quantity})
          });
          const existingProductIndex = this.cart.products.findIndex(p => p.productId._id === productId);
          if (existingProductIndex !== -1) {
            this.cart.products[existingProductIndex].quantity += quantity;
          } else {
            const response = await fetch(`${BASE_URL}/products/${productId}`);
            const product = await response.json();
            this.cart.products.push({ productId: product, quantity: quantity });
          }
          this.update_cart();
          this.showNotEnoughStockModal = false;
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      } else {
        this.showNotEnoughStockModal = true;
      }
    },
    async remove_from_cart(productId) {
      try {
        await fetch(`${BASE_URL}/cart/removeOne/${productId}`, {
          method: 'DELETE',
        });
        const productIndex = this.cart.products.findIndex(p => p.productId._id.toString() === productId);
        if (productIndex !== -1) {
          if (this.cart.products[productIndex].quantity > 1) {
            this.cart.products[productIndex].quantity -= 1;
          } else {
            this.cart.products.splice(productIndex, 1);
          }

          this.update_cart();
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    },
    async remove_all_from_cart(productId) {
      try {
        await fetch(`${BASE_URL}/cart/removeAll/${productId}`, {
          method: 'DELETE',
        });
        this.cart.products = this.cart.products.filter(p => p.productId._id !== productId);
        this.update_cart();
      } catch (error) {
        console.error('Error removing all from cart:', error);
      }
    },
    async clear_cart() {
      try {
        await fetch(`${BASE_URL}/cart`, {
          method: 'DELETE'
        });
        this.cart.products = [];
        this.update_cart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    },
    update_cart() {
      this.total_price = this.cart.products.reduce((total, product) => {
        const prod = this.list_products.find(p => p._id === product.productId._id);
        return total + (prod ? prod.price * product.quantity : 0);
      }, 0);
      this.nbr_product = this.cart.products.length;
    }
  }
};
</script>

<style scoped>

</style>
