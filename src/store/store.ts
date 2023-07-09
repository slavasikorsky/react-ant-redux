import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice/counterSlice";
import productSlice from "./productSlice/productSlice";
import cartSlice from "./cartSlice/cartSlice";
import filterSlice from "./filterSlice/filterSlice";
import productItemSlice from "./productItemSlice/productItemSlice";
import categoriesSlice from "./categoriesSlice/categoriesSlice";

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		products: productSlice,
		categories: categoriesSlice,
		cart: cartSlice,
		filter: filterSlice,
		productItem: productItemSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
