function Player(x, y) {
    this.x = x,
    this.y = y,
    this.speed = 5,
    this.size = 25,
    this.direction = "right",
    this.fireMode = 1,
    this.health = 100,
    this.score = 0,
    this.level = -1
}

function drawPlayer(p) {
    /*fill(239, 192, 254)
    triangle(p.x, p.y, p.x + p.size, p.y, p.x + p.size/2, p.y - p.size)
    fill(32, 210, 244)*/
    image(imgSideShip, p.x, p.y - p.size)
    /*triangle(p.x + p.size, p.y, p.x + p.size * 2, p.y, p.x + ( 3 * p.size )/2, p.y - 2 * p.size)*/
    image(imgMainShip, p.x + p.size, p.y - p.size * 2 )
    /*fill(239, 192, 254)
    triangle(p.x + 2 * p.size, p.y, p.x + p.size * 3, p.y, p.x + ( 5 * p.size)/2, p.y - p.size)*/
    image(imgSideShip, p.x + 2 * p.size, p.y - p.size)

}

function movePlayer(p, border) {
    if (keyIsPressed) {
        switch (p.direction) {
            case "up":
                if ((p.y -= p.speed) < border.upperBorder) p.y = border.upperBorder
                else p.y -= p.speed
                break
            case "down":
                if ((p.y += p.speed) > border.lowerBorder) p.y = border.lowerBorder
                else p.y += p.speed
                break
            case "right":
                if ((p.x += p.speed) > border.rightBorder) p.x = border.rightBorder
                else p.x += p.speed
                break
            case "left":
                if ((p.x -= p.speed) < border.leftBorder) p.x = border.leftBorder
                else p.x -= p.speed
                break
        }
    }
}

function playerBorderCollision(p, border) {
    console.log(border.leftBorder)
    return !(p.x > border.leftBorder && p.x < border.rightBorder && p.y < border.upperBorder && p.y > border.lowerBorder)
}

function fire() {
    switch (p.fireMode) {
        case 1:
            if (frameCount % 15 === 0) {
                moveBullet(bullets.unshift(new StdBullet((p.x + ( 3 * p.size )/2), (p.y - 2 * p.size))))
            }
            break
        case 2:
            if (frameCount % 30 === 0) {
                
                moveBullet(bullets.unshift(new Sidearm()))
            }
    }
}

function showScore() {
    push()
    fill("yellow")
    textSize(15)
    text(`Score: ${p.score}`, border.leftBorder + 10, border.upperBorder - 3 * p.size)
    pop()
}

function showHealth() {
    push()
    if ( p.health > 70) {
        fill(0, 255, 0)
    }
    else if ( p.health > 30) {
        fill(255, 128, 0)
    }
    else {
        fill(255, 0, 0)
    }
    textSize(15)
    text(`Health: ${p.health}`, border.rightBorder - 15 , border.upperBorder - 3 * p.size)
    pop()
}

function winLevel() {
    if (enemies.length === 0) {
        enemies.splice(0)
        bullets.splice(0)
        p.level = 0
        showWinScreen()
    }
    else {
        return
    }
}

function gameOver() {
    push()
    fill("white")
    textSize(30)
    textAlign(CENTER, CENTER)
    text(`GAME OVER!`, WIDTH/2, HEIGHT/2)
    textSize(20)
    text(`Your Score: ${p.score}`, WIDTH/2, HEIGHT/2 + 40)
    noLoop()
    pop()
}

function hitPlayer() {
    for (let i = 0 ; i < enemyBullets.length ; i++) {
        if ( enemyBullets[i].y >= (p.y - p.size) && enemyBullets[i].x >= p.x && enemyBullets[i].x <= p.x + ( 5 * p.size)/2 ) {
            p.health -= enemyBullets[i].dmg
            enemyBullets.splice(i, 1)
            showHealth()
            if ( p.health <= 0) {
                showHealth()
                gameOver()
            }
        }
    }
}