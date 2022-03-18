const mongoose = require('mongoose')

const hangar = new mongoose.Schema({
    aereo:String,
    disponible:Number
})

const Door  = new mongoose.Schema({
    fecha:{type:String, required:true},
    horario:[[hangar]]
},{collection:'hangares'})

const model = mongoose.model('Door', Door)

module.exports = model