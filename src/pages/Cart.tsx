import { Button, Card, Col, Empty, Image, Row, Space, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
	addItemToCart,
	clearCartItems,
	minusCartItem,
} from "../store/cartSlice/cartSlice";
import { ICartItem } from "../types/cartSliceTypes";
import { Link } from "react-router-dom";
import ButtonGroup from "antd/es/button/button-group";

const { Text, Title } = Typography;

export const Cart = () => {
	const { items, totalCount, totalPrice } = useAppSelector(
		(state) => state.cart
	);

	const dispatch = useAppDispatch();

	const onHandleClear = () => {
		dispatch(clearCartItems());
	};

	const minusItem = (id: string) => {
		dispatch(minusCartItem(id));
	};

	const plusItem = (item: ICartItem) => {
		dispatch(addItemToCart(item));
	};

	if (!items.length) {
		return (
			<Empty
				description={
					<>
						<Title level={2}>Cart is empty</Title>
						<Link to="/">Go to home page</Link>
					</>
				}
			/>
		);
	}

	return (
		<Space direction="vertical" size="large" style={{ width: "100%" }}>
			<Row justify="space-between" align="middle">
				<Title level={2}> Shopping cart</Title>
				<Button danger onClick={onHandleClear}>
					Clear cart
				</Button>
			</Row>
			{items.map((item: ICartItem) => (
				<Card key={item.id}>
					<Row justify="space-between" align="middle">
						<Col
							style={{
								display: "flex",
							}}
						>
							<Image
								src={item.image}
								style={{ width: "60px", marginRight: "20px" }}
								preview={false}
							/>
							<Link to={`/products/${item.id}`}>
								<Title level={3} style={{ margin: "0" }}>
									{item.title.length > 50
										? `${item.title.slice(0, 50)}...`
										: item.title}
								</Title>
								<Title level={5}>Price: ${item.price}</Title>
							</Link>
						</Col>
						<Col style={{ marginLeft: "10px" }}>
							<ButtonGroup>
								<Button onClick={() => minusItem(item.id)}>
									-
								</Button>
								<Text
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										width: "40px",
									}}
								>
									{item.count}
								</Text>
								<Button onClick={() => plusItem(item)}>
									+
								</Button>
							</ButtonGroup>
							<Title level={4}>
								${(item.price * item.count).toFixed(2)}
							</Title>
						</Col>
					</Row>
				</Card>
			))}
			<Card
				style={{
					float: "right",
					textAlign: "right",
					backgroundColor: "#dadada",
					width: "40%",
				}}
			>
				<Title level={2}>Items: {totalCount}</Title>
				<Title level={2}>Total: ${totalPrice.toFixed(2)}</Title>
			</Card>
		</Space>
	);
};
