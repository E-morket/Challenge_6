import * as React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import {
  Alert, Button, Grid, TextField,Box, Paper, TableRow, TableHead, TableContainer,
  TableCell, TableBody, Table, 
}from '@mui/material'



const TableDense = () => {
const [data, setData] = useState([])
const [marca, setMarca] = useState('')
const[fechaDeFabricacion, setFechaDeFabricacion] = useState('')
const[valor, setValor] =useState('')
const[cantidad, setCantidad] = useState('')
const [idBrands, setIdBrands] = useState('')
const [showForm, setShowForm] = useState(true)
const [showAlert, setShowAlert] = useState(false)
const [showAlert1, setShowAlert1] = useState(false)
const [showAlert2, setShowAlert2] = useState(false)
const [showButtonSave, setShowButtonSave] = useState(true)
const baseURL = 'http://localhost:3003/buycars'

const showFormData = () => {
  setShowForm(false)
}

const onChangeMarca = (event) => { setMarca(event.target.value)}
const onChangeFechaDeFabricacion = (event) => { setFechaDeFabricacion(event.target.value)}
const onChangeValor = (event) => { setValor(event.target.value)}
const onChangeCantidad = (event) => { setCantidad(event.target.value)}

const save = () => {
  if (marca === '' || fechaDeFabricacion === '' || valor === '' || cantidad === '') {
    setShowAlert(true)
    } else {
      if (!showForm) {
        axios.post('http://localhost:3003/addbrands', {
          marca: marca,
          fechaDeFabricacion: fechaDeFabricacion,
          valor:valor,
          cantidad: cantidad
        }).then((reponse) => {
          setMarca('')
          setValor('')
          setFechaDeFabricacion('')
          setIdBrands('')
          setShowForm(true)
          setShowAlert(false)
          setShowAlert1(false)
          setShowAlert2(true)
          setShowButtonSave(true)
          getData()
        })
      }
    }
}

const getData = async () => {
    try {
        const {data: response }= await axios.get(baseURL)
        setData(response)
    } catch (error){
        console.log('Error', error)
    }
}

const edit = ((obj) => {
  setShowForm(false)
  setShowButtonSave(false)
  setMarca(obj.marca)
  setFechaDeFabricacion(obj.fechaDeFabricacion)
  setValor(obj.valor)
  setCantidad(obj.cantidad)
  setIdBrands(obj.idbrands)
})

const update = (() => {
  if ( marca === '' ||fechaDeFabricacion === '' || valor === '' || cantidad === '') {
    setShowAlert(true)
  } else {
    axios.put(`http://localhost:3003/update/${idBrands}`, {
        
      marca:  marca,
      fechaDeFabricacion: fechaDeFabricacion,
      valor: valor,
      cantidad: cantidad
    }).then(() => {
      setMarca('')
      setCantidad('')
      setFechaDeFabricacion('')
      setValor('')
      setIdBrands('')
      setShowForm(true)
      setShowAlert(false)
      setShowAlert1(true)
      setShowAlert2(false)
      setShowButtonSave(true)
      getData()
      
    })
    
  }
})

const cancel = (() => {
  setShowForm(true)
  setMarca('')
  setFechaDeFabricacion('')
  setValor('')
  setCantidad('')
  setIdBrands('')
  setShowButtonSave(true)
  setShowAlert(false)
  setShowAlert1(false)
  setShowAlert2(false)
  

})



useEffect(() =>{
    getData()
}, [])


  return (
    <Box sx={{flexGrow: 1}}variant="outlined" >
      {
        !showForm &&
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {
              showAlert &&
                <Alert severity="warning">Debes de llenar todos los campos</Alert>
            }
          </Grid>
          <Grid sx={{ mt:4}} item xs={3} >
            <TextField 
              value={marca}
              
              onChange={onChangeMarca}
              id="outlined-basic"
              
              label="Marca del Vehiculo"
              variant="outlined" />
          </Grid>
          <Grid sx={{ mt:4}} item xs={3}>
            <TextField
              value={fechaDeFabricacion}
          
              onChange={onChangeFechaDeFabricacion}
              id="outlined-basic"
              label="Modelo"
              variant="outlined" />
          </Grid>
          <Grid sx={{ mt:4}} item xs={3}>
            <TextField
              value={valor}
            
              onChange={onChangeValor}
              id="outlined-basic"
              label="Precio"
              variant="outlined" />
          </Grid>
          <Grid sx={{ mt:4}} item xs={3}>
            <TextField
              value={cantidad}
              
              onChange={onChangeCantidad}
              id="outlined-basic"
              label="Cantidad"
              variant="outlined" />
          </Grid>
       
          {
            showButtonSave ?
           
            <Grid container marginLeft="38%">
              <Grid sx={{ mt:4}} item xs={3}>
                <Button onClick={() => {cancel()}} color="error" variant="outlined">cancelar</Button>
              </Grid>
              <Grid sx={{ mt:4}} item xs={4}>
                <Button onClick={() => {save()}} color="success" variant="outlined">Guardar</Button>
              </Grid>
            </Grid>
            :
            <Grid container marginLeft="38%" >
              <Grid sx={{ mt:4}} item xs={3}  >
                <Button onClick={() => {cancel()}} color="error" variant="outlined" >cancelar</Button>
              </Grid>

              <Grid sx={{ mt:4}} item xs={4} >
                <Button onClick={() => {update()}} color="success" variant="outlined" disableElevation>Actualizar</Button>
              
              </Grid>


            </Grid>
          }
        </Grid>
      }
     
      {
        showForm &&
        <Grid container>
            <Grid item xs={10} m="2%"  sx={{mt:"-6%"}} pl="5%" >
            {
              showAlert2 &&
                <Alert severity="success">Vehiculo agregado </Alert>
            }
          </Grid>

         <Grid item xs={10} m="2%" sx={{mt:"-6%"}} pl="5%">
            {
              showAlert1 &&
                <Alert severity="success">Vehiculo actualizado </Alert>
            }
          </Grid>
         

          <Grid className='button'item xs={8} sx={{mt:"0%"}}>
            <Button onClick={() => {showFormData()}}  variant="outlined" fullWidth >Agregar Vehiculo</Button>
            </Grid>

          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 600 }}size="small" aria-label="a dense table">
              <TableHead >
                <TableRow  >
                  <TableCell >Posicion</TableCell>
                  <TableCell align="right">Marca del Vehiculo</TableCell>
                  <TableCell align="right">Modelo</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.idbrands}
                    onClick={() => {edit(row)}}
                    sx={{ '&:last-child td, &:last-child th': { borderRadius:5} }}
                  >
                    <TableCell component="th" scope="row">
                      {row.idbrands}
                    </TableCell>
                    <TableCell align="right">{row.marca}</TableCell>
                    <TableCell align="right">{row.fechaDeFabricacion}</TableCell>
                    <TableCell align="right">{row.valor}</TableCell>
                    <TableCell align="right">{row.cantidad}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      }
    </Box>
  );

}

export default TableDense