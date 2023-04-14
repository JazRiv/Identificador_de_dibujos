function setup() {
    canvas = createCanvas(400, 370);
    canvas.center();
    background("#fff");
    canvas.mouseReleased(reconocer_dibujo);
    voz = window.speechSynthesis;
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw() {
    stroke("black");
    strokeWeight(10);
    if (mouseIsPressed == true) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function reconocer_dibujo() {
    classifier.classify(canvas, mostrar_resultado);
}

function mostrar_resultado(error, respuesta) {
    if (!error) {
        console.log(respuesta);
        dibujo = respuesta[0].label;
        confianza = respuesta[0].confidence;
        confianza = Math.round(confianza * 100);
        document.getElementById("conf").innerHTML = confianza + "%";
        fetch("https://api.mymemory.translated.net/get?q=" + dibujo + "&langpair=en|es")
        .then(response => response.json())
        .then(data => {
            traduccion = data.responseData.translatedText;
            document.getElementById("parece").innerHTML = traduccion;
            mensaje = new SpeechSynthesisUtterance("parece " + traduccion);
            mensaje.lang = "es-MX";
            voz.speak(mensaje);
            });
    }
}

function borrar() {
    background("white");
}