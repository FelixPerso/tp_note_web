<template>
  <div>
    <BannerComponent />
    <div class="row">
      <div class="col-md-9">
        <ProductList :products="list_products" @add-to-cart="add_to_cart" />
      </div>

      <div class="col-6 col-md-3">
        <CartComponent
            :cart="list_cart"
            :totalPrice="total_price"
            :productCount="nbr_product"
            :getProductName="get_product_name"
            @remove-from-cart="remove_from_cart"
            @remove-all-from-cart="remove_all_from_cart"
            @clear-cart="clear_cart"
        />
      </div>
    </div>
    <b-modal
        v-model="this.showNotEnoughQuantityModal"
        centered
        title="Insufficient quantity"
        ok-only>
      <p>Not enough stock available for this product.</p>
    </b-modal>
  </div>
</template>

<script>
import { Stock, Cart } from "@/manager.js";
import ProductList from "@/components/ProductList.vue";
import CartComponent from "@/components/CartComponent.vue";
import BannerComponent from "@/components/BannerComponent.vue";

export default {
  components: {
    BannerComponent,
    ProductList,
    CartComponent
  },
  data() {
    return {
      stock: new Stock(),
      cart: new Cart(),
      list_products: [],
      list_cart: {},
      total_price: 0,
      nbr_product: 0,
      showNotEnoughQuantityModal: false
    };
  },
  created() {
    this.list_products = this.stock.get_list_product();
    this.update_cart();
  },
  methods: {
    add_to_cart(productId, quantityToBuy) {
      const quantity = parseInt(quantityToBuy);
      const product = this.stock.get_prod_by_id(productId);
      if (product && product.stock - (this.list_cart[productId] || 0) >= quantity) {
        this.cart.addInCart(productId, quantity);
        this.update_cart();
        this.showNotEnoughQuantityModal = false;
      } else {
        this.showNotEnoughQuantityModal = true;
      }
    },
    remove_from_cart(productId) {
      this.cart.removeFromCart(productId);
      this.update_cart();
    },
    remove_all_from_cart(productId) {
      this.cart.removeAllFromCart(productId);
      this.update_cart();
    },
    clear_cart() {
      this.cart.clearCart();
      this.update_cart();
    },
    update_cart() {
      this.list_cart = this.cart.get_list_cart();
      this.total_price = this.cart.get_total_price(this.stock);
      this.nbr_product = this.cart.get_nbr_product();
    },
    get_product_name(productId) {
      const product = this.stock.get_prod_by_id(productId);
      return product ? product.name : "Unknown Product";
    }
  }
};
</script>

<style scoped>
</style>
