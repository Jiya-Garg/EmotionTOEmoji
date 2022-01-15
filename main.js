Webcam.set({
    width: 350,
    height: 300,
    img_format: "png",
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='snapshot'src='"+data_uri+"'>";
    })
}
console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/i4ojvh2Xv/model.json',modelLoaded);
function modelLoaded() {
    console.log("Model Loaded!")
}
function speak() {
    var synth = window.speechSynthesis;
    speak1 = "Your first prediction is "+prediction1;
    speak2 = "Your second prediction is "+prediction2;
    var UtterThis = new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(UtterThis);
}
function check() {
    img = document.getElementById("snapshot");
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "Happy") {
            document.getElementById("update_emoji").innerHTML = "😃";
        }
        if (results[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "😔";
        }
        if (results[0].label == "Suprise") {
            document.getElementById("update_emoji").innerHTML = "😳";
        }
        if (results[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "😡";
        }
        if (results[0].label == "Fear") {
            document.getElementById("update_emoji").innerHTML = "😱";
        }
        if (results[1].label == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "😃";
        }
        if (results[1].label == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "😔";
        }
        if (results[1].label == "Suprise") {
            document.getElementById("update_emoji2").innerHTML = "😳";
        }
        if (results[1].label == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "😡";
        }
        if (results[1].label == "Fear") {
            document.getElementById("update_emoji2").innerHTML = "😱";
        }
    }
}