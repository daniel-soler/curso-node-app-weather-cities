const inquirer = require("inquirer");
require("colors");


const inquirerMenu = async () => {
  console.clear();

  console.log( "========================".green );
  console.log( " Seleccione una opción ".green );
  console.log( "========================\n".green );

  const opciones = [{ value: 1, name:`${ '1.'.green } Buscar ciudad`},
                    { value: 2, name:`${ '2.'.green } Historial`},
                    { value: 0, name:`${ '0.'.green } Salir`}];

  const opt = await inquirer
          .prompt([
            {
              type: "list",
              name: "menu",
              message: "¿Qué desea hacer?",
              choices: opciones
            }
          ]);

  return opt.menu;
  
}





const pausa = async () =>{

  console.log("\n");
  return inquirer.prompt({
    type: "input",
    name: "pausa",
    message: `Pulsa ${ "ENTER".green } para continuar...`
  })

}



const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate( value ) {
        if ( value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question)
  return desc;
}



const listarLugares = async ( lugares ) => {

  const opciones = lugares.map( ( lugar, i ) => {
    return {
      value: lugar.id,
      name: `${(i+1).toString().green}. ${lugar.nombre}`
    }
  });

  opciones.unshift({
    value: null,
    name: `${(0).toString().green}. Cancelar`
  })

  const respuesta = await inquirer.prompt({
    type: "list",
    name: "lugar",
    message: "Selecciona la ciudad: ",
    choices: opciones
  })

  return respuesta.lugar;

}

const confirmar = async ( mensaje ) => {

  const { ok } = await inquirer.prompt({
    type: "confirm",
    name: "ok",
    message: mensaje
  })

  return ok
}



module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares
}