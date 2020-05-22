const express = require('express')
const { registerFont, createCanvas, loadImage } = require('canvas')
const app = express()
const port = 3000


// We need to register our font file to be used in canvas
registerFont('./fonts/Sign-Painter-Regular.ttf', { family: 'signpainter' })

app.get('/header', (req, res) => {

    // Grab first name from query
    let firstname = decodeURI(req.query.name) + "!";

    // Define the canvas
    const width = 600 // width of the image
    const height = 474 // height of the image
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    // Define the font style
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillStyle = '#FFFFFF'
    context.font = "70px 'signpainter' bold";

    // Load and draw the background image first
    loadImage('./images/background.jpg').then(image => {

        // Draw the background
        context.drawImage(image, 0, 0, 600, 474)

        // Draw the text
        context.fillText(firstname, 300, 150)

        // Convert the Canvas to a buffer
        const buffer = canvas.toBuffer('image/png')

        // Set and send the response as a PNG
        res.set({ 'Content-Type': 'image/png' });
        res.send(buffer)
    })
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))