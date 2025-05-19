import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Divider,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import CasinoIcon from '@mui/icons-material/Casino';
import BadgeIcon from '@mui/icons-material/Badge';
import LoopIcon from '@mui/icons-material/Loop';
import { Team } from '../types/index.ts';

type Category = 'Python' | 'Scratch' | 'HTML/CSS/Javascript';

const Home = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [newMemberName, setNewMemberName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Python');

  const handleAddTeam = () => {
    if (teamName.trim()) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: teamName.trim(),
        score: 0,
        members: [],
      };
      setTeams([...teams, newTeam]);
      setTeamName('');
    }
  };

  const handleRemoveTeam = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const handleStartGame = () => {
    if (teams.length >= 1) {
      // Store teams and selected category in localStorage for persistence
      localStorage.setItem('teams', JSON.stringify(teams));
      localStorage.setItem('selectedCategory', selectedCategory);
      navigate('/game');
    }
  };

  const handleExpandTeam = (id: string) => {
    setExpandedTeam(expandedTeam === id ? null : id);
  };

  const handleAddMember = (teamId: string) => {
    if (newMemberName.trim()) {
      setTeams(teams.map(team => {
        if (team.id === teamId) {
          return {
            ...team,
            members: [...team.members, newMemberName.trim()]
          };
        }
        return team;
      }));
      setNewMemberName('');
    }
  };

  const handleRemoveMember = (teamId: string, memberIndex: number) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        const updatedMembers = [...team.members];
        updatedMembers.splice(memberIndex, 1);
        return {
          ...team,
          members: updatedMembers
        };
      }
      return team;
    }));
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
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
            CoderGames
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Register Teams
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTeam()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddTeam}
                disabled={!teamName.trim()}
                sx={{ 
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                Add
              </Button>
            </Box>
            
            <List>
              {teams.map((team) => (
                <React.Fragment key={team.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        onClick={() => handleRemoveTeam(team.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    sx={{ 
                      cursor: 'pointer',
                      bgcolor: expandedTeam === team.id ? 'action.hover' : 'transparent',
                      borderRadius: 1,
                      mb: 1,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                    onClick={() => handleExpandTeam(team.id)}
                  >
                    <ListItemText 
                      primary={team.name} 
                      secondary={`${team.members.length} members`}
                      primaryTypographyProps={{ color: 'text.primary' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    {expandedTeam === team.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItem>
                  
                  <Collapse in={expandedTeam === team.id} timeout="auto" unmountOnExit>
                    <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
                      <Divider sx={{ my: 1 }} />
                      
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, mt: 2 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Member Name"
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddMember(team.id)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<PersonAddIcon />}
                          onClick={() => handleAddMember(team.id)}
                          disabled={!newMemberName.trim()}
                          sx={{ 
                            borderColor: 'secondary.main',
                            color: 'secondary.main',
                            '&:hover': {
                              borderColor: 'secondary.dark',
                              bgcolor: 'secondary.light',
                            },
                          }}
                        >
                          Add
                        </Button>
                      </Box>
                      
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {team.members.map((member: string, index: number) => (
                          <Chip
                            key={index}
                            label={member}
                            onDelete={() => handleRemoveMember(team.id, index)}
                            sx={{ 
                              mb: 1,
                              bgcolor: 'secondary.light',
                              color: 'text.primary',
                              '& .MuiChip-deleteIcon': {
                                color: 'text.secondary',
                                '&:hover': {
                                  color: 'error.main',
                                },
                              },
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Select Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Select Category"
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
              >
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="Scratch">Scratch</MenuItem>
                <MenuItem value="HTML/CSS/Javascript">HTML/CSS/Javascript</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleStartGame}
              disabled={teams.length < 1}
              sx={{ 
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&:disabled': {
                  bgcolor: 'action.disabledBackground',
                },
              }}
            >
              Start Game
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              size="large"
              onClick={() => navigate('/leaderboard')}
              sx={{ 
                borderColor: 'secondary.main',
                color: 'secondary.main',
                '&:hover': {
                  borderColor: 'secondary.dark',
                  bgcolor: 'secondary.light',
                },
              }}
            >
              View Leaderboard
            </Button>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom color="text.primary">
            Game Rules
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Each team must have at least 1 member." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BadgeIcon />
              </ListItemIcon>
              <ListItemText primary="Each team must have a unique team name." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LoopIcon />
              </ListItemIcon>
              <ListItemText primary="The game is split into rounds. Each round has a set of questions." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CasinoIcon />
              </ListItemIcon>
              <ListItemText primary="Before each round, each team will roll a dice to determine their difficulty level." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CasinoIcon />
              </ListItemIcon>
              <ListItemText primary="Before each round, each team will roll a dice to determine if they can get coach help." secondary="If the team rolls a 1, they can get coach help. That's a 10% chance." />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home; 