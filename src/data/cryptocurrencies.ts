import { Cryptocurrency } from '../types/crypto';

export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 0.001,
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
    twitterUrl: 'https://twitter.com/bitcoin',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 0.01,
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400',
    twitterUrl: 'https://twitter.com/ethereum',
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    amount: 0.5,
    image: 'https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=400',
    twitterUrl: 'https://twitter.com/solana',
  },
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT',
    amount: 10,
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
    twitterUrl: 'https://twitter.com/tether_to',
  },
];
