import React from "react";
import Login from "../login-page/Login";
import {StateProvider} from "../../Context/StateProvider";
import reducer,{initialState} from "../Reducer";
import {render,fireEvent ,waitFor,act} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from 'react-router-dom';

jest.setTimeout(15000)


const rederComponent = ()=>{
  return render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter >
        <Login/>
      </BrowserRouter>
    </StateProvider> 

  );
}

describe('test login page', () =>{

  test('test login inputs' ,async()=>{
    const component = rederComponent();
    const loginButton =  component.getByTestId('loginButton');

    //testing email input
    const emailInput = component.getByTestId('login__email-input');
    fireEvent.change(emailInput, {target: {value: 'test'}});
    expect(emailInput.value).toBe('test');
    loginButton.click();

    const errorMssg1 = await component.findByTestId('errorText');
    expect(errorMssg1).toBeTruthy();


    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
      expect(errorMssg1).not.toBeInTheDocument();
    },{timeout: 3000});

    //testing password input
   const passwordInput = component.getByTestId('login__password-input');
    fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
    fireEvent.change(passwordInput, {target: {value: '123'}});
    expect(passwordInput.value).toBe('123');
    loginButton.click();
    const errorMssg2 = await component.findByTestId('errorText');
    expect(errorMssg2).toBeTruthy();
    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
      expect(errorMssg2).not.toBeInTheDocument();
    },{timeout: 3000})
  });

  


  test('test text changeing by moving to register',async()=>{

    const component = rederComponent();

    const loginTitle = component.getByTestId('loginTitle');
    const loginButton =  component.getByTestId('loginButton');
    const registerButton = component.getByTestId('registerButton');

    registerButton.click();
    await waitFor(() => {
      expect(loginTitle).toHaveTextContent('Register');
      expect(loginButton).toHaveTextContent('Register')
      expect(registerButton).toHaveTextContent('Back to login');
    });
  });


  test('test register inputs',async()=>{

    const component = rederComponent();
    const loginButton =  component.getByTestId('loginButton');

    const registerButton = component.getByTestId('registerButton');
    registerButton.click();

    const emailInput = component.getByTestId('login__email-input');
    fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
    const passwordInput = component.getByTestId('login__password-input');
    fireEvent.change(passwordInput, {target: {value: '132456'}});

    //test country input
    const countryInput = component.getByTestId('countryInput');
    expect(countryInput.value).toBe('');
    loginButton.click();
    const errorMssg3 = await component.findByTestId('errorText');
    expect(errorMssg3).toHaveTextContent('Invalid country');
    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
      expect(errorMssg3).not.toBeInTheDocument();
    },{timeout: 3000})


    //test adress input
    const addressInput = component.getByTestId('addressInput');
    fireEvent.change(countryInput, {target: {value: '132456'}});
    expect(addressInput.value).toBe('');
    loginButton.click();
    const errorMssg4 = await component.findByTestId('errorText');
    expect(errorMssg4).toHaveTextContent('Invalid address');
    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
      expect(errorMssg4).not.toBeInTheDocument();
    },{timeout: 3000})

  });
});
