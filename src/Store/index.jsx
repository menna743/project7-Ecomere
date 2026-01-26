import { create } from "zustand";

export const domain = "https://store.skyready.online";

export const Counter = create ((set)=>({
    value:100,
    setCounter200 : () => (set (()=>({ value : 200 }))),
    setCounter : (val) => (set (()=>({ value : val }))),
    increment : () =>(set((state)=>({value : state.value + 1}))),
    decrement : () =>(set((state)=>({value : state.value - 1}))),

}));
