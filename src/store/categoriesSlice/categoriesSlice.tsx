import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import {
	ECategorySliceStatus,
	ICategorySlice,
} from "../../types/categoriesSliceTypes";

const initialState: ICategorySlice = {
	categoryList: [],
	status: ECategorySliceStatus.Loading,
};

export const fetchCategories = createAsyncThunk<string[]>(
	"products/fetchCategories",
	async () => {
		const response = await axios.get<string[]>(
			`https://fakestoreapi.com/products/categories`
		);
		return response.data;
	}
);

export const categoriesSlice = createSlice({
	name: "categoriesSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.pending, (state) => {
			state.categoryList = [];
			state.status = ECategorySliceStatus.Loading;
		});
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.categoryList = action.payload;
			state.status = ECategorySliceStatus.Success;
		});
		builder.addCase(fetchCategories.rejected, (state) => {
			state.categoryList = [];
			state.status = ECategorySliceStatus.Error;
		});
	},
});

export default categoriesSlice.reducer;
