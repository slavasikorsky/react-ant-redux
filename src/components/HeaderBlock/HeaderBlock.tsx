import { ShoppingCartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";

const { Header } = Layout;
export const HeaderBlock = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { totalCount } = useAppSelector((state) => state.cart);

	const navigation = [
		{
			key: "/",
			label: "Home",
		},
		{
			key: "/products",
			label: "Products",
		},
		{
			key: "/cart",
			label: "Cart",
		},
	];

	const HandleMenuClick = ({ key }: any) => {
		if (key) {
			navigate(key);
		}
	};

	return (
		<>
			<Header
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
				}}
			>
				<Link
					to="/"
					style={{
						color: "#00b96b",
						fontSize: "20px",
						margin: "0 20px 0 0",
					}}
				>
					Logo
				</Link>
				<Menu
					theme="dark"
					mode="horizontal"
					selectedKeys={[location.pathname]}
					items={navigation}
					onClick={HandleMenuClick}
					disabledOverflow
					style={{ width: "100%" }}
				></Menu>
				<Link to="/cart" style={{ display: "flex", color: "#00b96b" }}>
					<ShoppingCartOutlined
						type="primary"
						style={{
							marginRight: "5px",
							fontSize: "30px",
							color: "#00b96b",
						}}
					/>
					{totalCount}
				</Link>
			</Header>
		</>
	);
};
