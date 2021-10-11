<template>
    <div class="account">
        <div class="total-account">
            <div class="total-account_data">
                <p>Счет в USD</p>
                <p class="account-sum"> {{totat_sum}}</p>
                <button class="button-diagram" @click="changeDisplay">Диаграмма</button>
            </div>
            <div class="total-accont_diagram">
               <diagram v-if="isCh" v-bind:crypto="crypto"></diagram>
            </div>
        </div>
        <div class="currencies-items" v-for="cur in currencies_new" :key="cur.id" :value="cur.name">
            <div class="currencies-items_first">
                <div class="crypto-first">
                    <img v-bind:src="cur.img"  alt="">
                    <p class="currency-text">{{cur.value}}</p>
                </div>
                <div class="crypto-second">
                   <p class="currency-name">{{cur.name}}</p>
                   <p class="currency-sum"> {{cur.sum}} $</p> 
                </div>
            </div>
            <div class="currencies-items_second">
                <button :value="cur.value" class="button-plus" @click="increment">+</button>
                <p>{{cur.count}}</p>
                <button :value="cur.value" class="button-plus" @click="decrement">-</button>
            </div>
        </div>
    </div>   
</template>
<script>
import Diagram from "../components/Diagram.vue"

export default {
    components: {
        Diagram
    },
    props: {
        currencies: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            totat_sum: 0,
            crypto_val: [],
            crypto: [],
            currencies_new: this.currencies,
            isCh:false
        }
    },
    methods: {
        increment(event) {
            this.isCh = false;
            var val = event.target.value;
            for(let i = 0; i < this.currencies_new.length; i ++) {
                if(this.currencies_new[i].value === val) {
                    this.currencies_new[i].count++;
                    this.currencyData();
                }
            }   
        },
        decrement(event){
            this.isCh = false;
            var val = event.target.value;
            for(let i = 0; i < this.currencies_new.length; i ++) {
                if(this.currencies_new[i].value === val) {
                    this.currencies_new[i].count--;
                    if(this.currencies_new[i].count < 0) {
                        this.currencies_new[i].count = 0;
                    }
                    this.currencyData();
                }
            }
        },
        currencyData() {
            this.totat_sum = 0;
            for(let i = 0; i < this.currencies_new.length; i ++) {
                this.currencies_new[i].sum = parseFloat((this.currencies_new[i].count * this.crypto_val[i]).toFixed(2)); 
                this.crypto[i] = this.currencies_new[i].sum;
                this.totat_sum += parseFloat((this.currencies_new[i].sum).toFixed(2));
            }
        },
        changeDisplay() {
            this.isCh = !this.isCh;
        },
        async getCurrency(){
            for(let i = 0; i < this.currencies_new.length; i ++) {
            var value = this.currencies_new[i].name;
            var res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + value + '&vs_currencies=usd');
            const data = await res.json();
            var val = data[value].usd;
            this.crypto_val[i] = val;  
            }
            this.currencyData();                
        }
    },
    created() {
        this.getCurrency();
    }
}
</script>
<style>
    .account {
        width: 90%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding: 30px;
    }
    .total-account,
    .currencies-items {
        height: auto;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #27262e;
        box-shadow: 0 0 24px 0 rgba(0,0,0,.5);
        padding: 20px 40px;
        margin-bottom: 40px;
    } 
    .total-accont_diagram {
        display: flex;
        justify-content: center;
    }
    .button-diagram {
        width: auto;
        height: auto;
        font-size: 12px;
        padding: 5px;
    }
    img {
        width: 30px;
        height: 30px;
        margin-right: 7px;
    }
    .crypto-first,
    .crypto-second {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .crypto-first{
        margin-bottom: 15px;
    }
    p {
        font-size: 20px;
        font-weight: 800;
        color: #fff;
    }
    .account-sum {
        font-size: 50px;
        line-height: 1.5;
        font-weight: 800;
        color: #e3c9a6;
        margin-top: 10px;
    }
    .currencies-items_first {
        width: 200px;
        display: flex;
        flex-direction: column;
    }
    .currencies-items_second {
        width: 200px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .button-plus {
        border: 2px #e3c9a6 solid;
    }
    .currency-text {
        text-transform: uppercase;
    }
    .currency-name {
        font-size: 13px;
        font-weight: 400;
        color: #e3c9a6;
        text-transform: capitalize;
        margin-right: 10px;
    }
    .currency-sum {
        font-size: 13px;
        font-weight: 600;
        color: #fff;
    }
@media(max-width: 715px) {
    .total-account {
        flex-direction: column;
        align-items: flex-start;
    }
}
@media(max-width: 690px) {
    .currencies-items_second {
        width: 140px;
    }
}
@media(max-width: 555px) {
    .currencies-items {
        padding: 20px;
    }
    p {
        font-size: 17px;
    }
    img {
        width: 20px;
        height: 20px;
    }
    .currency-name,
    .currency-sum {
        font-size: 10px;
    }
}
@media(max-width: 380px) {
    .currencies-items_second {
        width: 100px;
    }
    .button-plus {
        height: 27px;
    }
    .account-sum {
        font-size: 40px;
    }
}
</style>