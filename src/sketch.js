const WIDTH = 600
const HEIGHT = 600
let p
let border
const bullets = []
const enemies = []
const enemyBullets = []

// For images
function preload() {
    imgSimpleEnemyOneFH = loadImage('media/SimpleEnemyOneFH.png')
    imgSimpleEnemyOneLH = loadImage('media/SimpleEnemyOneLH.png')
    imgStdBullet = loadImage('media/StdBullet.png')
    imgSideShip = loadImage('media/SideShip.png')
    imgMainShip = loadImage('media/MainShip.png')
}

function setup() {
    frameRate(120)
    createCanvas(WIDTH, HEIGHT)
    p = new Player(WIDTH/2, HEIGHT - 10)
    border = new Border(WIDTH, HEIGHT)
    spawnEnemies(40)
}

function draw() {
    background(0)
    showScore()
    showHealth()
    drawPlayer(p)
    movePlayer(p, border)
    drawEnemy()
    fire()
    moveBullet()
    hit()
    hitPlayer()
    winLevel()
    drawBorder()
    if (p.level === -1) {
        noLoop()
        startScreen() 
    }
}

function keyPressed() {
    switch(keyCode) {
        case UP_ARROW:
            p.direction = "up"
            break 
        case DOWN_ARROW:
            p.direction = "down"
            break 
        case LEFT_ARROW:
            p.direction = "left"
            break 
        case RIGHT_ARROW:
            p.direction = "right"
            break 
        case 32:
            if (p.fireMode === 1 && p.level != -1) p.fireMode = 2
            else p.fireMode = 1
            if (p.level === -1) {
                p.level = 1
                loop()
            }
            break
        default:
            p.direction = null
            break
    }
}

