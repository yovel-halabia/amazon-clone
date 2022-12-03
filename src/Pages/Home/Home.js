import {useState, useRef} from "react";
import "./Home.css";

import ProductsData from "./ProductsData";

import HomeProduct from "./HomeProduct";
import Alert from "./Alert";

const Home = () => {
	const [showMssg, setShowMssg] = useState(false);
	const alertRef = useRef(null);

	const handleShowMssg = () => {
		if (!showMssg) {
			setShowMssg(true);
			setTimeout(() => alertRef.current.addClass(), 2000);
			setTimeout(() => setShowMssg(false), 3000);
		}
	};

	return (
		<div className="home app__content">
			<div className="home__background"></div>

			<div className="home__content">
				<div className="home__row">
					<HomeProduct
						id={ProductsData[0].id}
						title={ProductsData[0].title}
						price={ProductsData[0].price}
						rating={ProductsData[0].rating}
						img={ProductsData[0].img}
						handleShowMssg={handleShowMssg}
					/>
					<HomeProduct
						id={ProductsData[1].id}
						title={ProductsData[1].title}
						price={ProductsData[1].price}
						rating={ProductsData[1].rating}
						img={ProductsData[1].img}
						handleShowMssg={handleShowMssg}
					/>
				</div>

				<div className="home__row">
					<HomeProduct
						id={ProductsData[2].id}
						title={ProductsData[2].title}
						price={ProductsData[2].price}
						rating={ProductsData[2].rating}
						img={ProductsData[2].img}
						handleShowMssg={handleShowMssg}
					/>
					<HomeProduct
						id={ProductsData[3].id}
						title={ProductsData[3].title}
						price={ProductsData[3].price}
						rating={ProductsData[3].rating}
						img={ProductsData[3].img}
						handleShowMssg={handleShowMssg}
					/>
					<HomeProduct
						id={ProductsData[4].id}
						title={ProductsData[4].title}
						price={ProductsData[4].price}
						rating={ProductsData[4].rating}
						img={ProductsData[4].img}
						handleShowMssg={handleShowMssg}
					/>
				</div>

				<div className="home__row">
					<HomeProduct
						id={ProductsData[5].id}
						title={ProductsData[5].title}
						price={ProductsData[5].price}
						rating={ProductsData[5].rating}
						img={ProductsData[5].img}
						handleShowMssg={handleShowMssg}
					/>
				</div>
			</div>
			{showMssg && <Alert ref={alertRef} />}
		</div>
	);
};

export default Home;
