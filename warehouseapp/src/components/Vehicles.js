import react, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import {DataGrid}  from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


function Vehicles() {
//#region Properties
  // Inject Corse mode to the header
  var opts = {
    headers: {
      'mode':'cors'
    }
  }

  // Properties for data array
  const [whouse, setWarehouseData] = useState([]) // Warehouse data
  const [data, setData] = useState([]) // Vehicles data
  const [rowPurchase, setPurchaseData] = useState([])  // Vehicle purchase collection
//#endregion

  //#region Button Click methods
  // Method to display the location of the selected car
  const handleClick = (event, value) => {
    //console.log (event.currentTarget.id);
    const _data = event.currentTarget.id;
    var _value = _data.split(/[_]+/)
    
    // filter warehouse array 
    var _locw = whouse.filter(function(item){
      return item.id === parseInt(_value[2]);
      })
      
      // filter warehouse array
      var _car = data.filter(function(item){
        return item.id === parseInt(_value[1]);
        })

      alert(_car[0].make + " (" + _car[0].model + ")" + " is at " + 
      _locw[0].name + " - " + _locw[0].carsLocation)
  };

  // Method for purchasing a car
  const handlePurchaseClick = (event, value) => {
    const _data = event.currentTarget.id;
    var _value = _data.split(/[_]+/)

      var _car = data.filter(function(item){
        return item.id === parseInt(_value[1]);
        })
     
        //Create an array and push it to rowPurchase array collection
      rowPurchase.push(createRow(_car[0].make, _car[0].model, _car[0].price));

      // Reset the dataset to refresh/render the UI Table
      setPurchaseData(JSON.parse(JSON.stringify(rowPurchase)));

  };
//#endregion

  //#region Data Grid Setup
   // Grid column setup
    const columns = [
      { field: 'id', headerName: 'ID', width: 0, hide: true },
      { field: 'make', headerName: 'Make', width: 110 },
      { field: 'model', headerName: 'Model', width: 120 },
      { field: 'yearModel', headerName: 'Year', width: 80 },
      { field: 'price', headerName: 'Price ($)', width: 100 },
      { field: 'licensed', headerName: 'Licensed', width: 0, hide: true },
      { field: 'dateAdded', headerName: 'Date', width: 100 },
      { field: 'warehouseid', headerName: 'Location ID', width: 0, hide: true },
      { field: 'location', headerName: '', width: 0, hide: true },
      { field: 'warehouse', headerName: '', width: 0, hide: true },
      {// buttons for viewing the location
        field: "Warehouse", width: 100,
        renderCell: (cellValues) => {
         // console.log(cellValues);
          return (
            <Button color="success"
            id={"item_" + cellValues.id + "_" +  cellValues.row.warehouseid}
           
            variant="contained"
             
              disabled={
                cellValues.row.licensed ? false : true
              }
              onClick={(event) => {
                handleClick(event, cellValues);
               // console.log(cellValues);
              }}
            >
              View
            </Button>
          );
        }
      },
      {// button for purchasing the car
        field: "Purchase", width: 100,
        renderCell: (cellValues) => {
         // console.log(cellValues);
          return (
            <Button color="error"
            id={"item_" + cellValues.id + "_" +  cellValues.row.warehouseid}
           
            variant="contained"
             
              disabled={
                cellValues.row.licensed ? false : true
              }
              onClick={(event) => {
                handlePurchaseClick(event, cellValues);
               
              }}
            >
              $
            </Button>
          );
        }
      },
    ];
    //#endregion

//#region Calling API data
    // Fetch Vehicle data
    useEffect(()=>{
        fetch("http://localhost:5000/api/Vehicle", opts)
        .then(resp=>resp.json())
        .then(resp=>setData(resp))
    },[]);
 
    //Fetch warehouse data
   react.useEffect(()=>{
      fetch("http://localhost:5000/api/Warehouse", opts)
      .then(resp=>resp.json())
      .then(resp=>setWarehouseData(resp))
  },[]);
   // console.log(data);
//#endregion

   //#region purchasing a car functions
   const TAX_RATE = 0.07;

   function ccyFormat(num) {
     return `${num.toFixed(2)}`;
   }
   // Defaulted value for quantity is 1
   // Unit is the unit price
   function priceRow(qty, unit) {
     return qty * unit;
   }
   
   // Return an array object
   function createRow(make, model, cost) {
     const price = priceRow(1, cost);
     return { make, model, price };
   }
   
   const invoiceSubtotal = subtotal(rowPurchase);
   const invoiceTaxes = TAX_RATE * invoiceSubtotal;
   const invoiceTotal = invoiceTaxes + invoiceSubtotal;
   
   function subtotal(items) {
     return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
   }   
    //#endregion

    //#region UI controls
    return (

     // Two columns grid
      <Grid container rowSpacing={1} columnSpacing={2} paddingLeft={1} paddingRight={1} paddingBottom={1} paddingTop={1}>
        <Grid item xs={6}>
         
          <div style={{ height: '100vh', width: '100%', backgroundColor: 'white' }}>
          <DataGrid rows={data} columns={columns} pageSize={10}  
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
         
        </Grid>
        <Grid item xs={6} >
          
          <div style={{ height: '100vh', width: '100%', backgroundColor: 'white', padding:'5'}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Make</TableCell>
                  <TableCell align="right">Model</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowPurchase.map((row,i) => (
                  <TableRow key={i}>
                    <TableCell>{row.make}</TableCell>
                    <TableCell align="right">{row.model}</TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                  </TableRow>
                ))}
      
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
            </div>
          
        </Grid>
      </Grid>

      );
//#endregion
     
}
    export default Vehicles;
    