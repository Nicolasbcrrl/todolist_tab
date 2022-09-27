import React, { useState } from 'react';

//export default
function InputTodo(){
    const [todo, setTodo] = useState({description: '', date: ''});
    const [todoList, setTodos] = useState([]);
    const addTodo = () => {
        setTodos([...todoList, todo]);//si on veut faire que le dernier soit le premier on met [description, ...todos]on inverse
        setTodo({description: '', date: ''});
    }
    const deleteTodo = (row)=>{
        console.log("Button pressed");
        setTodos(todoList.filter((todo, index)=> index !== row)); //ici on va faire une nouvelle list qui va exclure l'element à l'index et retourner une nouvelle liste avec les elements qui ne sont pas à cette index
    };

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
                <button 
                    onClick={addTodo}>
                    Add
                </button>
            </fieldset>
            <table className='Text'>
                <tr>
                    <th>Date</th><th>Description</th>
                </tr>
                <tbody>
                    {todoList.map((todos, index) => 
                        <tr className='TableTr' 
                            key={index}>
                            <td>{todos.date}</td>
                            <td>{todos.description}</td>
                            <td><button onClick = {()=>{deleteTodo(index)}}> Delete </button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default InputTodo // ici ou direct dans le titre de la fuction du componnet