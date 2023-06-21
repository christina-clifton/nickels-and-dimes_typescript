// Dependencies
import React, {Dispatch, SetStateAction} from 'react';
import './NavBar.css';
// import { MONTHS } from '../app/App';
import {Transaction} from '../../types/transaction';
import { FileUpload } from '../fileUpload/fileUpload';
import { SampleDataButton } from '../sampleDataButton/sampleDataButton';

interface IProps {
    selectedMonth: string,
    setSelectedMonth: Dispatch<SetStateAction<any>>,
    handleSetTransactions: (newTransactions: Transaction[]) => void,
    toggle: Dispatch<SetStateAction<any>>
}

export const NavBar = (props: IProps) => {
    const { /* selectedMonth, setSelectedMonth, */ handleSetTransactions} = props;

    return (
        <div className="navbar">
            {/* <ul className="months">
                {MONTHS.map((month) => {
                    return (
                        <button 
                            className={month === selectedMonth ? "month selected-month" : "month"} 
                            key={month} 
                            value={month} 
                            onClick={(e: any) => setSelectedMonth(e.target.value)}
                        >{month}</button>
                    )
                })}
            </ul> */}
            <div className='buttons-container'>
                <FileUpload 
                    handleSetTransactions={handleSetTransactions}
                />
                <SampleDataButton
                    handleSetTransactions={handleSetTransactions}
                />
            </div>
            
        </div>
    )
}