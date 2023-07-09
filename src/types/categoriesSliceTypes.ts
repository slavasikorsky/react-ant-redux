export interface ICategorySlice {
	categoryList: string[];
	status: ECategorySliceStatus;
}

export enum ECategorySliceStatus {
	Loading = "loading",
	Success = "success",
	Error = "error",
}
