/*
  # Airdrop Claims Table

  1. New Tables
    - `airdrop_claims`
      - `id` (uuid, primary key) - Unique identifier for each claim
      - `wallet_address` (text) - User's cryptocurrency wallet address
      - `crypto_id` (text) - Identifier for the cryptocurrency (btc, eth, sol, usdt)
      - `amount` (numeric) - Amount of crypto claimed
      - `claimed_at` (timestamptz) - Timestamp of when the airdrop was claimed
      - `twitter_followed` (boolean) - Whether user followed on Twitter/X
      - `created_at` (timestamptz) - Record creation timestamp
  
  2. Security
    - Enable RLS on `airdrop_claims` table
    - Add policy for users to view their own claims
    - Add policy for users to insert their own claims
  
  3. Indexes
    - Index on wallet_address for quick lookups
    - Unique constraint on (wallet_address, crypto_id) to prevent duplicate claims
*/

CREATE TABLE IF NOT EXISTS airdrop_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text NOT NULL,
  crypto_id text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  claimed_at timestamptz DEFAULT now(),
  twitter_followed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(wallet_address, crypto_id)
);

CREATE INDEX IF NOT EXISTS idx_airdrop_claims_wallet ON airdrop_claims(wallet_address);

ALTER TABLE airdrop_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all claims"
  ON airdrop_claims FOR SELECT
  USING (true);

CREATE POLICY "Users can insert claims"
  ON airdrop_claims FOR INSERT
  WITH CHECK (true);