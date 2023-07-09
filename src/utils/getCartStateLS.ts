import { ICartItem } from "../types/cartSliceTypes";

export const getCartFromLS = () => {
	const totalItems = localStorage.getItem("cartItem");
	const count = localStorage.getItem("cartTotalCount");
	const price = localStorage.getItem("cartTotalPrice");
	if (totalItems) {
		const items = JSON.parse(totalItems);
		const totalCount = Number(count);
		const totalPrice = Number(price);
		return { items, totalCount, totalPrice };
	}
	return { items: [], totalCount: 0, totalPrice: 0 };
};

export const saveCartToLS = (
	items: ICartItem[],
	totalCount: number,
	totalPrice: number
) => {
	localStorage.setItem("cartItem", JSON.stringify(items));
	localStorage.setItem("cartTotalCount", totalCount.toString());
	localStorage.setItem("cartTotalPrice", totalPrice.toString());
};
