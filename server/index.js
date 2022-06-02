const express = require( 'express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Door= require('./models/testpuerta.model.js')
const Hist =require('./models/hist.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config();

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "100.26.41.90:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
        ]
        }
    }
}

app.use(cors(
    config.application.cors.server
  ));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json())

mongoose.connect(process.env.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error(err));

app.post('/api/register', async(req,res) =>{
    res.set('Access-Control-Allow-Origin', 'http://100.26.41.90:3000');
    
    try {
        const newPassword= await bcrypt.hash(req.body.pass,10)
        const user= await User.create({
            name:req.body.name,
            email:req.body.email,
            password:newPassword,
            type:req.body.tipo
        })
        res.json({status:'ok'})
    } catch (error) {
        res.json({status:'error',})
    }
})

app.post('/api/login', async(req,res) =>{
    try {     
        const user= await User.findOne({
            email:req.body.email,
        })

        if(!user){return {status:"error", error:'Invalid Login'}}

        const isValidPass=await bcrypt.compare( req.body.pass,user.password)

        if(isValidPass){
            const token = jwt.sign({
                email:user.email,
                name:user.name,
                tipo:user.type
            },'secret123')

            return res.json({user:true,token})
        } else{
            return res.json({status:'erroe', user:false})
        }
        
    } catch (error) {
        console.log(error)
        res.json({status:'error',})
    }
})

app.get('/api/door',async(req,res)=>{
    try {     
        const door = await Door.find({})
        return res.json(door)
    }
    catch(err){
        return res.json({status:'error'})
    }
})

app.post('/api/reserve',async(req,res)=>{
    const hora=req.body.horario.hora
    const gate=req.body.horario.indice
    try {     
        const door = await Door.findOne({fecha:req.body.fecha,}, function(err,doc){
            if(doc.horario[hora][gate].disponible == 0){ 
                doc.horario[hora][gate].disponible = 1
                doc.save()
            }
        })
    }
    catch(err){
        return res.json({status:'error'})
    }
})

app.post('/api/saveres',async(req,res)=>{
    try {
        await Hist.create({
            fecha:req.body.fecha,
            hora:req.body.horario,
            aereolinea:req.body.aereolinea,
            puerta:req.body.puerta,
            email:req.body.email,
            estatus:0
        })
           res.json({status:'ok'})
    } catch (error) {
       
        res.json({status:'error',})
    }
})
app.post('/api/getinv',async(req,res)=>{

    try {
        const inv= await Hist.find({
        aereolinea:req.body.aereolinea
        })
         return res.json({inv})
    } catch (error) {
       
        res.json({status:'error',})
    }
})


app.get('/api/getAll',async(req,res)=>{
    try {
        const inv= await Hist.find({})
         return res.json({inv})
    } catch (error) {
        res.json({status:'error',})
    }
})



app.post('/api/denyUnique',async(req,res)=>{
    const hora=req.body.search.horario
    const gate=req.body.search.door
    
    try {   
        await Door.findOne({fecha:req.body.search.fecha}, 
            function(err,doc){
                if(doc.horario[hora][gate].disponible == 1){ 
                    doc.horario[hora][gate].disponible = 0
                    doc.save()
                }
            }
        ).clone()

        await Hist.findOne({id:req.body.id}, 
            function(err,doc){
                doc.estatus = 2; 
                doc.save();
            }
        ).clone()
    }
    catch (error) {
        console.log(error);
        res.json({status:'error',})
    }

})

app.post('/api/deny',async(req,res)=>{ 
    try {   
        await Hist.findOne({id:req.body.id}, 
            function(err,doc){
                doc.estatus = 2; 
                doc.save();
            }
        ).clone()
    }
    catch (error) {
        console.log(error);
        res.json({status:'error',})
    }

})

app.post('/api/acceptUnique',async(req,res)=>{ 
    const hora=req.body.search.horario
    const gate=req.body.search.door
    const aereo=req.body.search.aereo
    console.log(aereo);
    try {   
        await Door.findOne({fecha:req.body.search.fecha}, 
            function(err,doc){
                if(doc.horario[hora][gate].disponible == 1){ 
                    doc.horario[hora][gate].disponible = 2
                    doc.horario[hora][gate].aereo =aereo
                    doc.save()
                }
            }
        ).clone()

        await Hist.findOne({id:req.body.id}, 
            function(err,doc){
                doc.estatus = 1; 
                doc.save();
            }
        ).clone()
    }
    catch (error) {
        console.log(error);
        res.json({status:'error',})
    }

})

app.post('/api/accept',async(req,res)=>{ 
    const hora=req.body.search.horario
    const gate=req.body.search.door
    const aereo=req.body.search.aereo
   
    try {   
        await Door.findOne({fecha:req.body.search.fecha}, 
            function(err,doc){
                if(doc.horario[hora][gate].disponible == 1){ 
                    doc.horario[hora][gate].disponible = 2
                    doc.horario[hora][gate]["aereo"] =aereo
                    doc.save()
                }
            }
        ).clone()

        await Hist.findOne({id:req.body.id}, 
            function(err,doc){
                doc.estatus = 1; 
                doc.save();
            }
        ).clone()

        req.body.auxId.forEach(async (element) => {
            await Hist.findOne({id:element}, 
                function(err,doc){
                    doc.estatus = 2; 
                    doc.save();
                }
            ).clone()
        });
    }
    catch (error) {
        console.log(error);
        res.json({status:'error',})
    }

})

app.post('/api/blocks',async(req,res)=>{

    const hora=req.body.search.horario
    const gate=req.body.search.door

    try {     
        const door = await Door.findOne({fecha:req.body.search.fecha}, function(err,doc){
            if(!err){
                
                if(doc.horario[hora][gate].disponible == 0){ 
                    doc.horario[hora][gate].disponible = 2
                    
                    doc.save()
                }
            }
        }).clone()
        return res.json({status:'ok'})
    }

    catch(err){
        console.log(err);
        return res.json({status:'error'})
    }
})

app.listen(5000,()=>{
    console.log("Server started")
})