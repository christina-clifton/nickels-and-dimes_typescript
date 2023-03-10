export interface Transaction {
    Date: string,
    Amount: string,
    Type: string,
    Description: string,
    Month: string,
    Time?: string,
    PostingDate?: string,
    'Deposit(+)'?: any,
    'Withdrawal(-)'?: any,
    Details?: string
}