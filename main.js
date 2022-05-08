object = [];
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
}

img = "";
status = "";

function preload(){
    img = loadImage("Dog-and-Cat-Grooming.jpg");
}

function draw(){
    image(video ,0 ,0 ,380, 380);
    if (status != ""){
        object_detector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects: "+object.length;
            percent = floor(object[i].confidence*100);
            fill(r,g,b);
            noFill();
            stroke(r,g,b);
            text( object[i].label + " " + percent + "%", object[i].x+15 , object[i].y+15);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}