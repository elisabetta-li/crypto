<template>
    <converter-block @getCurrencyName="getNameCurrency" @changeCurrencySecond="changeSecondCurrency" v-bind:currencies="currencies"/>
    <button class="btn-graph" @click="displayGraph">График</button>
    <crypto-graph v-if="isCh" v-bind:cur_full="cur_full" v-bind:date_full="date_full"></crypto-graph>
</template>


<script>
import ConverterBlock from "../components/ConverterBlocks.vue";
import CryptoGraph from "../components/CryptoGraph.vue";

export default {
    components: {
        ConverterBlock, CryptoGraph
    },
    props: {
        currencies: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            lastDate: [],
            date_full:[],
            cur_full: [],
            currency_first:'btc',
            currency_second:'usd',
            currency_name:'bitcoin',
            isCh:false
            
        }
    },
    methods: {
        getNameCurrency(currency_name) {
            this.currency_name = currency_name;
            this.getDateGraph();
        },
        changeSecondCurrency(currency_second) {
            this.currency_second = currency_second;
            this.getDateGraph();
        },
        displayGraph() {
            this.isCh = !this.isCh;
        },
      getData() {
            var currentData = new Date();
            var d = new Date (currentData.setDate(currentData.getDate())).getDate();
            var m = new Date (currentData.setDate(currentData.getDate())).getMonth() +1;
            var y = new Date (currentData.setDate(currentData.getDate())).getFullYear();
            var s = d + '-' + m + '-'+ y;

            var today= {
            day: d,
            mounth: m,
            year: y,
            date: s}
        this.lastDate.push(today);
             for(let i=0; i<13; i++) {
                   d = new Date (currentData.setDate(currentData.getDate()-1)).getDate();
                   m = new Date (currentData.setDate(currentData.getDate())).getMonth() +1;
                   y = new Date (currentData.setDate(currentData.getDate())).getFullYear();
                   s = d + '-' + m + '-'+y;
                 var newData = {
                 day: d,
                 mounth: m,
                 year: y,
                 date: s}
             this.lastDate.push(newData);
             }
    },
    createDateFull() {
      for(let i=0; i<this.lastDate.length; i++) {
         this.date_full.push(String(this.lastDate[i].date))
      }
    },
    async getDateGraph() {
        this.isCh = false;
      for(let i=0; i<this.date_full.length; i++) {
        const api_value = await fetch('https://api.coingecko.com/api/v3/coins/'+this.currency_name+'/history?date='+ this.date_full[i]);
        const json_value = await api_value.json();
        console.log(this.currency_second)
        const val = json_value.market_data.current_price[this.currency_second];
        const value = parseFloat((val).toFixed(3));
        this.cur_full[i] = value;
      }
    },
    },
    created() {
    this.getData();
    this.createDateFull();
    this.getDateGraph();
    }
}
</script>


<style>
.btn-graph {
    width: auto;
    height: auto;
    padding: 10px;
    margin-bottom: 20px;
}
</style>