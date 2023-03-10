// Dependencies
import React, {Dispatch, SetStateAction} from 'react';
import './NavBar.css';
import { MONTHS } from '../app/App';
import {Transaction} from '../../types/transaction';
import { SampleData } from '../../sampleData/SampleData';

interface IProps {
    selectedMonth: string,
    setSelectedMonth: Dispatch<SetStateAction<any>>,
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSetTransactions: (newTransactions: Transaction[]) => void
}

export const NavBar = (props: IProps) => {
    const {selectedMonth, setSelectedMonth, handleFileUpload, handleSetTransactions} = props;

    return (
        <div className="navbar">
            <h1>Nickels <br/> & <br/> Dimes</h1>
            <ul className="months">
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
            </ul>
            <div className='buttons'>
                <label htmlFor="file-upload" className="file-upload-label">Upload .csv file</label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    id="file-upload"
                />
                <button className="sample-data-button" onClick={() => handleSetTransactions(SampleData())}>Generate sample data</button>
            </div>
        </div>
    )
}