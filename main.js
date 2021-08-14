prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
 
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capture_img' src='"+data_uri+"'>";
    });
}

console.log("ml5",ml5.version);

var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/SA7gY1-El/model.json",model_loaded);

function model_loaded()
{
    console.log("model loaded successfully");
}

function speak()
{
    var syth=window.speechSynthesis;
    speak_data_1="the first prediction is"+prediction_1;
    speak_data_2="The Second prediction is"+prediction_2;
utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
syth.speak(utterthis);
}

function check()
{
    img=document.getElementById("capture_img")
    classifier.classify(img,gotresult)
}

function gotresult(error,result)
{
    if (error)
    {
        console.log(error)
    } else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        speak();

        if(result[0].label == "HAPPY")
        {
            document.getElementById("update_emoji1").innerHTML="&#128522";
        }
        if(result[0].label == "Sad")
        {
            document.getElementById("update_emoji1").innerHTML="&#128532";
        }if(result[0].label == "angry")
        {
            document.getElementById("update_emoji1").innerHTML="&#128548";
        }

        if(result[1].label == "HAPPY")
        {
            document.getElementById("update_emoji2").innerHTML="&#128522";
        } if(result[1].label == "Sad")
        {
            document.getElementById("update_emoji2").innerHTML="&#128532";
        } if(result[1].label == "angry")
        {
            document.getElementById("update_emoji2").innerHTML="&#128548";
        }

    }


};