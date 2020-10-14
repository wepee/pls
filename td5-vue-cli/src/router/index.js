import Router from "vue-router";
import Home from "@/components/Home";
import Hello from "@/components/Hello";
import World from "@/components/World";
import Vue from 'vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/world',
            name: 'world',
            component: World
        },
    ]
})