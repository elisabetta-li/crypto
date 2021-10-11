<template>
  <nav-bar/>
  <div class="container">
    <router-view v-bind:currencies="currencies"></router-view>
  </div>
  
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
   NavBar
  },
  data() {
    return {
       currencies: [
                {id: '1', value: 'btc', name: 'bitcoin', count: 1, img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=014', sum: 0},
                {id: '2', value: 'eth', name: 'ethereum',count: 7, img: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png', sum: 0},
                {id: '3', value: 'usd', name: 'usd-coin', count: 10000, img: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', sum: 0}
            ],
    }
  }
}
</script>

<style>
*, html, body {
    margin: 0;
    padding: 0;
    border: 0;
}
.container {
    width: 80%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 130px auto 0 auto;
    padding: 24px;
}
@media(max-width: 820px) {
  .container {
    width: auto;
}
}
@media(max-width: 820px) {
  .container {
    padding: 24px 10px;
}
}
</style>
 