import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IFilterSlice } from "../../types/filterSliceTypes";

const initialState: IFilterSlice = {
	category: "",
	searchValue: "",
};

export const filterSlice = createSlice({
	name: "filterSlice",
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload;
		},

		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
	},
});

export default filterSlice.reducer;
export const { setCategory, setSearchValue } = filterSlice.actions;
