import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';
function App() {
    const fetchBalance = async () => {
        const response = await axios.get(`http://localhost:3000/`);
        console.log(response.data);
    };
 
    fetchBalance();

    return (
        <>
            {/* <CardanoWalletTracker/> */}

            <button onClick={fetchBalance}>Fetch</button>
        </>
    );
}

export default App;
