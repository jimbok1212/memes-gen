'use strict'


var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gElCanvas = document.getElementById('my-canvas');
var gCtx;

var gImgs = [
    { id: 2, url: 'images/2.jpg', keywords: ['happy'] },
    { id: 1, url: 'images/1.jpg', keywords: ['happy'] },
    { id: 3, url: 'images/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'images/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'images/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'images/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'images/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'images/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'images/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'images/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'images/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'images/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'images/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'images/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'images/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'images/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'images/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'images/18.jpg', keywords: ['happy'] },
];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'first line',
            size: 40,
            pos: {
                x: 300,
                y: 50
            },
            align: 'center',
            color: 'white',
            font: 'IMPACT',
            
        },
        {
            txt: 'second line',
            size: 40,
            pos: {
                x: 300,
                y: 550
            },
            align: 'center',
            color: 'white',
            font: 'IMPACT',
        }
    ],
}

function getMeme(){
    return gMeme
}

function updateMeme(idx) {
    gMeme.selectedImgId = idx;
}

function updateText(elInput) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].txt = elInput.value
    renderCanvas()
}

function renderCanvas() {
    drawImg(gMeme.selectedImgId, renderText)
}

function drawImg(idx, callback = console.log) {
    gMeme.selectedImgId = idx
    const img = new Image()
    img.src = `images/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        callback()
    }
}

function renderText() {
    let currLineIdx = gMeme.selectedLineIdx;
    gMeme.lines.forEach((lines, idx) => {
        gMeme.selectedLineIdx = idx;
        if (idx === currLineIdx) {
            drawText('selected')
        } else drawText()
    })
    gMeme.selectedLineIdx = currLineIdx
}

function drawText(selected = 0) {
    var text = gMeme.lines[gMeme.selectedLineIdx].txt;
    var x = gMeme.lines[gMeme.selectedLineIdx].pos.x;
    var y = gMeme.lines[gMeme.selectedLineIdx].pos.y;
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size
    var font = gMeme.lines[gMeme.selectedLineIdx].font
    var color = gMeme.lines[gMeme.selectedLineIdx].color
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${fontSize}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    gCtx.strokeStyle = selected ? 'orange' : 'white'
    var lineHeight = fontSize * 1.25
    var textWidth = gCtx.measureText(text).width;
    gCtx.strokeRect(x - textWidth / 2 - 10, y - lineHeight + 10, textWidth + 20, lineHeight);
}

function newLine() {
    let line = {
        pos: {
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2
        },
        txt: 'New Line',
        size: 40,
        align: 'center',
        color: 'white',
        font: 'Impact',
        isDragging: false
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderText()
}

function removeLine() {
    if (gMeme.lines.length === 0) return
    gMeme.lines.splice([gMeme.selectedLineIdx], 1)
    gMeme.selectedLineIdx = 0
    renderCanvas()
}

function changeSize(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].size + diff <= 20 ||
        gMeme.lines[gMeme.selectedLineIdx].size + diff >= 100) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
    renderCanvas()
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    renderCanvas()
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'memes-by-Jimmy'
}

