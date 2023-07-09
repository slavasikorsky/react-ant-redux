import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProducts } from "../store/productSlice/productSlice";
import { EProductSliceStatus, IProductBlock } from "../types/productSliceTypes";
import { Col, Row, Spin } from "antd";
import ProductBlock from "../components/ProductBlock/ProductBlock";
import { setCategory } from "../store/filterSlice/filterSlice";
import FilterBlock from "../components/FilterBlock/filterBlock";

export const Products = () => {
	const { productList, status } = useAppSelector((state) => state.products);
	const { category, searchValue } = useAppSelector((state) => state.filter);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			fetchProducts({
				category,
				searchValue,
			})
		);
	}, [category, searchValue, dispatch]);

	if (status === EProductSliceStatus.Error) {
		return <>{status}</>;
	}

	const filterProducts = (value: string) => {
		dispatch(setCategory(value));
	};

	return (
		<>
			<FilterBlock changeHandler={filterProducts} />
			{status === EProductSliceStatus.Loading && <Spin size="large" />}
			<Row gutter={[16, 16]}>
				{productList.map((productItem: IProductBlock) => (
					<Col span={6} key={productItem.id}>
						<ProductBlock {...productItem} />
					</Col>
				))}
			</Row>
		</>
	);
};
