import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import myTheme from '../MaterialUI/theme';

export default function ButtonAppBar() {
  return (
    <ThemeProvider theme={myTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="absolute">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white" }}>
              Jokes.IT
            </Typography>

            <Link to="/">
              <Button sx={{color: "white",}}>home</Button>
            </Link>
            <Link to="/saved">
              <Button sx={{color: "white",}}>saved</Button>
            </Link>
            
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
