import React from 'react';
import './sampleDataButton.css'
import { SampleData } from '../../sampleData/SampleData';
import {Transaction} from '../../types/transaction';


interface IProps {
    handleSetTransactions: (newTransactions: Transaction[]) => void
}

export const SampleDataButton = (props: IProps) => {
    const {handleSetTransactions} = props;
    
    return (
        <div className='sample-data-button-container'>
            <button className="sample-data-button" onClick={() => handleSetTransactions(SampleData())}>Generate sample data</button>
        </div>
    )
}