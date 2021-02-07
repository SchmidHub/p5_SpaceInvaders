function StdBullet(x, y) {
    this.tag = "std",
    this.x = x,
    this.y = y,
    this.speed = 10,
    this.size = 10,
    this.dmg = 10
}

function Sidearm() {
    this.tag = "side";
    this.x1 = (p.x + p.size/2), 
    this.y1 = (p.y - p.size),
    this.x2 = (p.x + ( 5 * p.size)/2),
    this.y2 = (p.y - p.size),
    this.speed = 10,
    this.size = 4,
    this.dmg = 7
}

function stdEnemyBullet(x, y) {
    this.tag = "stdEne",
    this.x = x,
    this.y = y,
    this.speed = 10,
    this.size = 10,
    this.dmg = 10
}

function moveBullet() {
    push()
    noFill()
    for ( let i = 0; i < bullets.length ; i++) {
        if (bullets[i].tag === "std") {
            circle(bullets[i].x, bullets[i].y -= bullets[i].speed, bullets[i].size) // p5 Circle
            image(imgStdBullet, bullets[i].x - bullets[i].size/2, bullets[i].y) //image
        }
        else if (bullets[i].tag === "side") {
            stroke(32, 210, 244)
            strokeWeight(bullets[i].size)
            strokeCap(ROUND)
            line(bullets[i].x1, bullets[i].y1 -= bullets[i].speed, bullets[i].x2, bullets[i].y2 -= bullets[i].speed)
        }
    }
    clearBulletsStack();
    pop()
}

function clearBulletsStack() {
    for ( let i = bullets.length - 1 ; i > 0 ; i--) {
        if (bullets[i].y < 0 || bullets[i].y1 < 0) {
            bullets.pop()
        }
        else continue
    }
    for ( let i = enemyBullets.length - 1 ; i > 0 ; i--) {
        if (enemyBullets[i].y > HEIGHT) {
            enemyBullets.pop()
        }
        else continue
    }
}