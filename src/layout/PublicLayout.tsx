import React from "react";
import { ConfigProvider, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import { HeaderBlock } from "../components/HeaderBlock";
import { FooterBlock } from "../components/FooterBlock";
import BreadcrumbBlock from "../components/BreadcrumbBlock/BreadcrumbBlock";

const { Content } = Layout;

const { useToken } = theme;

const PublicLayout: React.FC = () => {
	const { token } = useToken();
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#00b96b",
					colorText: "#000000",
					colorTextBase: "#000000",
				},
			}}
		>
			<Layout>
				<HeaderBlock />
				<Content
					style={{
						padding: "0 50px",
						width: "1280px",
						margin: "0 auto",
					}}
				>
					<BreadcrumbBlock />
					<div
						style={{
							padding: 24,
							minHeight: 380,
							background: token.colorBgBase,
						}}
					>
						<Outlet />
					</div>
				</Content>
				<FooterBlock />
			</Layout>
		</ConfigProvider>
	);
};

export default PublicLayout;
