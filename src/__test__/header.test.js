import React from "react";
import {StateProvider} from "../StateProvider";
import reducer from "../Reducer";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from 'react-router-dom';
import Header from "../Header";




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
            </BrowserRouter>
        </StateProvider> 
    );
}

describe('test header component', ()=>{

    
    test('test Header context props',async()=>{
        const component = rederComponent();
        
        const headerUserName = component.getByTestId('headerUserName');
        expect(headerUserName.textContent).toBe('Hello, yovel');
    
        const headerCountry = component.getByTestId('headerCountry');
        expect(headerCountry.textContent).toBe('Pru');
    
        const headerCartAmount = component.getByTestId('headerCartAmount');
        expect(headerCartAmount.textContent).toBe('0');
    });

});


