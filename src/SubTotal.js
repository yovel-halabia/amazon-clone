import React from 'react'
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from './Reducer';
import {useStateValue} from './StateProvider';

const SubTotal = ({type,subTotal}) => {
    const [state] = useStateValue();

    return (
        <strong style={!type?{display: 'block',textAlign: 'right'}:{}}>
            
            <CurrencyFormat
            renderText={(value) => (
            <>
                Order Total: {value}
            </>
            )}
            decimalScale={2}
            value={type == 'payment' ? getBasketTotal(state.basket) : subTotal}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            />
        </strong>
    )
}

export default SubTotal;
