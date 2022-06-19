import {useState} from 'react'
import './Product.css';
import { useStateValue } from './StateProvider';

const Product = ({id,img,title,rating,price,qty,compType}) => {
    const [state,dispatch] = useStateValue();
    const [selectValue,setSelectValue] = useState(qty);

    const removeFromBasket = ()=>{
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id
        });
    }

    const handelQtyChange = (e)=>{
        setSelectValue(e.target.value);
        dispatch({
            type:'UPDATE_ITEM',
            item: {
                id:id,
                title:title,
                price:price,
                qty:e.target.value,
                rating:rating,
                img:img
            }
        })
    }

    return (

        <div data-testid={"product"+id} className="product">

            <div className="product__img-container">
                <img src={img} alt="" className="product__img"/>
            </div>
 
            <div className="product__info">
                <h3 className="product__title">{title}</h3>
                <div className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </div>
                {compType == 'checkout'?
                <div className="product__qty">
                    <select data-testid={"productChangeQTY"+id}  name='qty' value={selectValue} onChange={(e)=>handelQtyChange(e)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                </div>
                :
                <strong>qty: {qty}</strong>
                }
                <div className="product__rating">
                    {Array(rating).fill().map((_,index) =>{
                        return <p key={index}>⭐</p>
                    })}
                </div>
                {compType == 'checkout'&&
                <button data-testid={"removeProduct"+id} onClick={removeFromBasket} className="product__button">remove from basket</button>
                }
            </div>
            
        </div>
    )
}

export default Product;
