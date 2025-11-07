import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Stack,
  Typography,
  Chip,
} from '@mui/material';
import { Wallet as WalletIcon } from '@mui/icons-material';

export const Header = ({
  walletAddress,
  isConnecting,
  onConnect,
  onDisconnect,
}) => {
  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                p: 1.5,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WalletIcon sx={{ color: 'white', fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
                Crypto Airdrop
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Claim Your Free Tokens
              </Typography>
            </Box>
          </Stack>

          <Box>
            {walletAddress ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label={shortenAddress(walletAddress)}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                  }}
                />
                <Button
                  onClick={onDisconnect}
                  variant="contained"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  Disconnect
                </Button>
              </Stack>
            ) : (
              <Button
                onClick={onConnect}
                disabled={isConnecting}
                variant="contained"
                sx={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#667eea',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'white',
                  },
                  '&:disabled': {
                    opacity: 0.7,
                  },
                  startIcon: <WalletIcon />,
                }}
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
