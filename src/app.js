const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser= require('body-parser');
const funciones = require('./funciones');
require('./helpers');


const dirNode_modules = path.join(__dirname , '../node_modules')
const directoriopublico = path.join(__dirname, '../public')
const directoriopartials = path.join(__dirname, '../partials')
app.use(express.static(directoriopublico));

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));


hbs.registerPartials(directoriopartials);

app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
    res.render('index')
});

app.get('/registroCurso', (req, res)=>{
    res.render('registroCurso')
});

app.get('/inscribir', (req, res)=>{
    res.render('inscripcion')
});

app.get('/verCurso', (req, res)=>{
    res.render('verCurso')
});

app.get('/verInscritos', (req, res)=>{
    res.render('verInscritos')
});

app.get('/eliminaInscrito', (req, res)=>{
    res.render('eliminaInscrito')
});

app.post('/cambiar', (req, res)=>{
   
    let responseService=funciones.actualizar(req.body.curso);

    res.render('verInscritos',{
        response: responseService
    });
});

app.post('/eliminar', (req, res)=>{
   
    let responseService=funciones.eliminar(parseInt(req.body.identidad2), parseInt(req.body.curso2));

    res.render('eliminaInscrito',{
        response: responseService
    });
});

app.post('/guardar', (req, res)=>{
    let inten=req.body.intensidad;
    console.log('intensidad'+inten);
    if(inten===null || inten==undefined || inten==""){
       inten="-";
    }
    let curso= {
        nombre: req.body.nombre,
        idCurso: parseInt(req.body.id),
        descripcion: req.body.descripcion,
        valor: parseInt(req.body.valor),
        modalidad: req.body.modalidad,
        intensidad: inten,
        estado: 'Disponible'
    };   

    let responseService= funciones.crear(curso);
    
    res.render('registroCurso', {
       response: responseService
    });
});

app.post('/inscribir', (req, res)=>{
    
    let inscripcion= {
        identidad: parseInt(req.body.identidad),
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: parseInt(req.body.telefono),  
        curso: parseInt(req.body.curso)       
    };   

    let responseService= funciones.inscribir(inscripcion);
    
    res.render('inscripcion', {
       response: responseService
    });
});

app.get('*', (req, res)=>{
    res.render('error', {
        estudiante: 'error'
    })
})

console.log(__dirname);


app.listen(3000, ()=>{
    console.log('Escuchando en el puerto 3000')
})

