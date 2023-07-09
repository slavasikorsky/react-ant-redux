import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchCategories } from "../../store/categoriesSlice/categoriesSlice";
import { Col, Divider, Input, Row, Select, Spin } from "antd";
import { ECategorySliceStatus } from "../../types/categoriesSliceTypes";
import { setSearchValue } from "../../store/filterSlice/filterSlice";
import { fetchProducts } from "../../store/productSlice/productSlice";

type FilterProps = {
	changeHandler: (value: string) => void;
};

const FilterBlock = ({ changeHandler }: FilterProps) => {
	const { categoryList, status } = useAppSelector(
		(state) => state.categories
	);

	const { category, searchValue } = useAppSelector((state) => state.filter);
	const dispatch = useAppDispatch();

	const searchHandler = (value: string) => {
		dispatch(setSearchValue(value));
		dispatch(
			fetchProducts({
				category,
				searchValue,
			})
		);
	};

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	if (status === ECategorySliceStatus.Error) {
		return <>{status}</>;
	}

	return (
		<>
			{status === ECategorySliceStatus.Loading && <Spin size="large" />}
			<Row
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
				}}
			>
				<Col>
					{categoryList.length > 0 && (
						<Col
							style={{
								display: "flex",
								flexFlow: "column",
							}}
						>
							<label htmlFor="cat">Filter by category:</label>
							<Select
								id="cat"
								defaultValue={category}
								onChange={(value) => changeHandler(value)}
								style={{ width: "200px" }}
							>
								<Select.Option value="">SHOW ALL</Select.Option>
								{categoryList.map((item) => (
									<Select.Option key={item} value={item}>
										{item.toLocaleUpperCase()}
									</Select.Option>
								))}
							</Select>
						</Col>
					)}
				</Col>
				<Col
					style={{
						display: "flex",
						flexFlow: "column",
					}}
				>
					<label htmlFor="search">Search:</label>
					<Input
						id="search"
						type="text"
						placeholder="Write product title...."
						value={searchValue}
						onChange={(e) => searchHandler(e.target.value)}
					/>
				</Col>
			</Row>
			<Divider />
		</>
	);
};

export default FilterBlock;
