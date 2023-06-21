// Dependencies
import React, {useState, useRef } from 'react';
import './App.css';

// Components
import NavToggle from '../navToggle/navToggle';
import { NavBar } from '../navBar/NavBar';
import { AppHowTo } from '../appHowTo/AppHowTo';
import { Transactions } from '../transactions/Transactions';

// Utility functions
import { TransactionClass, mergeTwoArraysOfObjects, filterTransactionsByMonth, useClickOutsideElement } from '../../util/UtilityFunctions';

//Types
import {Transaction} from '../../types/transaction';

// Constants
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                      'October', 'November', 'December']
const DATE = new Date();

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[DATE.getMonth()]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [navbarToggled, toggle] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutsideElement(wrapperRef, toggle, 'navbar-toggle-icon');

  /* Updates the transactions state. If user has chosen to generate random sample data, the default parameter is used.
  If user uploads a .csv file, the file's transaction objects are standardized with a helper function. 
  If there are previous transactions saved to state, a helper function is called to merge the two arrays without duplicates. */
  const handleSetTransactions = (newTransactions: Transaction[]) => {
    newTransactions = newTransactions.map((transaction: Transaction) => {
      if (!transaction.Date && transaction.PostingDate) {
      transaction.Date = transaction.PostingDate;
      }

      if(transaction['Deposit(+)']) {
      transaction.Amount = transaction['Deposit(+)'];
      transaction.Type = 'Deposit'
      } else if(transaction['Withdrawal(-)']) {
      transaction.Amount = transaction['Withdrawal(-)'];
      transaction.Type = 'Withdrawal';
      }

      if(transaction.Details === 'CREDIT') {
      transaction.Type = 'Deposit';
      } else if (transaction.Details === 'DEBIT') {
      transaction.Type = 'Withdrawal';
      }
      
      return new TransactionClass(transaction.Date, transaction.Amount, transaction.Type, transaction.Description)
    });

    setTransactions(transactions.length > 0 ? mergeTwoArraysOfObjects(transactions, newTransactions) : newTransactions);
  }
  
  return (
    <div id="app" className={navbarToggled ? 'nav-open' : ''}>
      <header>
        <div className='app-title'>
          <h1>Nickels <span>&</span> Dimes</h1>
        </div>
        {filterTransactionsByMonth(transactions, selectedMonth).length > 0 ?
            <h2>
              <select name='month' className='selectedMonth' aria-label='Select Month'>
                <option value='' hidden>{selectedMonth}</option>
                {MONTHS.map((month) => {
                  return <option value={month} onClick={() => setSelectedMonth(month)}>{month}</option>
                })}
              </select>
            </h2>
          :
            null
        }

        {filterTransactionsByMonth(transactions, selectedMonth).length > 0 ? 
            <div className='app-nav-toggle'>
              <NavToggle 
                navbarToggled={navbarToggled}
                toggle={() => toggle(!navbarToggled)}
              />
            </div>
          :
            null
        }
        </header>

        {filterTransactionsByMonth(transactions, selectedMonth).length > 0 ?
            <nav ref={wrapperRef} className={`${navbarToggled ? 'open' : ''} navbar-container`}>
              <NavBar 
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                handleSetTransactions={handleSetTransactions}
                toggle={() => toggle(!navbarToggled)}
              />
            </nav>
          :
            null
        }
        

      <div id="main">
        {/* If the selected month does not have any transactions to display, the AppHowTo text is rendered.
        If the selected month does have transactions to display, those are rendered. */}
        {filterTransactionsByMonth(transactions, selectedMonth).length === 0 ? 
            <AppHowTo 
              handleSetTransactions={handleSetTransactions}
            /> 
          :
            <Transactions 
              transactions={filterTransactionsByMonth(transactions, selectedMonth)}
            />
        }


      </div>
    </div>
  );
}

export default App;