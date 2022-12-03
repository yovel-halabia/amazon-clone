import {useState} from "react";
import "./Login.css";
import {Link, useNavigate} from "react-router-dom";

import {auth, db} from "../../Firebase";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

import {useStateValue} from "../../Context/StateProvider";

const Login = () => {
	const navigate = useNavigate();
	const [, dispatch] = useStateValue();
	const [isSignIn, setIsSignIn] = useState(true);
	const [ErrMssg, showErrMssg] = useState("");
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		country: "",
		address: "",
	});

	const login = () => {
		setButtonDisabled(true);
		signInWithEmailAndPassword(auth, inputs.email, inputs.password)
			.then((user) => {
				getDoc(doc(db, "users", user.user.uid, "userData", "data")).then((data) => {
					dispatch({
						type: "SET_USER",
						user: data.data(),
					});
					navigate("/");
				});
			})
			.catch((error) => {
				setButtonDisabled(false);
				showErrMssg(error.code.split("/")[1].replaceAll("-", " "));
				setTimeout(() => showErrMssg(""), 3000);
			});
	};

	const register = () => {
		setButtonDisabled(true);
		if (inputs.email === "") {
			showErrMssg("Invalid email");
			setTimeout(() => showErrMssg(""), 3000);
			setButtonDisabled(false);
		} else if (inputs.password === "") {
			showErrMssg("Invalid password");
			setTimeout(() => showErrMssg(""), 3000);
			setButtonDisabled(false);
		} else if (inputs.country === "") {
			showErrMssg("Invalid country");
			setTimeout(() => showErrMssg(""), 3000);
			setButtonDisabled(false);
		} else if (inputs.address === "") {
			showErrMssg("Invalid address");
			setTimeout(() => showErrMssg(""), 3000);
			setButtonDisabled(false);
		} else {
			createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
				.then((auth) => {
					setDoc(doc(db, "users", auth?.user.uid, "userData", "data"), {
						uid: auth?.user.uid,
						email: inputs.email,
						country: inputs.country,
						address: inputs.address,
					}).then(() => navigate("/"));
				})
				.catch((error) => {
					setButtonDisabled(false);
					showErrMssg(error.code.split("/")[1].replaceAll("-", " "));
					setTimeout(() => showErrMssg(""), 3000);
				});
		}
	};

	return (
		<div className="login">
			<Link to={"/"}>
				<div className="login__logo"></div>
			</Link>

			<div className="login__container">
				<h1 className="login__title" data-testid="loginTitle">
					{isSignIn ? "Sign in" : "Register"}
				</h1>
				<h3 className="login__label">Email</h3>
				<input
					type="text"
					className="login__input"
					data-testid="login__email-input"
					value={inputs.email}
					onChange={(e) => setInputs({...inputs, email: e.target.value})}
				/>
				<h3 className="login__label">Password</h3>
				<input
					type="password"
					className="login__input"
					data-testid="login__password-input"
					value={inputs.password}
					onChange={(e) => setInputs({...inputs, password: e.target.value})}
				/>
				{!isSignIn && (
					<>
						<h3 className="login__label">country</h3>
						<input
							data-testid="countryInput"
							type="text"
							className="login__input"
							value={inputs.country}
							onChange={(e) => setInputs({...inputs, country: e.target.value})}
						/>
						<h3 className="login__label">Address</h3>
						<input
							data-testid="addressInput"
							type="text"
							className="login__input"
							value={inputs.address}
							onChange={(e) => setInputs({...inputs, address: e.target.value})}
						/>
					</>
				)}
				<button
					data-testid="loginButton"
					disabled={buttonDisabled}
					className={buttonDisabled ? "app__button-disable login__submit" : "login__submit"}
					onClick={isSignIn ? login : register}>
					{isSignIn ? "Sign In" : "Register"}
				</button>
				{ErrMssg !== "" && (
					<span data-testid="errorText" className="login__error">
						{ErrMssg}
					</span>
				)}
				<p className="login__info">By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
				<button data-testid="registerButton" className="login__sign-up" onClick={() => setIsSignIn(!isSignIn)}>
					{isSignIn ? "Create your Amazon Account" : "Back to login"}
				</button>
			</div>
		</div>
	);
};

export default Login;
