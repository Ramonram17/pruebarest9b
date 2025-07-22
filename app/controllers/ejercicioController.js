const ejercicioModel = require('../models/EjerciciosModel')

function buscarTodo(req, res){
    ejercicioModel.find({})
    .then(ejercicios=>{
        if (ejercicios.length) {
            return res.status(200).send({ejercicios})
        }
        return res.status(204).send({mensaje:"No hay información que mostrar"})
    })
    .catch(e=>{return res.status(404).send({mensaje:"Error al solicitar la información ${e}"})})
}

function guardarEjercicio(req, res){
    console.log(req.body)
    new ejercicioModel(req.body).save()
    .then(info =>{
        return res.status(200).send({mensaje:"Información guardada con éxito", info})
    })
    .catch(e =>{return res.status(404).send({mensaje:"Error al guardar la infromación",e})})
}

function buscarEjercicio(req, res, next) {
    let consulta={}
    consulta[req.params.key]=req.params.value
    ejercicioModel.find(consulta)
    .then(info=>{
        if (!info.length)return next() 
        req.body.ejercicios = info
        return next()
    })
    .catch(e =>{
        req.body.e = e
        next()
    })
 
}

function mostrarEjercicio(req,res){
    if(req.body.e) return res.status(404).send
        ({mensaje:"Error al buscar la información", error:req.body.e})
        if(!req.body.ejercicios) return res.status(204).send({mensaje:"no hay información que mostrar"})
        let ejercicios = req.body.ejercicios
        return res.status(200).send({ejercicios})
}

function eliminarEjercicio(req, res) {
    if (req.body.e) return res.status(404).send({ mensaje: "Error al buscar la información", error: req.body.e });
    if (!req.body.ejercicios) return res.status(204).send({ mensaje: "no hay información que mostrar" });

    ejercicioModel.deleteOne({ [req.params.key]: req.params.value })
        .then(info => {
            return res.status(200).send({
                mensaje: "Información eliminada",
                info
            });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: "Error al eliminar la información", e });
        });
}

function editarEjercicio(req, res) {
    if (req.body.e) return res.status(404).send({ mensaje: "Error al buscar la información", error: req.body.e });
    if (!req.body.ejercicios) return res.status(204).send({ mensaje: "No hay información que mostrar" });

    ejercicioModel.updateOne(
        { [req.params.key]: req.params.value },  // filtro
        req.body                                 // datos nuevos
    )
    .then(info => {
        return res.status(200).send({
            mensaje: "Información actualizada",
            info
        });
    })
    .catch(e => {
        return res.status(404).send({ mensaje: "Error al actualizar la información", e });
    });
}


module.exports ={
    buscarTodo,
    guardarEjercicio,
    buscarEjercicio,
    mostrarEjercicio,
    eliminarEjercicio,
    editarEjercicio
}