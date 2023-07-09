import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../store/counterSlice/";
import { Button } from "antd";
import { RootState } from "../../store/store";

export const Counter = () => {
	const count = useSelector((state: RootState) => state.counter.value);
	const dispatch = useDispatch();
	return (
		<>
			<p>{count}</p>
			<Button onClick={() => dispatch(increment())}>+</Button>
			<Button onClick={() => dispatch(decrement())}>-</Button>
		</>
	);
};
