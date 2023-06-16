import React from 'react';
import './fileUpload.css'
import Papa from 'papaparse';
import { SampleData } from '../../sampleData/SampleData';
import {Transaction} from '../../types/transaction';


interface IProps {
    handleSetTransactions: (newTransactions: Transaction[]) => void
}

export const FileUpload = (props: IProps) => {
    const {handleSetTransactions} = props;
    
    /* Parses data from csv file into an array of transaction objects. Passes the returned array to a handler 
    function to update the transactions state. */
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        const files = e.target.files[0];
        if(files) {
            Papa.parse(files, {
            /* Charles Schwab files have 3 extra header rows at that were throwing off the data parsing. This 
            function removes those rows before parsing any of the data. */ 
            beforeFirstChunk: function(chunk) {
                // Splits the chunk into rows
                let rows = chunk.split( /\r\n|\r|\n/ );
                // Defines the headers as the first row
                let headers = rows[0].split(',');
                // If there is only one header, then the uploaded file is from Charles Schwab
                if(headers.length === 1) {
                // removes extra header rows
                rows.splice(0, 1);
                rows.splice(1, 1);
                rows.splice(1, 1);
                chunk = rows.join("\r\n");
                }
                return chunk;
            },
            header: true,
            // Removes whitespace from the headers
            transformHeader: ((header) => header.replace(/\s/g, '')),
            // Handles a known bug with Papaparse wherein the results array has a trailing empty object
            skipEmptyLines: true,
            complete: function(results: any) {
                handleSetTransactions(results.data);
            }
            })
        }
    }

    return (
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
    )
}