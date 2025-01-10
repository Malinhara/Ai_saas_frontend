import { Connection } from '@solana/web3.js';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';

window.Buffer = Buffer; // Global Buffer setup

const PhantomWallet = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const connection = new Connection('https://api.devnet.solana.com', 'confirmed'); // Solana Devnet

  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
      if (provider?.isPhantom) return provider;
    }
    return null;
  };

  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      provider.on('connect', (publicKey) => {
        setWalletAddress(publicKey.toString());
        setStatus('Connected');
      });
      provider.on('disconnect', () => {
        setWalletAddress('');
        setStatus('Disconnected');
      });
      if (provider.isConnected) {
        setWalletAddress(provider.publicKey.toString());
        setStatus('Connected');
      }
    }
  }, []);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const provider = getProvider();
      if (!provider) {
        window.open('https://phantom.app/', '_blank');
        setStatus('Please install Phantom wallet');
        return;
      }
      await provider.connect();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setStatus('Connection failed');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      const provider = getProvider();
      if (provider) {
        await provider.disconnect();
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      setStatus('Disconnection failed');
    }
  };

  return (
    <div>
      <div className="w-half p-4 rounded-xl">
        {walletAddress ? (
          <div className="space-y-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-md text-gray-400">Connected Address:</p>
              <p className="text-white font-mono text-sm break-all">{walletAddress}</p>
            </div>

            <button
              onClick={disconnectWallet}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-4"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className={`w-28 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4 ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isConnecting ? 'Connecting...' : 'Phantom'}
          </button>
        )}

        {status && <p className="mt-4 text-sm text-center text-gray-400">{status}</p>}
      </div>
    </div>
  );
};

export default PhantomWallet;
