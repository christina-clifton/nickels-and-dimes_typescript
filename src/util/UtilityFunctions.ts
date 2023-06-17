// Dependencies
import { MONTHS } from '../components/app/App';
import {Transaction} from '../types/transaction';

// Merges 2 arrays of objects without duplicates.
export const mergeTwoArraysOfObjects = (arr1: Transaction[], arr2: Transaction[]) => {
    for(let i = 0; i < arr1.length; i++) {
        for(let j = arr2.length - 1; j >= 0; j--) {
            if((arr1[i].Date === arr2[j].Date) && (arr1[i].Time === arr2[j].Time)) {
                arr2.splice(j, 1);
            }
        }
    }

    return arr1.concat(arr2);
}

// Returns an array of transaction objects filtered by the selectedMonth state & then sorted by Date.
export const filterTransactionsByMonth = (transactions: Transaction[], selectedMonth: string) => {
    const filteredTransactions = transactions.filter((transaction: Transaction) => transaction.Month === selectedMonth);
    filteredTransactions.sort((a: Transaction, b: Transaction) => {
        if(a.Date < b.Date) return -1;
        if(a.Date > b.Date) return 1;
        return 0;
    })
        
    return filteredTransactions;
}

/* Takes in a transaction object and returns a standardized one with properties for Date, Amount, 
Type, Description & Month */
export class TransactionClass implements Transaction {
    Date!: string;
    Month!: string;
    Amount!: string;
    Type: string;
    Description: string;

    constructor(date: string, amount: string, type: string, description: string) {
        this.setDate(date);
        this.setMonth(date);
        this.setAmount(amount);
        this.Type = type;
        this.Description = description;
    }

    setDate(date: string) {
        const intlDate = new Date(date);
        const formatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });    

        this.Date = formatter.format(intlDate);
    }

    setMonth(date: string) {
        const intlDate = new Date(date);
        this.Month = MONTHS[intlDate.getUTCMonth()];
    }
    
    setAmount(amount: string) {
        const amountNum = Number(amount.replace('-',""));

        const USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        this.Amount = USDollar.format(amountNum);
        
    }
}

export const useClickOutsideElement = (wrapperRef: any, callbackFunction: Function, id: string) => {
    const handleClickOutside = (e: any) => {
        if(
            wrapperRef.current &&
            !wrapperRef.current.contains(e.target) &&
            e.target.id !== id
        ) {
            return callbackFunction();
        }
    }

    document.addEventListener("click", handleClickOutside);   
    
    return () => {
        document.removeEventListener("click", handleClickOutside);
    };     
};