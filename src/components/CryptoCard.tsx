import { Coins, Twitter } from 'lucide-react';
import { Cryptocurrency } from '../types/crypto';

interface CryptoCardProps {
  crypto: Cryptocurrency;
  onAirdrop: (cryptoId: string) => void;
  onFollowTwitter: (url: string) => void;
  isDisabled: boolean;
  isClaimed: boolean;
  isLoading: boolean;
}

export const CryptoCard = ({
  crypto,
  onAirdrop,
  onFollowTwitter,
  isDisabled,
  isClaimed,
  isLoading,
}: CryptoCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={crypto.image}
          alt={crypto.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold">{crypto.name}</h3>
          <p className="text-sm opacity-90">{crypto.symbol}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800">
            <Coins className="w-8 h-8 text-yellow-500" />
            <span>{crypto.amount}</span>
            <span className="text-lg text-gray-500">{crypto.symbol}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Airdrop Amount</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onAirdrop(crypto.id)}
            disabled={isDisabled || isClaimed || isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isClaimed
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : isDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Processing...
              </span>
            ) : isClaimed ? (
              '✓ Claimed'
            ) : (
              'Claim Airdrop'
            )}
          </button>

          <button
            onClick={() => onFollowTwitter(crypto.twitterUrl)}
            className="w-full py-3 px-4 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Twitter className="w-5 h-5" />
            Follow on X
          </button>
        </div>
      </div>
    </div>
  );
};
