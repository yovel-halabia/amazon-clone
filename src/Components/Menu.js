import {useRef} from "react";
import "./Menu.css";
import {Link} from "react-router-dom";

import {useStateValue} from "../Context/StateProvider";

import {auth} from "../Firebase";
import {signOut} from "firebase/auth";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";

const Menu = ({handleShowMenu}) => {
	const [{user}] = useStateValue();
	const menuRef = useRef(null);
	const closeRef = useRef(null);

	const handleCloseMenu = () => {
		document.body.style.overflow = "visible";
		menuRef.current.classList.add("menu__hide");
		closeRef.current.classList.add("menu__dark-hide");
		handleShowMenu(false);
	};

	return (
		<div className="menu" ref={menuRef}>
			<div className="menu__dark" ref={closeRef}>
				<div className="menu__close" onClick={handleCloseMenu}>
					<FontAwesomeIcon icon={faAngleLeft} />
				</div>
			</div>

			<div className="menu__top">
				<div className="menu__title-container">
					<h4>Hello,{user ? user.email.split("@")[0] : "Guest"}</h4>
					<h2>Your Account</h2>
				</div>
			</div>

			<div className="menu__main">
				<div className="menu__orders">
					<span>
						<strong>Your Orders</strong>
					</span>
					<Link to="/orders" onClick={handleCloseMenu}>
						<div>See All</div>
					</Link>
				</div>

				<div className="menu__settings">
					<span>
						<strong>Setting</strong>
					</span>
					<span>{user ? user.country : "Israel"}</span>
					<Link to={!user && "/login"} onClick={!user && handleCloseMenu}>
						<span
							onClick={() => {
								signOut(auth);
							}}>
							{user ? "Sign Out" : "Sign In"}
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Menu;
