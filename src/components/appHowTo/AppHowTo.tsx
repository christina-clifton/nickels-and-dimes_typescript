// Dependencies
import React from 'react';
import './AppHowTo.css';
import { FileUpload } from '../fileUpload/fileUpload';
import { SampleDataButton } from '../sampleDataButton/sampleDataButton';
import {Transaction} from '../../types/transaction';


interface IProps {
    handleSetTransactions: (newTransactions: Transaction[]) => void
}

export const AppHowTo = (props: IProps) => {
    const {handleSetTransactions} = props;

    return (
        <div className="how-to">
            <div className="column left-column">
                <div className='text'>
                    <h3>Option 1</h3>
                    <ol>
                        <li>Login to your *bank's website and download your transaction history as a .csv file. The transactions must be within the same calendar year.</li>
                        <li>Click the 'Upload .csv file' button below. Select the .csv file you downloaded from your bank and click 'Open'. You may upload multiple files individually.</li>
                        <li>Select the month you'd like to view in the navigation bar. If you still see this message, then you have not yet uploaded any transactions for the selected month.</li>
                    </ol>
                </div>     
                <div className='button'>
                    <FileUpload 
                        handleSetTransactions={handleSetTransactions}
                    />
                    <p>* Currently compatible with Chase, Charles Schwab & Ally.</p>
                </div>
                
            </div>
            <div className="column right-column">
                <div className='text'>
                    <h3>Option 2</h3>
                    <ol>
                        <li>Click the 'Generate sample Data' button below.</li>
                        <li>If you'd like to see what the raw sample data looks like, it will be printed to the console.</li>
                    </ol>
                </div>
                <div className='button'>
                    <SampleDataButton 
                        handleSetTransactions={handleSetTransactions}
                    />
                </div>
                
            </div>
        </div>
    )
}