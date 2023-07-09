import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import { Home, Cart, Products, Product } from "../pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/products",
				element: <Products />,
			},
			{
				path: "/products/:id",
				element: <Product />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
		],
	},
]);

export default router;
