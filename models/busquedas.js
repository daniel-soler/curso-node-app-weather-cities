const fs = require("fs");

const axios = require("axios").default;

class Busquedas  {

  historial = [];
  dbPath = "./db/database.json";

  constructor( ciudad ) {

    try {
      this.leerDB()
    } catch (err) {
      console.log(err);
    }

  }

  get paramsMapbox() {
    return {
      "access_token" : process.env.MAPBOX_KEY,
      "limit" : 5,
      "language" : "es"
    }
  }

  get paramsOpenWeather() {
    return {
      "appid": process.env.OPENWEATHER_KEY,
      "lang": "es",
      "units": "metric"
    }
  }

  async ciudad ( lugar = "" ) {
    //peticion http
    try{

      const instance = axios.create( {
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
        params: this.paramsMapbox
      } )

      const respuesta = await instance.get();


      // const respuesta = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?language=es&limit=5&access_token=pk.eyJ1IjoiZGFuaWVsLXNvbGVyIiwiYSI6ImNsNDFtOWQ5czAxZmEzYnM1OGwyazZrdzkifQ.hWVobB2CgCMu8d-5YHQGZg");

      return respuesta.data.features.map( lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lon: lugar.center[0],
        lat: lugar.center[1]
      }))
      // console.log("Ciudad " + lugar);


      // return []; //retorna las ciudades que coincidan con la busqueda

    } catch (error) {
      console.log(error);
    }

  }

  async tiempo ( lugar ) {
    
    try {
      const instancia = axios.create( {
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: {
          "lat": lugar.lat.toString(),
          "lon": lugar.lon.toString(),
          ...this.paramsOpenWeather
        }
      } );
  
      const resultado = await instancia.get();

      return {
        temp : resultado.data.main.temp,
        temp_min : resultado.data.main.temp_min,
        temp_max : resultado.data.main.temp_max,
        temp : resultado.data.main.temp,
        description: resultado.data.weather[0].description.green
      };

    } catch (error) {
      console.log(error);
      return [];
    }
    
  }

  guardaBusqueda ( busqueda ) {

    const items_max = 5;

    const coincidente = this.historial.some( lugar => lugar.id === busqueda.id );

    if (!coincidente) this.historial.unshift( busqueda )

    if ( this.historial.length > items_max ) this.historial.pop()

    this.guardarDB();

  }

  guardarDB (  ) {

    fs.writeFileSync( this.dbPath, JSON.stringify(this.historial) );

  }

  leerDB (  ) {

    this.historial = JSON.parse( fs.readFileSync( this.dbPath ) );
    
  }

}


module.exports = Busquedas;