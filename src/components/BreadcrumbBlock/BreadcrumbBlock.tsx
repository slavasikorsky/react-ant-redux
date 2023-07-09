import { Typography } from "antd";
import Item from "antd/es/list/Item";
import { Link, useLocation } from "react-router-dom";

function BreadcrumbBlock() {
	const { Text } = Typography;
	const location = useLocation();
	const pathname = location.pathname;
	const paths = pathname.split("/").filter((item) => item);
	return (
		<ul
			style={{
				margin: "16px 0",
				display: "flex",
				listStyle: "none",
				paddingLeft: "0",
			}}
		>
			<Item>
				<Link to="/">Home</Link>
			</Item>
			{paths.map((path, index) => (
				<Item key={index}>
					<Text style={{ padding: "0 10px" }}> / </Text>
					<Link to={path} style={{ textTransform: "capitalize" }}>
						{path}
					</Link>
				</Item>
			))}
		</ul>
	);
}

export default BreadcrumbBlock;
