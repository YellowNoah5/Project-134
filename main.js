status = ""
object = []

song = ""


img = ""

function preload()
{
  song = loadSound("alarm.mp3")
}

function setup()
{
    canvas = createCanvas(790, 600)
    canvas.position(550, 220)

    vid = createCapture(VIDEO)
    vid.hide()

    objectdet = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("statuss").innerHTML = "Status: detecting objects"



}

function modelLoaded()
{
    console.log("Model Loaded!")
    status = true

    
} 

function gotResults(error, results)
{
    if(error) {
        console.log(error)
    }
    else{
        console.log(results)
        object = results
    }
}


function draw()
{
    
    image(vid, 0, 0, 800, 700)

    // fill("blue")
    // textSize(20)
    // text("Dog", 210, 120)
    // text("Cat", 580, 150)
    // noFill()
    // stroke("blue")
    // rect(100, 90, 400, 500 )
    // rect(400, 80, 380, 450)

    if(status != "")
    {
        objectdet.detect(vid, gotResults)

        r = random(1, 124)
        g = random(255)
        b = random(255)



        for(i = 0; i < object.length; i++)
        {
            document.getElementById("statuss").innerHTML = "status: object detected"

            percent = floor(object[i].confidence*100)

            fill(r, g, b)
            textSize(20)

            text(object[i].label + " " + percent + "%" , object[i].x, object[i].y)

            noFill()

            stroke(r, g, b)

            rect(object[i].x, object[i].y, object[i].width, object[i].height)

            if( object[i].label == "person"  )
        {
        document.getElementById("statuss").innerHTML = "Status: Baby Detected"
        
        song.stop()


        }
    else{
        document.getElementById("statuss").innerHTML = "Status: Baby Not Detected"
        song.play()
    }

        }
        

        
    }
    
    
    




}