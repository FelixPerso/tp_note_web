<script setup>

</script>

<template>
  <div>
    <ul>
      <li v-for="product in stock.get_list_product()" :key="product.id">
        {{ product.name }} - {{ product.price }}€
        <button @click="addToCart(product.id)">Ajouter au Panier</button>
      </li>
    </ul>
    <h2>Panier</h2>
    <ul>
      <li v-for="(quantity, id) in cart.get_list_cart()" :key="id">
        {{ stock.get_prod_by_id(id).name }} - Quantité: {{ quantity }}
        <button @click="removeFromCart(id)">Retirer</button>
      </li>
    </ul>
    <p>Total des produits: {{ cart.get_nbr_product() }}</p>
    <p>Prix total: {{ cart.get_total_price(stock) }}€</p>
  </div>
</template>

<style scoped>
.title {
  color: blue;
  background-color: black;
  background-size: 10px;
}

</style>