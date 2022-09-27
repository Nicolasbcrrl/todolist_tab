import React from "react";
 
function Table(props){
    return(
        <div>
            <table className='Text'>
                <tr>
                    <th>Date</th><th>Description</th>
                </tr>
                <tbody>
                    {props.todoList.map((todos, index) => 
                        <tr className='TableTr' 
                            key={index}>
                            <td>{todos.date}</td>
                            <td>{todos.description}</td>
                            <td><button onClick={()=>props.deleteTodo(index)}> Delete </button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
}
export default Table;