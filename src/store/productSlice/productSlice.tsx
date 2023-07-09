import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import {
	EProductSliceStatus,
	IProductsSlice,
	IProductBlock,
	IProductSliceParams,
} from "../../types/productSliceTypes";

const initialState: IProductsSlice = {
	productList: [],
	status: EProductSliceStatus.Loading,
};

export const fetchProducts = createAsyncThunk<
	IProductBlock[],
	IProductSliceParams
>("products/fetchProduct", async (params) => {
	// added filter by category
	const { category } = params;
	const { searchValue } = params;
	const response = await axios.get<IProductBlock[]>(
		`https://fakestoreapi.com/products/
		${category.length > 0 ? `category/${category}` : ""}`
	);
	//added search by product title
	if (searchValue) {
		const filteredProducts = response.data.filter((item) =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		);
		return filteredProducts;
	}
	return response.data;
});

export const productSlice = createSlice({
	name: "productSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.productList = [];
			state.status = EProductSliceStatus.Loading;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.productList = action.payload;
			state.status = EProductSliceStatus.Success;
		});
		builder.addCase(fetchProducts.rejected, (state) => {
			state.productList = [];
			state.status = EProductSliceStatus.Error;
		});
	},
});

export default productSlice.reducer;
