import './App.css';
import InputTodo from './components/InputTodo';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <div className="App">
      <Box>
          <Box>
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label = "Home"/>
              <Tab label = "Todos"/>
            </Tabs>
          </Box>
          <Box sx={{ padding: 2 }}>
            {tabIndex === 0 && (
              <Box>
                <Typography>Welcome to my TodoList</Typography>
              </Box>
            )}
            {tabIndex === 1 && (
              <Box>
                <AppBar
                  position="static"
                > 
                  <Toolbar>
                    <Typography variant="h6">
                     My Todo List
                    </Typography> 
                  </Toolbar>
                </AppBar>
                <InputTodo/>
              </Box>
            )}
          </Box>
      </Box>
    </div>
  );
}

export default App;
