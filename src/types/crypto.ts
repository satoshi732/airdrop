export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  image: string;
  twitterUrl: string;
}

export interface AirdropClaim {
  id: string;
  wallet_address: string;
  crypto_id: string;
  amount: number;
  claimed_at: string;
  twitter_followed: boolean;
}
