import React, { useState, useRef} from "react";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS

 
function Table(props){
    const [columnDefs] = useState([
        {field: 'description', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true},
        {field: 'priority', sortable: true, filter: true, cellStyle: params => params.value === '1' ? {color: 'red'} : params.value === '3' ? {color: 'green'} : {color: 'orange'}},
    ])
    const gridRef = useRef();
    return(
        <div className='ag-theme-material' style={{width: '35%', height: 500, margin:'auto'}}>
            <AgGridReact
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                rowSelection="single"
                rowData={props.todoList}
                columnDefs={columnDefs}
            />
        </div>
    );
}
export default Table;