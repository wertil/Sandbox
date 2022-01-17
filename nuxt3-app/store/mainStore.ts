import { defineStore } from 'pinia';

interface StoreState {
  counter: number;
  name: string,
  isAdmin: boolean
}

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference (if you don't use interface)
  state: (): StoreState => {
    return {
      counter: 10,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
  actions:{
    hit(){
      this.counter++;
    }
  },

  getters:{
    getCount:(state)=>state.counter,
    getUser: (state)=> {
      state.name
    }
  }
})
