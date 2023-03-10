// Dependencies
import React from 'react';
import './Transactions.css';
import {Transaction} from '../../types/transaction';

interface IProps {
    transactions: Transaction[]
}

export const Transactions = (props: IProps) => {
    const { transactions } = props;

    return (
        <div className="transactions">
            <h3>Transactions</h3> 
            <div className="transactions-list">
                {transactions.map((transaction, i) => {
                    return(
                        <div className={transaction.Type === 'Deposit' ? 'transaction deposit' : 'transaction withdrawal'} key={i}>
                            <div className="transaction-date">{transaction.Date}</div>
                            <div className="transaction-value">{transaction.Amount}</div>
                            <input className="transaction-description" placeholder={transaction.Description}></input>
                        </div>
                    )
                })}
            </div>
            <ul className="transactions-legend">
                <li><div className="legend-key" id="withdrawal"></div>Withdrawals</li>
                <li><div className="legend-key" id="deposit"></div>Deposits</li>
            </ul> 
        </div> 
            
    )
}