import { supabase } from '../lib/supabase';

export const airdropService = {
  async claimAirdrop(walletAddress, cryptoId, amount) {
    try {
      const { error } = await supabase.from('airdrop_claims').insert({
        wallet_address: walletAddress,
        crypto_id: cryptoId,
        amount: amount,
        twitter_followed: false,
      });

      if (error) {
        if (error.code === '23505') {
          return {
            success: false,
            message: 'You have already claimed this airdrop!',
          };
        }
        throw error;
      }

      return {
        success: true,
        message: 'Airdrop claimed successfully!',
      };
    } catch (error) {
      console.error('Error claiming airdrop:', error);
      return {
        success: false,
        message: 'Failed to claim airdrop. Please try again.',
      };
    }
  },

  async getUserClaims(walletAddress) {
    try {
      const { data, error } = await supabase
        .from('airdrop_claims')
        .select('*')
        .eq('wallet_address', walletAddress);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching claims:', error);
      return [];
    }
  },

  async getAllClaims() {
    try {
      const { data, error } = await supabase
        .from('airdrop_claims')
        .select('*')
        .order('claimed_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching all claims:', error);
      return [];
    }
  },
};
