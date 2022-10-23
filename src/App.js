import './App.css';
import InputTodo from './components/InputTodo';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
