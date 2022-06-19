import React from "react";
import Header from "../Header";
import Checkout from '../checkout-page/Checkout'
import {StateProvider} from "../StateProvider";
import reducer from "../Reducer";
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from 'react-router-dom';

const renderComponent = ()=>{
    const initialState = {
        basket:[
            {
                id: "1",
                img: "https://m.media-amazon.com/images/I/81tjLksKixL._AC_UL320_.jpg",
                price: "20",
                qty: "1",
                rating: 4,
                title: "Seagate Portable 2TB External Hard Drive Portable HDD – USB 3.0 for PC, Mac, PlayStation, & Xbox - 1-Year Rescue Service (STGX2000400)"
            }
        ],
        user:{
            email:'yovel@gmail.com',
            country:'Pru',
        },
        showMssg:false,
    }
    return render(
        <StateProvider initialState={initialState} reducer={reducer}>
            <BrowserRouter >
                <Header/>
                <Checkout/>
            </BrowserRouter>
        </StateProvider> 
    );
}


describe("test checkout page",()=>{


    test('test subtotal',()=>{
        const component = renderComponent();  
        const subtotal = component.getByTestId('subtotal');
        expect(subtotal.textContent).toBe('Subtotal (1 items): $20');
    });

    test('test remove item from basket',()=>{
        const component = renderComponent();

        //click on remove product button
        const product = component.getByTestId('product1');
        const removeProduct = component.getByTestId('removeProduct1');
        removeProduct.click();
        expect(product).not.toBeInTheDocument();

        //test subtotal text change
        const subtotal = component.getByTestId('subtotal');
        expect(subtotal.textContent).toBe('Subtotal (0 items): $0');
    });

    test('test changeing qty of product',()=>{
        const component = renderComponent();

        //change value of select
        const productChangeQTY =  component.getByTestId('productChangeQTY1');
        fireEvent.change(productChangeQTY, {target: {value: '5'}});

        //test subtotal text change
        const subtotal = component.getByTestId('subtotal');
        expect(subtotal.textContent).toBe('Subtotal (5 items): $100');
    });


});