msg.q = msg.payload.transcript.toLowerCase();

msg.q = msg.q.replace(/á/gi,"a");
msg.q = msg.q.replace(/é/gi,"e");
msg.q = msg.q.replace(/í/gi,"i");
msg.q = msg.q.replace(/ó/gi,"o");
msg.q = msg.q.replace(/ú/gi,"u");

var act_mode = ["1","2", "uno", "dos","para","frena"];
for (var i = 0; i < act_mode.length; i++){

   if (msg.q.indexOf(act_mode[i]) >= 0){
       if (msg.q.indexOf('1') >= 0){
           msg.payload = "video1";
       } else if (msg.q.indexOf('2') >= 0){
           msg.payload = "video2";
       } else if (msg.q.indexOf('para') >= 0 || msg.q.indexOf('frena') >= 0){
           msg.payload = "pararVideo";
       }  else {

       }
       break;
   }
   msg.payload = "videos";
}

return msg;
