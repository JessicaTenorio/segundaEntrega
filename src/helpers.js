const hbs = require('hbs');
const funciones = require('./funciones');


hbs.registerHelper('listar', ()=>{

    let texto= "<table class='table table-striped'>\
                <thead class='thead-dark'> \
                <th> Nombre </th>\
                <th> id Curso </th>\
                <th> Descripcion </th>\
                <th> Valor </th>\
                <th> Modalidad </th>\
                <th> Intensidad horaria </th>\
                <th> Estado </th>\
                </thead>\
                <tbody>";
    try{
        listaCursos= require('./listado.json')        
        listaCursos.forEach(curso=>{
        texto=texto+
                '<tr>'+
                '<td>'+ curso.nombre+'</td>'+
                '<td>'+ curso.idCurso+'</td>'+
                '<td>'+ curso.descripcion+'</td>'+
                '<td>'+ curso.valor+'</td>'+
                '<td>'+ curso.modalidad+'</td>'+
                '<td>'+ curso.intensidad+'</td>'+
                '<td>'+ curso.estado+'</td></tr>';

        });
        texto=texto+ '</tbody></table>';
        return texto;
    }catch(error){       
        
        texto=texto+
                '<tr>'+
                '<td>-</td>'+
                '<td>-</td>'+
                '<td>-</td>'+
                '<td>-</td>'+
                '<td>-</td>'+
                '<td>-</td>'+
                '<td>-</td></tr>';
        texto=texto+ '</tbody></table>';
        return texto;
    }   
});

hbs.registerHelper('selectCursos', ()=>{
    listaCursos= require('./listado.json')   
    let texto;
    if(listaCursos.length>0){
        texto="<select name='curso2' class='form-control' id='exampleFormControlSelect1'>";
        listaCursos.forEach(curso=>{
            texto=texto+
              `<option value="${curso.idCurso}">${curso.nombre}</option>`
        })
        texto=texto+` </select>`     
    }else{
        texto="No hay cursos"
    }
   return texto;
})


hbs.registerHelper('selectDisponibles', ()=>{
    let disponibles=funciones.mostrarDisponibles();
    let texto;
    if(disponibles.length>0){
        texto="<select name='curso' class='form-control' id='exampleFormControlSelect1'>";
        disponibles.forEach(curso=>{
            texto=texto+
              `<option value="${curso.idCurso}">${curso.nombre}</option>`
        })
        texto=texto+` </select>`     
    }else{
        texto="No hay cursos disponibles"
    }
   return texto;
})

hbs.registerHelper('listarDisponibles', ()=>{

   let disponibles=funciones.mostrarDisponibles();
   let texto;
   if(disponibles.length>0){
        texto="<div class='accordion' id='accordionExample'>";
        let i=1;
        disponibles.forEach(curso=>{
            texto=texto +
                `<div class="card">
                <div class="card-header" id="heading${i}">
                  <h2 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                      Nombre del curso: ${curso.nombre} <br>
                      Valor $${curso.valor}
                    </button>
                  </h2>
                </div>
            
                <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                  <div class="card-body">
                     Descripcion detallada: ${curso.descripcion} <br>
                     Modalidad: ${curso.modalidad} <br>
                     Intensidad horaria: ${curso.intensidad} <br>
                  </div>
                </div>
              </div>`
              i=i+1;
        })
        texto=texto+ `</div>`;
        
   }else{
        texto="No hay cursos disponibles"
   }

   return texto;

});




function listarInscritosForm (idCurso) {   
    let texto2="";
    texto2="<table class='table table-striped'>\
    <thead class='thead-dark'> \
    <th> Documento </th>\
    <th> Nombre </th>\
    <th> Correo </th>\
    <th> Telefono </th>\
    </thead>\
    <tbody>";
      let inscritos=funciones.inscritosCurso(idCurso);
                      inscritos.forEach(ins=>{
                          texto2=texto2+`<tr>
                          <td> ${ins.identidad}</td>
                          <td> ${ins.nombre}</td>
                          <td> ${ins.correo}</td>
                          <td> ${ins.telefono}</td>
                          </tr>`;          
                      })
                      texto2=texto2+ '</tbody></table>'; 
    return texto2;
 };


hbs.registerHelper('listarCursosInscritos', ()=>{      
    let texto="";
    try{
        
        let cursos= require('./listado.json') 
         texto="<div class='accordion' id='accordionExample2'>";
       
         let i=1;
         cursos.forEach(curso=>{
            
             texto=texto +
                `Nombre del curso: ${curso.nombre} <br>
                       Valor: $${curso.valor} <br>
                       Estado: ${curso.estado} <br>                      
                   
                   <div class="card-body"> 
                      ${listarInscritosForm(curso.idCurso)}
                   </div>`
                
         })        
         
    }catch(error){
         texto="** No hay cursos"
    }
 
    return texto;
 
 });

