import React from "react";
import "./Checkout.css";

import {useStateValue} from "../../Context/StateProvider";

import CheckOutSubTotal from "./CheckOutSubTotal";
import Product from "../../Components/Product";

const Checkout = () => {
	const [{basket}] = useStateValue();

	return (
		<div className="checkout">
			<div className="checkout__left">
				<img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" className="checkout__ad" />
				<h3 className="checkout__title">Your Shopping Basket</h3>
				<div className="checkout__items">
					{basket.map((item, index) => {
						return (
							<Product
								key={index}
								id={item.id}
								img={item.img}
								price={item.price}
								qty={item.qty}
								rating={item.rating}
								title={item.title}
								compType="checkout"
							/>
						);
					})}
				</div>
				{basket.length == 0 && <h3 className="checkout__error">No prodcts in basket.</h3>}
			</div>
			<div className="checkout__right">
				<CheckOutSubTotal />
			</div>
		</div>
	);
};

export default Checkout;
