import React, { useState,useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS

//export default
function InputTodo(){
    const [todo, setTodo] = useState({description: '', date: '', priority: ''});
    const [todoList, setTodos] = useState([]);
    const addTodo = () => {
        setTodos([...todoList, todo]);//si on veut faire que le dernier soit le premier on met [description, ...todos]on inverse
        setTodo({description: '', date: '', priority: ''});
    }
    const deleteTodo = ()=>{
        if(gridRef.current.getSelectedNodes().length >0){
            console.log(gridRef.current.getSelectedNodes()[0].childIndex);
            //setTodos(todoList.filter((todo, index)=> index !== row)); //ici on va faire une nouvelle list qui va exclure l'element à l'index et retourner une nouvelle liste avec les elements qui ne sont pas à cette index
            setTodos(todoList.filter((todo, index)=> index !== gridRef.current.getSelectedNodes()[0].childIndex));
        }
        else{
            alert('Please select a row to delete');
        }
    };
    const [columnDefs] = useState([
        {field: 'description', sortable: true, filter: true, floatingFilter: true, animateRows: true},
        {field: 'date', sortable: true, filter: true, floatingFilter: true, animateRows: true},
        {field: 'priority', sortable: true, filter: true, 
            cellStyle: params => params.value === 'High' ? {color: 'red'} : params.value === 'Low' ? {color: 'green'} : {color: 'orange'}, 
            floatingFilter: true, animateRows: true
        },
    ])
    const gridRef = useRef();

    return(
        <div>
            <div className='Title'>
                <h1>Simple Todolist</h1>
            </div>
            <br></br>
            <fieldset>
                <legend align="left"> Add todo : </legend>
                <label> Description : </label>
                <input 
                    type="text" 
                    value={todo.description}
                    onChange={event=>setTodo({...todo, description: event.target.value})}>    
                </input>
                <label> Date : </label>
                <input 
                    type="date"
                    value={todo.date}
                    onChange={event=>setTodo({...todo, date: event.target.value})}>
                </input>
                <label> Priority : </label>
                <input
                    type="text"
                    value={todo.priority}
                    onChange={event=>setTodo({...todo, priority: event.target.value})}>
                </input>
                <button 
                    onClick={addTodo}>
                    Add
                </button>
                <button onClick={deleteTodo} >Delete</button>
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
        </div>
    );
}

export default InputTodo // ici ou direct dans le titre de la fuction du componnet