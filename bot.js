//VARIABLES INICIALES IMPORT - NO TOCAR
var Discord = require('discord.io'); //Se inicializa la variable del Discord.io
var logger = require('winston'); //Se inicializa la variable del Winston
//MENSAJES INICIALES - NO TOCAR
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';


//------------ZONA DE COSAS QUE MODIFICAR------------

//TOKEN DEL BOT PARA AUTENTIFICARSE
var bot = new Discord.Client({
		token: 'ESCRIBIR-TU-TOKEN-AQUÍ', //Token de Usuario para que funcione en un usuario o Token de Bot para que funcione con un Bot.
		autorun: true, //NO TOCAR
	});

//VARIABLES A MODIFICAR
var EncenderCambioNombres = true; //true para activar, false para desactivar
var NOMBRES = ["NOMBRE 1", "NOMBRE 2"]; //Cada hueco del Array es uno de los Nombres/Apodos que saldrán. Puedes añadir los que quieras.
var IntervaloTiempoNombre = 2000; //Tiempo entre cambio de Nombre/Apodo en Milisegundos
var UsuarioID = "XXXXXXXX"; //ID del Usuario a Cambiar el nombre. Si no tienes permisos para cambiar apodos es probable que solo puedas cambiar tu Nombre/Apodo, por lo que debes poner tu ID de usuario. Si es un bot la ID de usuario del bot.
var ServerID = "XXXXXXXX"; //ID del Servidor donde se va a realizar el cambio de Nombre/Apodo.

var EncenderCambioPresencias = true; //true para activar, false para desactivar
var PRESENCIAS = ["MENSAJE 1", "MENSAJE 2"]; //Cada hueco del Array es uno de los Mensajes en Jugando,Viendo,Escuchando que saldrán. Puedes añadir los que quieras.
var IntervaloTiempoPresencia = 17000; //Tiempo entre cambio de Presence en Milisegundos
var TipoPresencia = 3; //Tipo de mensaje en la Presencia. 0 = Jugando, 1 = Directo en Twitch, 2 = Escuchando, 3 = Viendo

//---------- FIN ZONA DE COSAS QUE MODIFICAR----------



//VARIABLES NO MODIFICAR - NO TOCAR
var ValorNombres = 0;
var NombreActual = NOMBRES[ValorNombres];
var ValorPresencia = 0;
var PresenciaActual = PRESENCIAS[ValorPresencia];


//INICIO DEL BOT - NO TOCAR
bot.on('ready', function (evt) {
	logger.info('ENCENDIDO');
	logger.info(bot.username + ' - (' + bot.id + ')');
	
	if(EncenderCambioPresencias)
		setInterval(CambiarPresencia, IntervaloTiempoPresencia);
	
	if(EncenderCambioNombres)
		setInterval(CambiarNombre, IntervaloTiempoNombre);

});


//FUNCIONES - NO TOCAR

function CambiarNombre()
{
	bot.editNickname({
	serverID: ServerID,
	userID: UsuarioID,
	nick: NombreActual,
	});
	
	if( (ValorNombres + 1) == NOMBRES.length)
		ValorNombres = 0;
	else
		ValorNombres = ValorNombres + 1;
	
	NombreActual = NOMBRES[ValorNombres];
}

function CambiarPresencia()
{
	bot.setPresence({
		game: {
			type: TipoPresencia,
			name: PresenciaActual,
			url: "https://discordapp.com/oauth2/authorize?&client_id=495956911972286465&scope=bot&permissions=10241"
		}
	});
	
	if( (ValorPresencia + 1) == PRESENCIAS.length)
		ValorPresencia = 0;
	else
		ValorPresencia = ValorPresencia + 1;
	
	PresenciaActual = PRESENCIAS[ValorPresencia];
}

