const fs = require ('fs');
listaCursos = [];
listaInscritos=[];

const crear= (curso) =>{
        listar();
        
        let duplicado = listaCursos.find(id => id.idCurso == curso.idCurso)
        if(!duplicado){
            listaCursos.push(curso);
        console.log(listaCursos);
        guardar();
        return 'Curso creado con exito';
    }else{
        return '**Ya existe un curso con ese id';
    }
}


const inscribir= (inscripcion) =>{
    listarInscritos();    
    let bandera=false;
    let estudiante = listaInscritos.filter(registro=> registro.identidad == inscripcion.identidad);
    if(estudiante.length!=0){
        estudiante.forEach(est => {
           if(est.curso==inscripcion.curso){
               bandera=true;
           }
        });
    }

    if(bandera){
        return '**Ya se encuentra registrado en este curso';
    }else{
        listaInscritos.push(inscripcion);
        guardarInscritos();
        return 'Registro exitoso';
    }   
}


const listarInscritos = () =>{
    try{
        listaInscritos= require('./listadoInscritos.json')
    }catch(error){
        listaInscritos=[];
    }
}


const listar = () =>{
    try{
        listaCursos= require('./listado.json')
    }catch(error){
        listaCursos=[];
    }
}


const guardar= () =>{
    let datos= JSON.stringify(listaCursos)
    fs.writeFile('./src/listado.json', datos, (err)=>{
        if(err) throw (err);
        console.log('Archivo creado con éxito')
    })
}

const guardarInscritos= () =>{
    let datos= JSON.stringify(listaInscritos)
    fs.writeFile('./src/listadoInscritos.json', datos, (err)=>{
        if(err) throw (err);
        console.log('Archivo creado con éxito')
    })
}

const mostrarDisponibles=()=>{
    listar();
    let disponible = listaCursos.filter(cur=> cur.estado == 'Disponible');
    return disponible;
}

const buscarCurso=(id)=>{
    listar();
    let cursos = listaCursos.filter(cur=> cur.idCurso == id);
    return cursos;
}


const inscritosCurso=(idCurso)=>{
    listarInscritos();
    let inscritos = listaInscritos.filter(est=> est.curso == idCurso);
    return inscritos;
}

const actualizar = (id) =>{
    listar();
    let encontrado = listaCursos.find(buscar => buscar.idCurso == id)
    if(!encontrado){
       return 'No hay cursos para actualizar'
    }else{
        if(encontrado.estado=="Disponible"){
            encontrado["estado"] = "Cerrado";
            guardar();
        }else{
            encontrado["estado"] = "Disponible";
            guardar();
        }
        return 'Curso actualizado exitosamente'
    }
   
}

function listarInscritosForm (idCurso) {   
    texto2="<table class='table table-striped'>\
    <thead class='thead-dark'> \
    <th> Documento </th>\
    <th> Nombre </th>\
    <th> Correo </th>\
    <th> Telefono </th>\
    </thead>\
    <tbody>";
      let inscritos=inscritosCurso(idCurso);
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


const listarCursosInscritosForm= (id_c)=>{  
    
    try{
         let cursos= buscarCurso(id_c);
          texto="<div class='accordion' id='accordionExample2'>";
        
          let i=1;
          cursos.forEach(curso=>{
             
              texto=texto +
                  `<div class="card">
                  <div class="card-header" id="heading2${i}">
                    <h2 class="mb-0">
                      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse2${i}" aria-expanded="true" aria-controls="collapse2${i}">
                        Nombre del curso: ${curso.nombre} <br>
                        Valor: $${curso.valor} <br>
                        Estado: ${curso.estado} <br>                      
                      </button>
                    </h2>
                  </div>
              
                  <div id="collapse2${i}" class="collapse" aria-labelledby="heading2${i}" data-parent="#accordionExample2">
                    <div class="card-body"> 
                       ${listarInscritosForm(curso.idCurso)}
                    </div>
                  </div>
                </div>`
                i=i+1;
          })
          texto=texto+ `</div>`;
          
     }catch(error){
          texto="** No hay cursos"
     }
  
     return texto;
    
  
  };

const eliminar=(identificacion, idCurso)=>{
    console.log(identificacion +' '+ idCurso)
    listarInscritos();
    let nuevo = listaInscritos.filter(est=> !(est.identidad == identificacion && est.curso == idCurso));
    
     if(nuevo.length == listaInscritos.length){
         return ('No se encontro registro con el documento de identidad '+identificacion+ ' para el curso seleccionado');
     }else{
         listaInscritos = nuevo;
         guardarInscritos();
         return 'Eliminacion exitosa <br> ' +listarCursosInscritosForm(idCurso);
     }

}


module.exports={
    crear,
    mostrarDisponibles,
    inscribir,
    inscritosCurso,
    actualizar,
    eliminar,
    listarInscritosForm,
    listarInscritos
}