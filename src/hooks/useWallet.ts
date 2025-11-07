import { useState, useEffect } from 'react';

interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: unknown) => {
        if (Array.isArray(accounts) && accounts.length > 0) {
          setWalletAddress(accounts[0] as string);
        } else {
          setWalletAddress('');
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        }) as string[];

        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet to use this feature!');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
  };

  return {
    walletAddress,
    isConnecting,
    connectWallet,
    disconnectWallet,
    isConnected: !!walletAddress,
  };
};
