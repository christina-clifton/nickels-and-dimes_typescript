// Dependencies
import React, {useState} from 'react';
import './App.css';
import Papa from 'papaparse';

// Components
import { NavBar } from '../navBar/NavBar';
import { AppHowTo } from '../appHowTo/AppHowTo';
import { Transactions } from '../transactions/Transactions';

// Utility functions
import { standardizeTransactionObject, mergeTwoArraysOfObjects } from '../../util/UtilityFunctions';

//Types
import {Transaction} from '../../types/transaction';

// Constants
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                      'October', 'November', 'December']
const DATE = new Date();

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[DATE.getMonth()]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  /* Updates the transactions state. If user has chosen to generate random sample data, the default parameter is used.
  If user uploads a csv file, the file's transaction objects are standardized with a helper function. 
  If there are previous transactions saved to state, a helper function is called to merge the two arrays without duplicates. */
  const handleSetTransactions = (newTransactions: Transaction[]) => {
    newTransactions = newTransactions.map((transaction: Transaction) => standardizeTransactionObject(transaction));
    
    setTransactions(transactions.length > 0 ? mergeTwoArraysOfObjects(transactions, newTransactions) : newTransactions);
  }

  // Returns an array of transaction objects filtered by the selectedMonth state & then sorted by Date.
  const filterTransactionsByMonth = () => {
    const filteredTransactions = transactions.filter((transaction: Transaction) => transaction.Month === selectedMonth);
    filteredTransactions.sort((a,b) => {
      if(a.Date < b.Date) return -1;
      if(a.Date > b.Date) return 1;
      return 0;
    })
      
    return filteredTransactions;
  }

  return (
    <div id="app">
      <NavBar 
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        handleFileUpload={handleFileUpload}
        handleSetTransactions={handleSetTransactions}
      />
      <div id="main">
        {/* If the selected month does not have any transactions to display, the AppHowTo text is rendered.
        If the selected month does have transactions to display, those are rendered. */}
        {filterTransactionsByMonth().length === 0 ? 
            <AppHowTo /> 
          :
            <Transactions 
              transactions={filterTransactionsByMonth()}
            />
        }
      </div>
    </div>
  );
}

export default App;