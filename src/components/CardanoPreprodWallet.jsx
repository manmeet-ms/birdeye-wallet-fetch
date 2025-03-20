import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardanoPreprodWallet = ({ walletAddress }) => {
  const [walletData, setWalletData] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // CardanoScan Preprod API endpoints
  const BASE_URL = 'https://preprod.cardanoscan.io/api';

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!walletAddress) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch wallet balance and information
        const walletResponse = await axios.get(`${BASE_URL}/addresses/${walletAddress}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "apiKey":"044803fa-3229-425c-aa12-b895a4b610c6"
          }
        });
        
        setWalletData(walletResponse.data);
        
        // Fetch assets held by the wallet
        const assetsResponse = await axios.get(`${BASE_URL}/addresses/${walletAddress}/assets`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        setAssets(assetsResponse.data.assets || []);
      } catch (err) {
        console.error('Error fetching wallet data:', err);
        setError('Failed to fetch wallet data from CardanoScan preprod. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [walletAddress]);

  // Format ADA amount (lovelace to ADA)
  const formatAda = (lovelace) => {
    return (parseInt(lovelace) / 1000000).toLocaleString('en-US', {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6
    });
  };

  return (
    <div className="cardano-preprod-wallet">
      <h2>Cardano Preprod Wallet</h2>
      <p className="text-sm text-gray-500">Network: Preprod</p>
      
      {loading && <p>Loading wallet data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && walletData && (
        <div className="wallet-info mt-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Wallet Balance</h3>
            <p className="text-2xl font-bold text-blue-400">{formatAda(walletData.balance || 0)} ₳</p>
            
            <div className="mt-4">
              <p><span className="text-gray-400">Address:</span> {walletAddress}</p>
              <p><span className="text-gray-400">Transactions:</span> {walletData.transactions || 0}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-medium mb-2">Assets ({assets.length})</h3>
            
            {assets.length === 0 ? (
              <p>No assets found in this wallet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assets.map((asset) => (
                  <div key={asset.fingerprint} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium">{asset.name || 'Unnamed Asset'}</h4>
                    <p className="text-sm text-gray-400 mb-2">Policy: {asset.policy_id.substring(0, 8)}...{asset.policy_id.substring(asset.policy_id.length - 8)}</p>
                    <p>Quantity: {asset.quantity}</p>
                    {asset.metadata && asset.metadata.description && (
                      <p className="text-sm mt-2">{asset.metadata.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardanoPreprodWallet;

// Usage example:
// <CardanoPreprodWallet walletAddress="addr_test1..." />