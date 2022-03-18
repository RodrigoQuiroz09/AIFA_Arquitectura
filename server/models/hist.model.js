const mongoose = require('mongoose')

const AutoIncrement = require('mongoose-sequence')(mongoose);

const Hist = new mongoose.Schema({
    fecha:{type:String, required:true},
    hora:{type:String, required:true},
    aereolinea:{type:String, required:true},
    estatus:{type:Number,required:true},
    puerta:{type:String, required:true},
    email:{type:String, required:true},
    id:{type:Number,required:false}
},
{collection:'historico',timestamps:true})
Hist.plugin(AutoIncrement, {inc_field: 'id'});
const model = mongoose.model('Hist', Hist)


module.exports = model