export interface IProductBlock {
	id: string;
	title: string;
	price: number;
	description: string;
	image: string;
}

export interface IProductsSlice {
	productList: IProductBlock[];
	status: EProductSliceStatus;
}

export enum EProductSliceStatus {
	Loading = "loading",
	Success = "success",
	Error = "error",
}

export interface IProductSliceParams {
	category: string;
	searchValue: string;
}
