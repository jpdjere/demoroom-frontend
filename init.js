msg.q = msg.payload.transcript.toLowerCase();

msg.q = msg.q.replace(/á/gi,"a");
msg.q = msg.q.replace(/é/gi,"e");
msg.q = msg.q.replace(/í/gi,"i");
msg.q = msg.q.replace(/ó/gi,"o");
msg.q = msg.q.replace(/ú/gi,"u");

if (!global.get("currentMode")){
   msg.mode = "WELCOME";
} else {
   msg.mode = global.get("currentMode");
}

msg.changeMode = false;

var act_mode = ["inicia el modo","activar modo", "activar el modo", "iniciar modo", "activate el modo", "activate modo", "inicia modo","iniciar el modo","activa el modo"];
for (var i = 0; i < act_mode.length; i++){
   if (msg.q.indexOf(act_mode[i]) >= 0){
       if (msg.q.indexOf('bienvenido') >= 0){
           msg.mode = "WELCOME";
       } else if (msg.q.indexOf('nivelacion') >= 0){
           msg.mode = "NIVELACION";
       } else if (msg.q.indexOf('banca') >= 0){
           msg.mode = "BANKING";
       } else if (msg.q.indexOf('publico') >= 0){
           msg.mode = "PUBLIC";
       } else if (msg.q.indexOf('educacion') >= 0){
           msg.mode = "EDUCATION";
       } else if (msg.q.indexOf('telco') >= 0 || msg.q.indexOf('telecomunicaciones') >= 0){
           msg.mode = "TELCO";
       } else if (msg.q.indexOf('retail') >= 0){
           msg.mode = "RETAIL";
       } else if (msg.q.indexOf('beneficios') >= 0){
           msg.mode = "BENEFITS";
       } else if (msg.q.indexOf('inmobiliario') >= 0 || msg.q.indexOf('inmobiliaria') >= 0){
           msg.mode = "REAL-ESTATE";
       } else {
           msg.mode = "UNKNOWN";
       }

       if (msg.mode != "UNKNOWN"){
           global.set("currentMode",msg.mode);
       }

       msg.changeMode = true;

       break;

   }
}

return msg;
