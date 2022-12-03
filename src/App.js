import { useEffect,useState} from "react";
import {Routes, Route} from "react-router-dom";

import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "./Firebase";

import {useStateValue} from "./Context/StateProvider";

import Header from "./Components/Header";
import Menu from "./Components/Menu";
import {Home, Checkout, Login, Payment, Orders} from "./Pages/index";

function App() {
	const [state, dispatch] = useStateValue();
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				getDoc(doc(db, "users", user.uid, "userData", "data")).then((data) => {
					dispatch({
						type: "SET_USER",
						user: data.data(),
					});
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
		localStorage.getItem("state") && dispatch({type: "SET_STATE", state: JSON.parse(localStorage.getItem("state"))});
	}, [dispatch]);

	useEffect(() => {
		localStorage.setItem("state", JSON.stringify(state));
	}, [state]);

	const handleShowMenu = (toggle) => {
		if (toggle && !showMenu) setShowMenu(true);
		else setTimeout(() => setShowMenu(false), 700);
	};

	return (
		<div className="App">
			{showMenu && <Menu handleShowMenu={handleShowMenu} />}
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Header handleShowMenu={handleShowMenu} />
							<Home />
						</>
					}
				/>
				<Route
					path="checkout"
					element={
						<>
							<Header handleShowMenu={handleShowMenu} />
							<Checkout />
						</>
					}
				/>
				<Route path="login" element={<Login />} />
				<Route
					path="payment"
					element={
						<>
							<Header handleShowMenu={handleShowMenu} />
							<Payment />
						</>
					}
				/>
				<Route
					path="orders"
					element={
						<>
							<Header handleShowMenu={handleShowMenu} />
							<Orders />
						</>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
