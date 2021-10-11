import { createRouter, createWebHashHistory } from "vue-router"
import ConvertPage from "../pages/ConvertPage.vue"
import CabPage from "../pages/CabPage.vue"

const routes = [
    {path: '/', component: ConvertPage},
    {path: '/cab', component: CabPage}
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;