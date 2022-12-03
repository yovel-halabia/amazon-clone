import React from "react";
import Header from "../Header";
import Payment from '../payment-page/Payment';
import {StateProvider} from "../../Context/StateProvider";
import reducer from "../Reducer";
import {render, fireEvent, waitFor,waitForElementToBeRemoved} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from 'react-router-dom';


beforeEach(() => {
    jest.useFakeTimers()
});

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
                <Payment/>
            </BrowserRouter>
        </StateProvider> 
    );
}


describe('test payment page',()=>{

    test('test inputs',async()=>{

        const component = renderComponent();
        const paymentButton = component.getByTestId('paymentButton');
        const cardInput = component.getByTestId('cardInput');
        fireEvent.change(cardInput, {target: {value: '123'}});
        expect(cardInput.value).toBe('123');
        paymentButton.click();

        const errorMssg = component.getByTestId('errorMssg');
        expect(errorMssg.textContent).toBe('Credit Card input invalid');

        await waitFor(async()=>{           
            expect(paymentButton).not.toBeDisabled();
            expect(errorMssg).not.toBeInTheDocument();  
        },{timeout:3000});


        

        fireEvent.change(cardInput, {target: {value: '12345677912345548'}});
        const dateInput = component.getByTestId('dateInput');
        fireEvent.change(dateInput, {target: {value: ''}});
        expect(dateInput.value).toBe('');
        paymentButton.click();

        const errorMssg1 = component.getByTestId('errorMssg');
        expect(errorMssg1.textContent).toBe('Date input invalid'); 
        await waitFor(() => {
          expect(paymentButton).not.toBeDisabled();
          expect(errorMssg1).not.toBeInTheDocument();
        },{timeout:3000});

       fireEvent.change(dateInput, {target: {value: '07/2022'}});
        const CVVInput = component.getByTestId('CVVInput');
        fireEvent.change(CVVInput, {target: {value: ''}});
        expect(CVVInput.value).toBe('');
        paymentButton.click();
        const errorMssg2= component.getByTestId('errorMssg');
        expect(errorMssg2.textContent).toBe('CVV input invalid'); 
        await waitFor(() => {
            expect(paymentButton).not.toBeDisabled();
            expect(errorMssg1).not.toBeInTheDocument();
        },{timeout:3000});

    });

});