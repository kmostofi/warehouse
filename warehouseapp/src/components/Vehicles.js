import react, { useEffect, useState } from "react";

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

//import { GridEvents, useGridApiRef, DataGridPro } from '@mui/x-data-grid-pro';
import Button from '@mui/material/Button';

import {DataGrid}  from '@mui/x-data-grid';
import { keyboard } from "@testing-library/user-event/dist/keyboard";

function Vehicles() {
  
  //const [whouse, setWarehouseData] = useState([])
  const [data, setData] = useState([])

  const handleClick = (event, value) => {
    //console.log (event.currentTarget.id);
    const _data = event.currentTarget.id;
    var _value = _data.split(/[_]+/)
    
    //console.log(data)
    //console.log(_value)
    var _loc = data.filter(function(item){
      return item.warehouse === _value[2];
      })
      
      alert(_loc[0].make + " (" + _loc[0].model + ")" + " is at " + 
      _loc[0].warehouse + " - " + _loc[0].location)
      
     // console.log(_loc[0])
  };

   
    const columns = [
      { field: 'id', headerName: 'ID', width: 60 },
      { field: 'make', headerName: 'Make', width: 150 },
      { field: 'model', headerName: 'Model', width: 150 },
      { field: 'yearModel', headerName: 'Year', width: 150 },
      { field: 'price', headerName: 'price', width: 150 },
      { field: 'licensed', headerName: 'Licensed', width: 100 },
      { field: 'dateAdded', headerName: 'Date', width: 150 },
      { field: 'warehouseid', headerName: 'Location ID', width: 100 },
      { field: 'location', headerName: '', width: 0, hide: true },
      { field: 'warehouse', headerName: '', width: 0, hide: true },
      {
        field: "Warehouse", width: 150,
        renderCell: (cellValues) => {
         // console.log(cellValues);
          return (
            <Button
            id={"item_" + cellValues.id + "_" +  cellValues.row.warehouse}
           
            variant="contained"
             
              disabled={
                cellValues.row.licensed ? false : true
              }
              onClick={(event) => {
                handleClick(event, cellValues);
               // console.log(cellValues);
              // <Alert severity="info">{whouse.field.cars}</Alert>
              }}
            >
              Location

            </Button>
          );
        }
      },
      
    ];

    useEffect(()=>{
        fetch("http://localhost:5000/api/Vehicle")
        .then(resp=>resp.json())
        .then(resp=>setData(resp))
    },[])
 
   /* react.useEffect(()=>{
      fetch("http://localhost:5000/api/Warehouse")
      .then(resp=>resp.json())
      .then(resp=>setWarehouseData(resp))
  },[])
    console.log(data);*/

    return (

      <div style={{ height: 900, width: '100%', backgroundColor: 'white' }}>
      <DataGrid rows={data} columns={columns} pageSize={25}  

        isRowSelectable={(params) => params.row.licensed === true}
      // checkboxSelection
       sx={{
        boxShadow: 2,
        border: 2,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
      }}
    />
  </div>
      );

}
    export default Vehicles;
    