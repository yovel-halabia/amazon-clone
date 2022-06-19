import React from "react";
import Header from "../Header";
import HomePage from '../home-page/HomePage'
import {StateProvider} from "../StateProvider";
import reducer from "../Reducer";
import {fireEvent, render, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from 'react-router-dom';





const rederComponent = ()=>{
    const initialState = {
        basket:[],
        user:{
            email:'yovel@gmail.com',
            country:'Pru',
            basket:[],
        },
        showMssg:false,
    }
    return render(
        <StateProvider initialState={initialState} reducer={reducer}>
            <BrowserRouter >
                <Header/>
                <HomePage/>
            </BrowserRouter>
        </StateProvider> 
    );
}

describe('test home page', ()=>{
    test('test add 1 item to cart', ()=>{
        const component = rederComponent();
    
        const productAddToCart = component.getByTestId('productAddToCart1');
        productAddToCart.click();
    
        const headerCartAmount = component.getByTestId('headerCartAmount');
        expect(headerCartAmount.textContent).toBe('1');
    
    
    });
    
    
    test('add maximum qty of product',async()=>{
        const component = rederComponent();
    
        const  productChangeQTY = component.getByTestId('productChangeQTY1');
        fireEvent.change(productChangeQTY, {target: {value: '5'}});
        expect(productChangeQTY.value).toBe('5');
    
        const productAddToCart = component.getByTestId('productAddToCart1');
        productAddToCart.click();
        productAddToCart.click();
    
        await waitFor(()=>{
            const alertMssg = component.getByTestId('alertMssg');
            expect(alertMssg).toBeTruthy();
        });
    });


})

