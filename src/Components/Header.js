import {useState, useEffect} from "react";
import "./Header.css";
import {Link} from "react-router-dom";

import {useStateValue} from "../Context/StateProvider";
import {getBasketLength} from "../Context/Reducer";

import {auth} from "../Firebase";
import {signOut} from "firebase/auth";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faUser} from "@fortawesome/free-solid-svg-icons";

const Header = ({handleShowMenu}) => {
	const [{basket, user}] = useStateValue();
	const [searchSelected, setSearchSelected] = useState("All");
	const [isMobie, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
		};
		handleResize();
		window.addEventListener("resize", handleResize, false);
	}, []);

	const handleSignOut = () => {
		signOut(auth);
		window.location.reload();
	};

	return (
		<div className="header">
			<Link to="/">
				<div className="header__logo"></div>
			</Link>

			{!isMobie && (
				<div className="header__dliver-to header__button app__button">
					<div id="header__map-icon"></div>
					<div className="header__text">
						<span className="header__text-line1">Deliver to</span>
						<span data-testid="headerCountry" className="header__text-line2">
							{user ? user.country : "Israel"}
						</span>
					</div>
				</div>
			)}

			<div className="header__search">
				{!isMobie && (
					<div className="header__filter">
						<span>{searchSelected}</span>
						<FontAwesomeIcon icon={faCaretDown} />
						<select onChange={(e) => setSearchSelected(e.target.value)}>
							<option value="All Departments">All Departments</option>
							<option value="ArtsCrafts">Arts &amp; Crafts</option>
							<option value="Automotive">Automotive</option>
							<option value="Baby">Baby</option>
							<option value="Beauty Personal Care">Beauty &amp; Personal Care</option>
							<option value="Books">Books</option>
							<option value="Computers">Computers</option>
						</select>
					</div>
				)}
				<input type="text" className="header__search-input" />
				<button className="header__search-button">
					<div id="header__search-icon"></div>
				</button>
			</div>

			{!isMobie && (
				<div className="header__button app__button">
					<div className="header__choose-laguage">
						<div id="header__america-icon"></div>
						<FontAwesomeIcon id="header__arrow-icon" icon={faCaretDown} />
					</div>
				</div>
			)}

			<div className=" header__button app__button">
				{!isMobie ? (
					<Link to={!user && "/login"} onClick={user && handleSignOut}>
						<div className="header__account header__text">
							<span data-testid="headerUserName" className="header__text-line1">
								Hello, {user ? user.email.split("@")[0] : "Guest"}
							</span>
							<span className="header__text-line2">{user ? "Sign Out" : "Sign In"}</span>
						</div>
					</Link>
				) : (
					<div
						onClick={() => {
							handleShowMenu(true);
							document.body.style.overflow = "hidden";
						}}>
						<strong className="header__user-name-mobile">{user ? user.email.split("@")[0] + " >" : "Guest >"}</strong>
						<FontAwesomeIcon icon={faUser} size="lg" />
					</div>
				)}
			</div>

			{!isMobie && (
				<div className="header__button app__button">
					<Link to="/orders">
						<div className="header__return-n-orders header__text">
							<span className="header__text-line1">Returns</span>
							<span className="header__text-line2">& Orders</span>
						</div>
					</Link>
				</div>
			)}

			<div className="header__button app__button">
				<Link to="/checkout">
					<div className="header__cart">
						<div className="header__cart header__icon-cart">
							<span data-testid="headerCartAmount" id="header__cart-amaount">
								{getBasketLength(basket)}
							</span>
						</div>
						{!isMobie && <span>Cart</span>}
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;
