import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Twitter, AttachMoney } from '@mui/icons-material';

export const CryptoCard = ({
  crypto,
  onAirdrop,
  onFollowTwitter,
  isDisabled,
  isClaimed,
  isLoading,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={crypto.image}
          alt={crypto.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            p: 2,
            color: 'white',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {crypto.name}
          </Typography>
          <Typography variant="caption">{crypto.symbol}</Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 3,
            mt: 2,
          }}
        >
          <AttachMoney sx={{ fontSize: 32, color: '#ffc107' }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            {crypto.amount}
          </Typography>
          <Typography variant="body1" sx={{ color: '#999', fontWeight: 'bold' }}>
            {crypto.symbol}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'center', color: '#999', mb: 2 }}
        >
          Airdrop Amount
        </Typography>
      </CardContent>

      <CardContent sx={{ pt: 0 }}>
        <Stack spacing={2}>
          <Button
            onClick={() => onAirdrop(crypto.id)}
            disabled={isDisabled || isClaimed || isLoading}
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              background: isClaimed
                ? '#4caf50'
                : isDisabled
                ? '#ccc'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                background: isClaimed
                  ? '#4caf50'
                  : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              },
              '&:disabled': {
                opacity: isClaimed ? 1 : 0.6,
              },
            }}
          >
            {isLoading ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress size={20} sx={{ color: 'white' }} />
                <span>Processing...</span>
              </Stack>
            ) : isClaimed ? (
              '✓ Claimed'
            ) : (
              'Claim Airdrop'
            )}
          </Button>

          <Button
            onClick={() => onFollowTwitter(crypto.twitterUrl)}
            fullWidth
            variant="contained"
            startIcon={<Twitter />}
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              background: '#000',
              color: 'white',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                background: '#333',
              },
            }}
          >
            Follow on X
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
