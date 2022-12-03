import {useState} from "react";
import "./CheckOutSubTotal.css";
import CurrencyFormat from "react-currency-format";

import {useNavigate} from "react-router-dom";

import {getBasketTotal, getBasketLength} from "../../Context/Reducer";
import {useStateValue} from "../../Context/StateProvider";

const CheckOutSubTotal = () => {
	const navigate = useNavigate();
	const [errMsg, showErrMsg] = useState(false);
	const [{basket, user}] = useStateValue();

	return (
		<div className="checkoutsubtotal">
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p data-testid="subtotal">
							Subtotal ({getBasketLength(basket)} items): <strong>{value}</strong>
						</p>
						<small className="checkoutsubtotal__gift">
							<input type="checkbox" /> This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"$"}
			/>
			<button
				disabled={basket.length == 0 && true}
				className={basket.length == 0 ? "app__button-disable" : undefined}
				onClick={() => {
					!user ? showErrMsg(true) : navigate("/payment");
				}}>
				Procced to Checkout
			</button>
			{errMsg && <span className="checkoutsubtotal__errmsg">You must log in to continue</span>}
		</div>
	);
};

export default CheckOutSubTotal;
