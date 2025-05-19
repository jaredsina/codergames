import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Team } from '../types/index.ts';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      const parsedTeams = JSON.parse(storedTeams);
      // Sort teams by score in descending order
      const sortedTeams = parsedTeams.sort((a: Team, b: Team) => b.score - a.score);
      setTeams(sortedTeams);
    }
  }, []);

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return '#FFD700'; // Gold
      case 1:
        return '#C0C0C0'; // Silver
      case 2:
        return '#CD7F32'; // Bronze
      default:
        return '#E0E0E0';
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        width: '100%',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            color="primary"
            sx={{ fontWeight: 'bold' }}
          >
            Final Results
          </Typography>

          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {teams.map((team, index) => (
              <ListItem
                key={team.id}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: index < 3 ? 'action.hover' : 'transparent',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: getMedalColor(index) }}>
                    {index < 3 ? <EmojiEventsIcon /> : index + 1}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={team.name}
                  secondary={`Score: ${team.score} points`}
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
                {index < 3 && (
                  <Typography variant="h6" color="primary">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </Typography>
                )}
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/')}
              sx={{ 
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Play Again
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Leaderboard; 