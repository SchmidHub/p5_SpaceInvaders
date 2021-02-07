function Border(width, height) {
    this.upperBorder = (height - height/3.5) + p.size * 2 ,
    this.lowerBorder = height,
    this.leftBorder = 0,
    this.rightBorder = width - p.size * 3
}

function showWinScreen() {
    fill("white")
    textSize(30)
    textAlign(CENTER, CENTER)
    text(`YOU WIN!`, WIDTH/2, HEIGHT/2)
    noLoop()
}

function startScreen() {
    push()
    fill("white")
    textSize(30)
    textAlign(CENTER, CENTER)
    text(`Press space to start!`, WIDTH/2, HEIGHT/2)
    textSize(20)
    text(`Arrow keys to control your spaceship.`, WIDTH/2, HEIGHT/2 + 40)
    text(`Space to switch between weapons.`, WIDTH/2, HEIGHT/2 + 65)
    pop()
}

function drawBorder() {
    push()
    stroke(224, 224, 224)
    line(0, border.upperBorder - 2 * p.size, WIDTH, border.upperBorder - 2 * p.size)
    pop()
}