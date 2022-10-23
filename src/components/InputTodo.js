import React, { useState,useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
//export default
function InputTodo(){
    const [todo, setTodo] = useState({description: '', date: null, priority: ''});
    const [todoList, setTodos] = useState([]);
    const [open, setOpen] = useState(false);


    const addTodo = () => {
        setTodos([...todoList, todo]);//si on veut faire que le dernier soit le premier on met [description, ...todos]on inverse
        setTodo({description: '', date: null, priority: ''});
        console.log(todo.date);
    }
    const deleteTodo = ()=>{
        if(gridRef.current.getSelectedNodes().length >0){
            console.log(gridRef.current.getSelectedNodes()[0].childIndex);
            //setTodos(todoList.filter((todo, index)=> index !== row)); //ici on va faire une nouvelle list qui va exclure l'element à l'index et retourner une nouvelle liste avec les elements qui ne sont pas à cette index
            setTodos(todoList.filter((todo, index)=> index !== gridRef.current.getSelectedNodes()[0].childIndex));
            setOpen(true);
        }
        else{
            alert('Please select a row to delete');
        }
    };
    const [columnDefs] = useState([
        {field: 'description', sortable: true, filter: true, floatingFilter: true, animateRows: true},
        {field: 'date', sortable: true, filter: true, floatingFilter: true, animateRows: true},
        {field: 'priority', sortable: true, filter: true, 
            cellStyle: params => params.value === 'High' ? {color: 'red'} : params.value === 'Low' ? {color: 'green'} : params.value === 'Medium' ? {color: 'orange'} : {color: 'black'},
            floatingFilter: true, animateRows: true
        },
    ])
    const gridRef = useRef();

    return(
        <div>
            <br></br>
            <fieldset>
                <legend align="left"> Add todo : </legend>
                <Stack 
                    direction="row" 
                    spacing={2} 
                    alignItems="center"
                    justifyContent="center"
                >
                    <TextField 
                        variant='standard'
                        label= "Description"
                        value={todo.description}
                        onChange={event=>setTodo({...todo, description: event.target.value})}>    
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={todo.date}
                            onChange={(newValue)=>{
                                setTodo({...todo, date: newValue})
                                }
                            }
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        variant='standard'
                        label="Priority"
                        value={todo.priority}
                        onChange={event=>setTodo({...todo, priority: event.target.value})}>
                    </TextField>
                    <Button
                        size="medium"
                        startIcon={<AddIcon />}
                        variant="contained" 
                        onClick={addTodo}>
                         Add 
                    </Button>
                    <Button 
                        startIcon={<DeleteIcon />}
                        variant="contained"
                        color="error"
                        onClick={deleteTodo} 
                    >
                        Delete
                    </Button>
                </Stack>
            </fieldset>
            <div className='ag-theme-material' style={{width: '50%', height: 500, margin:'auto'}}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    rowData={todoList}
                    columnDefs={columnDefs}
                />
        </div>
        <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={()=>setOpen(false)}
        >
            <Alert severity="success">Todo deleted successfully</Alert>
        </Snackbar>

        </div>
    );
}

export default InputTodo // ici ou direct dans le titre de la fuction du componnet