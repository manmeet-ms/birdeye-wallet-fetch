import React, { useState, useEffect } from 'react';
import axios from 'axios';


// Proxy setup for Blockfrost API to avoid CORS issues
const BLOCKFROST_BASE_URL = 'https://preprod.blockfrost.io/api/v0';
const BLOCKFROST_PROJECT_ID = 'preprodyZkQeFwTnYqObSyTgkKaTnxBddHlnXr3'; // Replace with your project ID

// Axios instance with interceptors for better error handling
const blockfrostApi = axios.create({
    baseURL: BLOCKFROST_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        project_id: BLOCKFROST_PROJECT_ID,
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to log requests
blockfrostApi.interceptors.request.use(
    (config) => {
        console.log('Requesting:', config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    },
);

// Add a response interceptor to handle errors
blockfrostApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Full error response:', error);

        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error setting up request:', error.message);
        }

        return Promise.reject(error);
    },
);

function CardanoWalletTracker() {
    const [walletBalances, setWalletBalances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // List of preprod Cardano wallet addresses to track
    const walletAddresses = [
        'addr_test1qpxagqfzacuyv2jw8jpalrkzfafy8mmcrma4v9fj3xz4c2876zqvaxgtq0n4wspdq4atxedf4vfpaxq30lz3k8rjqsusgr9an6',
        'addr_test1qq6jkv58lkkxhutxx4f2q6a46zq63cut60f0e2lf5jvkykllpxyhken3huvvgpdyylazljnd4g6k3t0cjtsq5gsul2hslzun5n', //typhon
        'addr_test1qqspc7gcc9mf4v63neuwjf8w0v9ddwts5gcqne5upfm77yjw7qfjqhfy533eyp4nsudyrz2ejvgd3ea9032he2tlhqmqa09rdw', //lace
        'addr_test1qr88yxfnc5fkqxple8lkxhmzrpfefh5k9489rc05qvre6fz57hn8sxtae66j0g859v2sgnkyyg6hk4k3fd0mrv6putesv7wd0x', //yoroi
        //gero
        'addr_test1qrrlnua5zkeh9y2nx6aaxynu0mnme02hsdyt5a65x4qwj0z9g6up9src0eqa2wze99fayehwr0886dehe4yxux6m5g9qyg6tsc', //vespr

        // Add more wallet addresses as needed
    ];

    // Function to fetch wallet balance
    const fetchWalletBalance = async (address) => {
        try {
            // Use Blockfrost API for Preprod network
            const response = await blockfrostApi.get(`/addresses/${address}`);

            // Extract balance information
            const amounts = response.data.amount || [];
            const adaAmount = amounts.find((amount) => amount.unit === 'lovelace' || amount.unit === '');

            const balanceLovelace = adaAmount ? parseInt(adaAmount.quantity) : 0;
            const balanceAda = balanceLovelace / 1_000_000; // Convert lovelace to ADA

            // Extract token balances
            const tokens = amounts
                .filter((amount) => amount.unit !== 'lovelace' && amount.unit !== '')
                .map((token) => ({
                    name: token.unit,
                    amount: parseInt(token.quantity),
                }));

            return {
                address,
                name: `Wallet ${address.slice(-6)}`, // Truncated address as name
                balance: balanceLovelace,
                ada: balanceAda,
                tokens,
            };
        } catch (err) {
            console.error(`Error fetching balance for ${address}:`, err);
            return {
                address,
                name: `Wallet ${address.slice(-6)}`,
                balance: 0,
                ada: 0,
                tokens: [],
                error: err.message,
            };
        }
    };

    // Fetch balances for all wallets
    const fetchAllWalletBalances = async () => {
        setLoading(true);
        setError(null);

        try {
            const balancePromises = walletAddresses.map(fetchWalletBalance);
            const results = await Promise.all(balancePromises);

            setWalletBalances(results);
        } catch (err) {
            setError('Failed to fetch wallet balances');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch balances on component mount and set up periodic refresh
    useEffect(() => {
        fetchAllWalletBalances();

        // Refresh every 5 minutes
        const intervalId = setInterval(fetchAllWalletBalances, 5 * 60 * 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Render wallet balances
    return (
        <div className="cardano-wallet-tracker">
            <h2>Cardano Preprod Wallet Balances</h2>

            {loading && <p>Loading wallet balances...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && (
                <div className="wallet-list">
                    {walletBalances.map((wallet) => (
                        <div key={wallet.address} className={`wallet-card ${wallet.error ? 'error' : ''}`}>
                            <h3>{wallet.name}</h3>
                            <p>Address: {wallet.address}</p>

                            {wallet.error ? (
                                <p className="wallet-error">Error: {wallet.error}</p>
                            ) : (
                                <>
                                    <p>Total Balance: {wallet.ada.toFixed(6)} ADA</p>

                                    {wallet.tokens.length > 0 && (
                                        <div className="tokens">
                                            <h4>Tokens:</h4>
                                            {wallet.tokens.map((token) => (
                                                <p key={token.name}>
                                                    {token.name}: {token.amount}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CardanoWalletTracker;

// Important Setup Notes:
// 1. Install dependencies:
// npm install axios
//
// 2. Get a Blockfrost Preprod project ID:
// - Sign up at https://blockfrost.io/
// - Create a Preprod project
// - Replace 'YOUR_BLOCKFROST_PREPROD_PROJECT_ID' with your actual project ID
//
// 3. If you're still experiencing CORS issues, you might need to:
// - Use a CORS proxy
// - Set up a backend proxy server
// - Use Blockfrost's official SDK
//
// 4. Verify your network connection
// 5. Check your Blockfrost API key and network settings
