<template>
    <div class="converter">
        <div class="converter-first-block">
            <p class="converter-text">Отдаю</p>
            <div class="select-first">
                <button class="select-btn" v-for="cur in currencies" :key="cur.id" :value="cur.value" v-on:click="getCurrencyFirst($event)" :class="{'active': cur.value === currency_first}">
                    {{cur.value}}
                </button>
            </div>     
            <input 
            v-bind:value="input_first"               
            v-on:input="inputValue"
            type="number">
            <p  class="currency-first_value"> 1 {{currency_first}} = {{curr_price}} {{currency_second}}</p>
        </div>
        <div class="converter-second-block">
            <p class="converter-text">Получаю</p>
            <div class="select-second">
                <button class="select-btn" v-for="cur in currencies" :key="cur.id" :value="cur.value" v-on:click="getCurrencySecond($event)" :class="{'active': cur.value === currency_second}">
                    {{cur.value}}
                </button>
            </div> 
            <input disabled 
             v-bind:value="input_second"               
             type="number">
            <p class="currency-second_value"> 1 {{currency_second}} = {{this.curr_price_second}} {{currency_first}}</p>
        </div>
    </div>    
</template>


<script>

export default {
    props: {
        currencies: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            input_first:'',
            input_second:'',
            currency_first: 'btc',
            currency_second:'usd',
            curr_price:'',
            currency_name: 'bitcoin',
            curr_price_second: '',
            currencies_new: this.currencies
        }
    },
    methods: {
        inputValue(event) {
            var input_value = event.target.value; 
            if (input_value >= 0) {
                this.input_first = event.target.value;;
            }
            this.checkValue();
        },
        currencyName() {
            var currency_get_name = this.currencies .forEach(c => {
                if(c.value === this.currency_first) {
                    this.currency_name = c.name
                }
            });
            this.$emit('getCurrencyName', this.currency_name);
        },
        getCurrencyFirst(event) {
            this.currency_first = event.target.value;
            this.changeCoin();  
        },
        getCurrencySecond(event) {
            this.currency_second = event.target.value;
            this.$emit('changeCurrencySecond',this.currency_second)
            this.changeCoin();
        },

        async changeCoin() {
            this.currencyName();
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + this.currency_name + '&vs_currencies=' + this.currency_second);
            const data = await res.json();
            this.curr_price = data[this.currency_name][this.currency_second];
            this.curr_price_second = parseFloat((1/this.curr_price).toFixed(7));
            this.checkValue();
        },
        checkValue() {
            var input_value = this.input_first * this.curr_price;
            if (input_value > 0) {
                 this.input_second = input_value;
            }
            else {
                this.input_second = '';
            }
        }
    },
    created() {
        this.changeCoin();
    } 
}
</script>
<style>
.converter {
    width: 620px;
    height: 222px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #27262e;
    box-shadow: 0 0 24px 0 rgba(0,0,0,.5);
    padding: 15px;
    margin-bottom: 50px;
}
.converter-first-block, 
.converter-second-block {
    width: 50%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    text-align: start;
}
.converter-text {
    font-family: inherit;
    font-size: 17px;
    color: #fff;
    margin-bottom: 30px;
}
.select-first, 
.select-second {
    width: 154px;
    display: flex;
    justify-content: center;
    box-shadow: 0 0 24px 0 rgba(0,0,0,.5);
    margin-bottom: 30px;
}
button {
    height: 40px;
    width: 33.3%;
    background: #27262e;
    color: hsl(34, 52%, 77%);
    font-size: 17px;
    text-transform: uppercase;
    border: 2px #e3c9a6 solid;
    border-right: none;
    
    cursor: pointer;
}
button:last-child {
    border-right: 2px #e3c9a6 solid;
}
.active {
    background: rgb(227, 200, 166);
    color: #27262e;
}
select:active, 
select:focus{
  outline:none
}
option {
    background: #27262e;
}
input {
    height: 37px;
    width: 140px;
    background: #27262e;
    color: #e3c9a6;
    box-shadow: 0 0 24px 0 rgba(0,0,0,.5);
    border: 2px #e3c9a6 solid;
    font-family: inherit;
    font-size: 27px;
    appearance: none;
    -moz-appearance: none;
    padding: 0 5px;
    margin-bottom: 30px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input:focus, 
input:hover {
    outline: 0;
    box-shadow: 0 0 5px #e3c9a6;
    appearance: none;
    -moz-appearance: none;
  }

.currency-first_value,
.currency-second_value {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 500;
}
@media(max-width: 702px) {
  .converter {
    width: 94%;
}
}
@media(max-width: 420px) {
    input {
        width: 100px;
    }
    .select-first, 
    .select-second {
        width: 114px;
        font-size: 10px;
    }
    button {
        font-size: 14px;
    }
    .currency-first_value,
    .currency-second_value {
        font-size: 10px;
}
}
</style>