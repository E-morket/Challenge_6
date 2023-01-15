
const express= require('express')
const mysql=require('mysql')

const port=3003
const app= express()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
app.use(express.json())

const conectBaseD =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'buycars'
})

app.get('/',(req,res)=>
{
  res.send('cars_store')
})

app.get('/buycars',(req,res)=>
{
    const sql = 'SELECT * FROM brands'
    conectBaseD.query(sql,(error,result)=>
    {
        if(error) throw error;
        if(result.length >0)
        {
            res.json(result)
        }else{
            res.send('not results')
        }
    })
})

app.get('/buycars/:id',(req, res)=>
{
    const id=req.params.id
    const sql =`SELECT * FROM brands WHERE idbrands = ${id}`

    conectBaseD.query(sql, (error,result) =>
    {
        if(error)throw error;
        if(result.length>0)
        {
            res.json(result)
        }else{
            res.send('Not result')
        }
    })
})

app.post('/addbrands',(req,res)=>
{
    const sql='INSERT INTO brands SET?'
    const brandObj= {
        idbrands: req.body.idbrands,
        marca: req.body.marca,
        fechaDeFabricacion: req.body.fechaDeFabricacion,
        valor: req.body.valor,
        cantidad: req.body.cantidad
    }
    conectBaseD.query(sql,brandObj,error =>
        {
            if(error) throw error
            res.send('brand added')
        })
})

app.put('/update/:id',(req,res)=>
{       const id= req.params.id
        const { marca, fechaDeFabricacion, valor, cantidad }= req.body
        const sql= `UPDATE brands SET marca= '${marca}', fechaDeFabricacion= '${fechaDeFabricacion}', valor= '${valor}',cantidad= 
        '${cantidad}'
        WHERE idbrands = '${id}'`
        conectBaseD.query(sql,error =>
            {
                if(error) throw error;
                res.send('vehicle updated')
            })
})

 app.listen(3003,(req,res)=>
 {
    console.log('conect by 3003 port')
 })
