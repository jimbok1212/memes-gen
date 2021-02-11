'use strict'

function init() {
    renderImages(18)
    gCtx = gElCanvas.getContext('2d');
}

function renderImages(count) {
    var strHTML = ``
    for (var i = 1; i <= count; i++) {
        strHTML += `<img src="images/${i}.jpg" alt="photo" class="gallery-img" onclick="onMemeEditor(${i})">`
    }
    document.querySelector('.images-container').innerHTML = strHTML
}



function onMemeEditor(idx) {
    document.querySelector('.images-container').classList.toggle('hidden')
    document.querySelector('.meme-editor').classList.toggle('hidden')
    updateMeme(idx)
    renderCanvas()
}

function onGallery() {
    document.querySelector('.images-container').classList.remove('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
}

function onNewLine() {
    newLine()
}

function onRemoveLine() {
    removeLine()
}

function onChangeSize(diff) {
    changeSize(diff)
}

function onChangeColor(elInput) {
    changeColor(elInput.value)
}

function moveUp(){
    var currMeme=getMeme()
    var moveLeft=currMeme.lines[0].pos
    moveLeft.y-=20;
    renderCanvas()
    
}
function moveDown(){
    var currMeme=getMeme()
    var moveLeft=currMeme.lines[0].pos
    moveLeft.y+=20;
    renderCanvas()
}
function moveLeft(){
    var currMeme=getMeme()
    var moveLeft=currMeme.lines[0].pos
    moveLeft.x-=20;
    // console.log(moveLeft)
    renderCanvas()
}

function moveRight(){
    var currMeme=getMeme()
    var moveLeft=currMeme.lines[0].pos
    moveLeft.x+=20;
    renderCanvas()
}