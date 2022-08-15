model_status = "";
objects = [];
current_value= "";

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    objectDetector.detect(video,gotResult);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    current_value= document.getElementById("text_input").value;
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    objects = results;
}

function modelLoaded(){
    console.log("Model Loaded!")
    status_ = true;
}

function draw(){
    image(video, 0, 0, 380,380);
    /*current_value= document.getElementById("text_input").value;
    if(objects[0].label == current_value){
        video.stop();
        document.getElementById("status").innerHTML = "The object mentioned has been found";
        
        synth = window.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance("The object mentioned has been found");
        synth.speak(utterThis);
    }
    else{
        document.getElementById("status").innerHTML = "The object mentioned has not been detected";
    }*/
    if (model_status != ""){
        for(i = 0;i <= objects.length;i++){
            percent = floor(objects[i].confidence * 100);
            fill("#2a52be");
            text(objects[i].label + " " + percent+"%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#2a52be");
            rect(objects[i].x,objects[i].y, objects[i].width,objects[i].height);
        }
    }
}