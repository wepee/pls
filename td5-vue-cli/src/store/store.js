import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        msg: ''
    },
    mutations:{
        change(state, msg){
            state.msg = msg
        }
    },
    getters:{
        msg: state => state.msg
    }
})