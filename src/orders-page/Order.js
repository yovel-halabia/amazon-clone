import React from 'react'
import './Order.css';
import Product from '../Product';
import SubTotal from '../SubTotal';

const Order = ({id,products,subTotal,date}) => {



  return (
    <div className="order">

       <strong className='order__title'>order</strong>
       <span className='order__id'>{id}</span>
       <span className='order__date'>{date}</span>
       {products.map(element=>{
          return <Product  id={element.id} img={element.img} title={element.title} rating={element.rating} price={element.price} qty={element.qty}/>
       })}
       <SubTotal subTotal={subTotal}/>
    </div>

  )
}

export default Order;
