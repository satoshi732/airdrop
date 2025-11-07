import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CryptoCard } from './components/CryptoCard';
import { useWallet } from './hooks/useWallet';
import { cryptocurrencies } from './data/cryptocurrencies';
import { airdropService } from './services/airdropService';
import { AirdropClaim } from './types/crypto';

function App() {
  const { walletAddress, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const [claimedAirdrops, setClaimedAirdrops] = useState<Set<string>>(new Set());
  const [loadingAirdrop, setLoadingAirdrop] = useState<string | null>(null);

  useEffect(() => {
    if (walletAddress) {
      loadUserClaims();
    } else {
      setClaimedAirdrops(new Set());
    }
  }, [walletAddress]);

  const loadUserClaims = async () => {
    if (!walletAddress) return;

    const claims = await airdropService.getUserClaims(walletAddress);
    const claimedIds = new Set(claims.map((claim: AirdropClaim) => claim.crypto_id));
    setClaimedAirdrops(claimedIds);
  };

  const handleAirdrop = async (cryptoId: string) => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    const crypto = cryptocurrencies.find((c) => c.id === cryptoId);
    if (!crypto) return;

    setLoadingAirdrop(cryptoId);

    const result = await airdropService.claimAirdrop(
      walletAddress,
      cryptoId,
      crypto.amount
    );

    if (result.success) {
      setClaimedAirdrops((prev) => new Set([...prev, cryptoId]));
      alert(`${result.message}\n\nYou received ${crypto.amount} ${crypto.symbol}!`);
    } else {
      alert(result.message);
    }

    setLoadingAirdrop(null);
  };

  const handleFollowTwitter = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        walletAddress={walletAddress}
        isConnecting={isConnecting}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Crypto Airdrop Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect your wallet and claim free cryptocurrency airdrops from 4 different tokens.
            Follow us on X (Twitter) to stay updated with the latest airdrop opportunities!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {cryptocurrencies.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
              onAirdrop={handleAirdrop}
              onFollowTwitter={handleFollowTwitter}
              isDisabled={!walletAddress}
              isClaimed={claimedAirdrops.has(crypto.id)}
              isLoading={loadingAirdrop === crypto.id}
            />
          ))}
        </div>

        {!walletAddress && (
          <div className="mt-12 text-center">
            <div className="inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-4">
              <p className="text-yellow-800 font-medium">
                👆 Connect your wallet to start claiming airdrops!
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Crypto Airdrop Platform - Claim your free tokens today!
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Connect your Web3 wallet to participate in our airdrops
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
