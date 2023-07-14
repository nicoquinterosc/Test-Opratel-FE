import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    firstName: null,
    lastName: null
}
const store = new Vuex.Store({
    state,
    getters: {
        firstName: (state) => {
            return state.firstName;
        },
        lastName: (state) => {
            return state.lastName;
        }
    },
    actions: {
        firstName(context, firstName){
            context.commit('firstName', firstName);
        },
        lastName(context, lastName){
            context.commit('lastName', lastName);
        }
    },
    mutations: {
        firstName(state, firstName) {
            state.firstName = firstName;
        },
        lastName(state, lastName) {
            state.lastName = lastName;
        }
    }
})

export default store;