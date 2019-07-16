// p5.js API:  https://p5js.org/reference/#/p5/loadImage
// ml5.js API: https://ml5js.org/reference/

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let canvas
let canvasWidth = 500
let canvasHeight = 400
let classifier
let input
let img
let predictLabel
let predictConfidence

function preload() {
  classifier = ml5.imageClassifier('MobileNet')
}

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight).center()

  input = createFileInput(handleFile)
  input.position(10, 20)

  setupLabel()
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  if (error) {
    console.error(error)
  } else {
    print(results)
    predictLabel.html('Label: ' + results[0].label)
    predictConfidence.html('Confidence: ' + nf(results[0].confidence, 0, 2))
  }
}

function setupLabel() {
  predictLabel = createDiv()
  predictConfidence = createDiv()

  const pos = canvas.position()
  print(pos)
  predictLabel.position(pos.x, pos.y + canvasHeight + 10)
  predictConfidence.position(pos.x, pos.y + canvasHeight + 30)
}

function handleFile(file) {
  print(file)
  if (file.type === 'image') {
    loadImage(file.data, img => {
      image(img, 0, 0, width, height)
      classifier.classify(img, gotResult)
    })
  } else {
    img = null
  }
}
