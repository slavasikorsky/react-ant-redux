import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addItemToCart } from "../store/cartSlice/cartSlice";
import { useEffect } from "react";
import { fetchProduct } from "../store/productItemSlice/productItemSlice";
import { EProductSliceStatus } from "../types/productSliceTypes";
import { Button, Image, Spin, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

export const Product = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { product, status } = useAppSelector((state) => state.productItem);

	const { Title, Text } = Typography;

	const addToCart = () => {
		dispatch(
			addItemToCart({
				id: product.id,
				title: product.title,
				image: product.image,
				price: product.price,
				count: 1,
			})
		);
	};

	useEffect(() => {
		id && dispatch(fetchProduct({ id }));
	}, [id, dispatch]);

	if (status === EProductSliceStatus.Error) {
		navigate("/");
	}

	if (status === EProductSliceStatus.Loading) {
		return <Spin size="large" />;
	}

	return (
		<>
			<Title level={2}>{product.title}</Title>
			<Image alt={product.title} src={product.image} preview={false} />
			<Text
				strong
				style={{ display: "block", margin: "20px 0", fontSize: "20px" }}
			>
				${product.price}
			</Text>
			<Text style={{ display: "block", margin: "20px 0" }}>
				{product.description}
			</Text>
			<Button
				onClick={addToCart}
				type="primary"
				icon={<ShoppingCartOutlined />}
				style={{ fontSize: "20px", height: "auto" }}
			>
				Add to cart
			</Button>
		</>
	);
};
