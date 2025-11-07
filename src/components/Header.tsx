import { Wallet } from 'lucide-react';

interface HeaderProps {
  walletAddress: string;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Header = ({
  walletAddress,
  isConnecting,
  onConnect,
  onDisconnect,
}: HeaderProps) => {
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Crypto Airdrop</h1>
              <p className="text-sm text-gray-500">Claim Your Free Tokens</p>
            </div>
          </div>

          <div>
            {walletAddress ? (
              <div className="flex items-center gap-3">
                <div className="bg-green-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-green-700 font-mono">
                    {shortenAddress(walletAddress)}
                  </p>
                </div>
                <button
                  onClick={onDisconnect}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-200"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <Wallet className="w-5 h-5" />
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
