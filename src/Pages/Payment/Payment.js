import {useEffect, useRef, useState} from "react";
import "./Payment.css";
import {useNavigate} from "react-router-dom";

import {useStateValue} from "../../Context/StateProvider";
import {getBasketLength, getBasketTotal} from "../../Context/Reducer";

import {db} from "../../Firebase";
import {doc, setDoc} from "firebase/firestore";

import Product from "../../Components/Product";
import SubTotal from "../../Components/SubTotal";
import PaymentInputs from "./PaymentInputs";

const Payment = () => {
	const navigate = useNavigate();
	const [errMssg, setErrMssg] = useState("");
	const [{basket, user}, dispatch] = useStateValue();
	const inputsRef = useRef(null);
	var today = new Date();

	useEffect(() => {
		basket.length == 0 && navigate("/");
	}, [basket]);

	const handlePayment = () => {
		if (inputsRef.current.checkInput() != "" && errMssg == "") {
			setErrMssg(inputsRef.current.checkInput());
			setTimeout(() => setErrMssg(""), 2000);
		} else {
			setDoc(doc(db, "users", user?.uid, "orders", Date.now().toString()), {
				id: Date.now(),
				products: [...basket],
				subTotal: getBasketTotal(basket),
				date: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
			}).then(() => {
				dispatch({type: "REMOVE_ALL_FROM_BASKET"});
				navigate("/orders");
			});
		}
	};

	return (
		<div className="payment">
			<h1 className="payment__title">Checkout ({getBasketLength(basket)} items)</h1>

			<div className="payment__section">
				<h2 className="payment__section-title">Delivery Address</h2>
				<div className="payment__content">
					<span>{user?.email}</span>
					<span>{user?.country}</span>
					<span>{user?.address}</span>
				</div>
			</div>

			<div className="payment__line"></div>

			<div className="payment__section">
				<h2 className="payment__section-title">Review items and delivery</h2>
				<div className="payment__content">
					{basket.map((item, index) => {
						return <Product key={index} id={item.id} img={item.img} title={item.title} rating={item.rating} price={item.price} qty={item.qty} />;
					})}
				</div>
			</div>

			<div className="payment__line"></div>

			<div className="payment__section">
				<h2 className="payment__section-title">Payment Method</h2>
				<div className="payment__content">
					<SubTotal type="payment" />
					<PaymentInputs ref={inputsRef} />
					{errMssg != "" && (
						<span data-testid="errorMssg" className="payment__err-msg">
							{errMssg}
						</span>
					)}
					<button data-testid="paymentButton" className="payment__button" onClick={handlePayment} disabled={errMssg != "" ? true : false}>
						Buy Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default Payment;
