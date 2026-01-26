// import React, { useState } from 'react';
import { Counter } from '../Store';

export default function CardPage() {
    // const [counter , setCounter] = useState(20);
    const { value , increment ,decrement } = Counter() ;
  return (
    <div className='w-full '>
        <h1>Your Counter : {value}</h1>
        <button className='btn btn-primary' onClick={increment} >+</button>
        <button className='btn btn-error' onClick={decrement} >-</button>

        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Item Qty</th>
                    <th>Item Total</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

    </div>
  )
}
