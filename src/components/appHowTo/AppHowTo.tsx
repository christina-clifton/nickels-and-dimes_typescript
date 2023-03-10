// Dependencies
import React from 'react';
import './AppHowTo.css';

export const AppHowTo = () => {
    return (
        <div className="how-to">
            <h2>How to use this app:</h2>
            <div className="main-text">
                <div className="left-column">
                    <h3>Option 1</h3>
                    <ol>
                        <li>Login to your *bank's website and download your transaction history as a .csv file. The transactions must be within the same calendar year.</li>
                        <li>Click the 'Upload .csv file' button at the bottom-left corner of this screen. Select the .csv file you downloaded from your bank and click 'Open'. You may upload multiple files individually.</li>
                        <li>Select the month you'd like to view in the navigation bar to the left. If you still see this message, then you have not yet uploaded any transactions for the selected month.</li>
                    </ol>
                    <p>* Currently compatible with Chase, Charles Schwab & Ally.</p>
                </div>
                <div className="right-column">
                    <h3>Option 2</h3>
                    <ol>
                        <li>Click the 'Generate sample Data' button at the bottom-left corner of this screen.</li>
                        <li>If you'd like to see what the raw sample data looks like, it will be printed to the console.</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}