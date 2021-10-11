<template>
    <div class="header">
        <div class="header-nav">
            <router-link  to="/" @click="changeLinkConv" :class="{'active-link': isConverter}">Converter</router-link>
            <router-link to="/cab" @click="changeLinkCab" :class="{'active-link': isCab}">Cab</router-link>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            isCab: false,
            isConverter: true,
        }
    },
    methods: {
        changeLinkConv() {
            this.isCab = false;
            this.isConverter = true;
        },
        changeLinkCab() {
            this.isCab = true;
            this.isConverter = false;
        }
    }
}
</script>
<style>
.header {
    width: 100%;
    height: 80px;
    overflow: hidden;
    display: flex;
    justify-content: end;
    position: fixed;
    background: #27262e;
    color: #e3c9a6;
    box-shadow: 0 0 24px 0 rgba(0,0,0,.5);
    margin-bottom: 50px;
}
.header-nav {
    width: 200px;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 55px;
}
a {
    font-size: 20px;
    color: #fff;
    text-decoration: none;
}
.active-link {
    background: #27262e;
    color: #e3c9a6;
}
a:hover {
    color: #e3c9a6;
}
</style>