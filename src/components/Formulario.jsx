import { Fragment, useState } from "react";
import shortid from 'shortid/lib';
import PropTypes from 'prop-types';




const Formulario = ({crearCita}) => {
  //CREAR EL STATE DE CITAS

  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    Fecha: '',
    Hora: '',
    Sintomas: '',
  }) 

  const [error, actualizarError] = useState(false)

  //FUNCION QUE SE EJECUTA CADA VEZ QUE EL USUARIO ESCRIBE EN ALGUN INPUT

  const actualizarState= e =>{
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }
  
//EXTRAER LOS VALORES con destructu
    const{mascota, propietario, Fecha, Hora, Sintomas}= cita

//CUANDO EL USUARIO PRESIONA AGREGAR CITA
    const submitCita = e =>{
       e.preventDefault();
        
      //VALIDAR
      if(mascota.trimStart() === ''|| propietario.trimStart() === ''|| Fecha.trimStart() === ''|| Hora.trimStart() === ''|| Sintomas.trimStart() ===''){
        actualizarError(true);
        return;

      }
      //ELIMINAR EL MENSAJE DE ERROR DE VALIDACION
      actualizarError(false)

      //ASIGNAR UN ID
      cita.id = shortid();
      

      //CREAR LA CITA
      crearCita(cita);
      
      //REINICIAR EL FORM
      actualizarCita({
        mascota: '',
        propietario: '',
        Fecha: '',
        Hora: '', 
        Sintomas: ''
      })

    }
    //SE COLOCA RETURN PARA QUE NO SE SIGA EJECUNTANDO EL CODIGO
  return ( 
    <Fragment>
      <h2 className="crearCita">Crear Cita</h2>
        { error ? <p className="alerta-error">Todos los campos son obligatorios</p>
        : null }
      <form
        onSubmit={submitCita}
        >

        <label className="titulo">Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value = {mascota}
        />
           <label>Nombre del Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de Mascota"
          onChange={actualizarState}
          value = {propietario}
        />
           <label>Fecha</label>
        <input
          type="date"
          name="Fecha"
          className="u-full-width"
          onChange={actualizarState}
          value = {Fecha}
        />
           <label>Hora</label>
        <input
          type="time"
          name="Hora"
          className="u-full-width"
          onChange={actualizarState}
          value = {Hora}
          
        />

        <label>Sintomas</label>
       <textarea
          className="u-full-width"
          name="Sintomas"
          onChange={actualizarState}
          value = {Sintomas}
       ></textarea>
       <button
         type="submit"
         className="u-full-width button-primary "
       >Agregar Cita</button>
          </form>
    </Fragment>
   );
}
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
  
}


export default Formulario;