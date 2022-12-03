import {useState} from "react";
import "./HomeProduct.css";

import {useStateValue} from "../../Context/StateProvider";
import {checkQty} from "../../Context/Reducer";

const Product = ({id, title, price, rating, img, handleShowMssg}) => {
	const [{basket, showMssg}, dispatch] = useStateValue();
	const [selectValue, setSelectValue] = useState(1);

	const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id: id,
				title: title,
				price: price,
				qty: selectValue,
				rating: rating,
				img: img,
			},
		});
	};

	const isValidQty = () => {
		checkQty(basket, id) && handleShowMssg();
	};

	return (
		<div className="Homeproduct">
			<div className="Homeproduct__info">
				<p>{title}</p>
				<div className="Homeproduct__price">
					<small>$</small>
					<strong>{price}</strong>
				</div>
				<div className="Homeproduct__qty">
					<select data-testid={"productChangeQTY" + id} name="qty" onChange={(e) => setSelectValue(e.target.value)}>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>

				<div className="Homeproduct__rating">
					{Array(rating)
						.fill()
						.map((_, i) => {
							return <p key={i}>⭐</p>;
						})}
				</div>
			</div>
			<img className="Homeproduct__img" src={img} />
			<button
				data-testid={"productAddToCart" + id}
				disabled={showMssg}
				onClick={() => {
					addToBasket();
					isValidQty();
				}}
				className="Homeproduct__add-to-cart">
				Add to Basket
			</button>
		</div>
	);
};

export default Product;
