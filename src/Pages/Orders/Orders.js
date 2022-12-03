import {useLayoutEffect, useState} from "react";
import "./Orders.css";

import {useStateValue} from "../../Context/StateProvider";
import {db} from "../../Firebase";
import {getDocs, collection} from "firebase/firestore";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

import Order from "./Order.js";

const Orders = () => {
	const [{user}] = useStateValue();
	const [orders, setOrders] = useState();
	const [alertMssg, setAlertMssg] = useState("");

	useLayoutEffect(() => {
		if (user) {
			setAlertMssg("");
			(async () => {
				const docSnap = await getDocs(collection(db, "users", user.uid, "orders"));
				var dataOrders = [];
				docSnap.forEach((element) => {
					dataOrders.push(element.data());
				});
				setOrders(dataOrders);
				dataOrders?.length === 0 && setAlertMssg("You dont have any orders");
			})();
		} else {
			setAlertMssg("You must log in to see your orders");
		}
	}, [user]);

	return (
		<div className="orders">
			<h1 className="orders__title">Your orders</h1>
			{alertMssg !== "" && <h2>{alertMssg}</h2>}
			{!orders && alertMssg === "" && <FontAwesomeIcon icon={faCircleNotch} size="5x" spin />}
			{orders?.map((item) => (
				<Order id={item.id} products={item.products} subTotal={item.subTotal} date={item.date} />
			))}
		</div>
	);
};

export default Orders;
