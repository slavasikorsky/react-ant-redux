import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
	IProductItemSlice,
	IProductItemSliceBlock,
	IProductItemSliceArgs,
} from "../../types/productSliceItem";

import { EProductSliceStatus } from "../../types/productSliceTypes";

const initialState: IProductItemSlice = {
	product: {} as IProductItemSliceBlock,
	status: EProductSliceStatus.Loading,
};

export const fetchProduct = createAsyncThunk<
	IProductItemSliceBlock,
	IProductItemSliceArgs
>("product/fetchProduct", async ({ id }) => {
	const response = await axios.get<IProductItemSliceBlock>(
		`https://fakestoreapi.com/products/${id}`
	);
	return response.data as IProductItemSliceBlock;
});

export const productsItemSlice = createSlice({
	name: "productItemSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProduct.pending, (state) => {
			state.product = {} as IProductItemSliceBlock;
			state.status = EProductSliceStatus.Loading;
		});
		builder.addCase(fetchProduct.fulfilled, (state, action) => {
			state.product = action.payload;
			state.status = EProductSliceStatus.Success;
		});
		builder.addCase(fetchProduct.rejected, (state) => {
			state.product = {} as IProductItemSliceBlock;
			state.status = EProductSliceStatus.Error;
		});
	},
});

export default productsItemSlice.reducer;
