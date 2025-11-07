import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
  Alert,
} from '@mui/material';
import { Header } from './components/Header';
import { CryptoCard } from './components/CryptoCard';
import { useWallet } from './hooks/useWallet';
import { cryptocurrencies } from './data/cryptocurrencies';
import { airdropService } from './services/airdropService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const { walletAddress, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const [claimedAirdrops, setClaimedAirdrops] = useState(new Set());
  const [loadingAirdrop, setLoadingAirdrop] = useState(null);

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
    const claimedIds = new Set(claims.map((claim) => claim.crypto_id));
    setClaimedAirdrops(claimedIds);
  };

  const handleAirdrop = async (cryptoId) => {
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

  const handleFollowTwitter = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Header
          walletAddress={walletAddress}
          isConnecting={isConnecting}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />

        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome to Crypto Airdrop Platform
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#555',
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 500,
              }}
            >
              Connect your wallet and claim free cryptocurrency airdrops from 4 different tokens.
              Follow us on X (Twitter) to stay updated with the latest airdrop opportunities!
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ mb: 4 }}>
            {cryptocurrencies.map((crypto) => (
              <Grid item xs={12} sm={6} md={3} key={crypto.id}>
                <CryptoCard
                  crypto={crypto}
                  onAirdrop={handleAirdrop}
                  onFollowTwitter={handleFollowTwitter}
                  isDisabled={!walletAddress}
                  isClaimed={claimedAirdrops.has(crypto.id)}
                  isLoading={loadingAirdrop === crypto.id}
                />
              </Grid>
            ))}
          </Grid>

          {!walletAddress && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Alert
                severity="warning"
                sx={{
                  maxWidth: '500px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: 2,
                }}
              >
                👆 Connect your wallet to start claiming airdrops!
              </Alert>
            </Box>
          )}

          {walletAddress && claimedAirdrops.size > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Alert
                severity="success"
                sx={{
                  maxWidth: '500px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: 2,
                }}
              >
                You have claimed {claimedAirdrops.size} airdrop{claimedAirdrops.size > 1 ? 's' : ''}!
              </Alert>
            </Box>
          )}
        </Container>

        <Box
          component="footer"
          sx={{
            background: 'white',
            borderTop: '1px solid #e0e0e0',
            mt: 8,
            py: 4,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', color: '#666' }}>
              <Typography variant="body2">
                Crypto Airdrop Platform - Claim your free tokens today!
              </Typography>
              <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 1 }}>
                Connect your Web3 wallet to participate in our airdrops
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
