webcam = "";
status = "";
objects = [];

function preload() {
}
function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();

    webcam = createCapture(VIDEO);
    webcam.hide();

}



function ModelLoaded() {
    console.log("Model is Loaded");
    status = "true";

}
function Start() {
    anything = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
    InputBox = document.getElementById("Item_Searcher").value;

}

function draw() {
    image(webcam, 0, 0, 600, 400);
    if (status != "") {
        anything.detect(webcam, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects are detected";
            fill('#FF0000');
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (InputBox == objects[i].label) {
                webcam.stop();
                anything.detect(gotResult);
                document.getElementById("status").innerHTML=InputBox+"found";
                synth=window.speechSynthesis;
                speak=new SpeechSynthesisUtterance(InputBox+"found");
                synth.speak(speak);
                        }
                        else{
                            document.getElementById("status").innerHTML=InputBox+"not found"
                        }
           





        }

    }
}



function gotResult(error, results) {
    if (error) {
        console.error(error);

    }
    else {
        console.log(results);
        objects = results;
    }

}
