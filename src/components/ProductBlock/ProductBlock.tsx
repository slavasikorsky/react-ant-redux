import { Button, Card, Image, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { ICartItem } from "../../types/cartSliceTypes";
import { addItemToCart } from "../../store/cartSlice/cartSlice";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

type ProductBlockProps = {
	id: string;
	title: string;
	price: number;
	image: string;
};

export type TypeItem = {
	id: number;
	name: string;
};

const { Text } = Typography;

const ProductBlock = ({ id, image, title, price }: ProductBlockProps) => {
	const dispatch = useDispatch();
	const cartItem = useAppSelector((state) =>
		state.cart.items.find((item: ICartItem) => item.id === id)
	);

	const addToCart = () => {
		dispatch(
			addItemToCart({
				id,
				title,
				image,
				price,
				count: 1,
			})
		);
	};

	const count = cartItem ? cartItem.count : 0;

	return (
		<Card bordered={false}>
			<Link to={`${id}`}>
				<Card.Meta
					style={{ paddingBottom: "20px" }}
					title={<Text strong>{title}</Text>}
				/>
			</Link>
			<Image src={image} alt={title} height={200} />
			<Text strong style={{ display: "block", marginTop: "20px" }}>
				${price}
			</Text>
			<Button
				style={{ marginTop: "20px", width: "150px" }}
				type="primary"
				onClick={addToCart}
				icon={<ShoppingCartOutlined />}
			>
				{count > 0 && <i style={{ marginLeft: "10px" }}>{count}</i>}
				<span style={{ marginLeft: "10px" }}>Add to cart</span>
			</Button>
		</Card>
	);
};

export default ProductBlock;
