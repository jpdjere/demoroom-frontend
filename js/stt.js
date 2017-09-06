var final_transcript = '';
var interim_transcript = '';
var interim_final = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

var isSpeaking = false;

if (!('webkitSpeechRecognition' in window)) {

  console.log('SST Problems. Not loaded');

} else {

  console.log('SST OK. Loaded');

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onstart = function() {
    recognizing = true;
  };
  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    if (!final_transcript) {
      return;
    }
    isSpeaking = false;
  };

  recognition.onresult = function(event) {
    interim_transcript = '';
    if (typeof(event.results) == 'undefined') {
      recognition.onend = null;
      recognition.stop();
      return;
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
        intertimCounter++;
        console.log(intertimCounter + ":" + interim_transcript);
      }
    }
    if (final_transcript || interim_transcript) {
    }
  };
}

var intertimCounter = 0;
var lastInterimCounter = 0;
var internalObj;

function startSTTTimer(){

  if (!recognition) return;

  console.log("startSTTTimer: " + lastInterimCounter + " / " + intertimCounter + " ||| " + interim_transcript);

  if (interim_transcript == '' && intertimCounter == 0) return;
  
  if (lastInterimCounter == intertimCounter && intertimCounter != 0){

    toggleButton();
    recognizing = false;
    clearInterval(internalObj);
    
    if (final_transcript == ''){
      final_transcript = interim_transcript;
    }
    
    if (final_transcript != ''){
      console.log("FT:" + final_transcript);
      sendQuestion(final_transcript);
    }

  } else {

    lastInterimCounter = intertimCounter;
    return;

  }
  
}

function toggleButton() {
  if (recognizing) {
    recognition.stop();
    isSpeaking = false;
    intertimCounter = 0;
    lastInterimCounter = 0;
    return;
  }
  intertimCounter = 0;
  lastInterimCounter = 0;
  final_transcript = '';
  recognition.lang = 'es-CL';
  recognition.start();
  ignore_onend = false;

  internalObj = setInterval(startSTTTimer, 2000);

  console.log("Listening...");
}