
const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer.js");
const Busquedas = require("./models/busquedas.js");
require("colors")
require("dotenv").config();


const main = async () => {

  const busquedas = new Busquedas();

  let opt;
  do {
    opt = await inquirerMenu()

    switch ( opt ) {

      case 1:
        //Mostrar mensaje para la búsqueda
        const termino = await leerInput( "Ciudad:" );
        
        //busacr los lugares
        const lugares = await busquedas.ciudad( termino );

        //seleccionar el lugar
        const idSeleccionado = await listarLugares( lugares );
        const lugarSeleccionado = lugares.find( lugar => lugar.id === idSeleccionado )
        if (!lugarSeleccionado) break;
        busquedas.guardaBusqueda( lugarSeleccionado );

        //obtener datos tiempo
        const tiempo = await busquedas.tiempo( lugarSeleccionado );

        //mostrar resultados
        console.clear();
        console.log("\n Informacion de la ciudad:\n".green);
        console.log("Ciudad: ", lugarSeleccionado.nombre);
        console.log("Latitud: ", lugarSeleccionado.lat);
        console.log("Longitud: ", lugarSeleccionado.lon);
        console.log("Temperatura: ", tiempo.temp);
        console.log("Temp. mínima: ", tiempo.temp_min);
        console.log("Temp. máxima: ", tiempo.temp_max);
        console.log("El tiempo está: ", tiempo.description);

      break;

      case 2:
        busquedas.historial.forEach( (lugar,i) => {
          console.log(`${(i+1).toString().green} ${lugar.nombre}`)
        })

      break;


    }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    if (opt !== 0 ) await pausa()
  
  } while ( opt !== 0 )

}

main();