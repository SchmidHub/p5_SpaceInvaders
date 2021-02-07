function SimpleEnemyOne(x, y, dir) {
    this.tag = 1,
    this.x = x,
    this.y = y,
    this.dir = dir,
    this.speed = 2,
    this.size = 25,
    this.health = 20,
    this.points = 5
}

function spawnEnemies(amount) {
    let maxX = WIDTH/(2 * 25)
    let maxY = Math.ceil(amount/maxX)
    let x = 12.5
    let y = 25
    for (let i = 0; i < maxY; i++) {
        for (let j = 0; j < maxX; j++ ) {
            if (i === 0){
                enemies.unshift(new SimpleEnemyOne(x, y, "right"))
            }
            else {
                enemies.unshift(new SimpleEnemyOne(x, y, "right"))
            }
            x += 50
        }
        x = 12.5
        y += 2 * 25
    }
}

function drawEnemy() {
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].health > 10) {
            //fill(255,51,51)       //no image
            image(imgSimpleEnemyOneFH, enemies[i].x, enemies[i].y)
        }
        else {
            //fill(255,255,51)      //no image
            image(imgSimpleEnemyOneLH, enemies[i].x, enemies[i].y)
        // square(enemies[i].x, enemies[i].y, enemies[i].size, 3) //p5 square
        }
    }
    basicAttack()
    moveSimpleEnemy()
}

function moveSimpleEnemy() {
    for (let i = 0; i < enemies.length; i++) {
        switch (enemies[i].dir) {
            case "right":
                if (enemies[i].x < WIDTH - enemies[i].size) {
                    enemies[i].x += enemies[i].speed
                }
                else { 
                    enemies[i].dir = "left"
                    enemies[i].y += enemies[i].size
                        if ( (enemies[i].y + enemies[i].size) >= border.upperBorder - 2 * p.size) {
                            enemies[i].y += enemies[i].size
                            gameOver()
                        }
                }
            break
            case "left": 
            if (enemies[i].x > 0) {
                enemies[i].x -= enemies[i].speed
            }
            else { 
                enemies[i].dir = "right"
                enemies[i].y += enemies[i].size
                    if ( (enemies[i].y + enemies[i].size) >= border.upperBorder - 2 * p.size) {
                        enemies[i].y += enemies[i].size
                        gameOver()
                    }
            }
            break
        }
    }
}

function hit() {
    
    for (let j = 0 ; j < enemies.length; j++) {
        for (let i = 0; i < bullets.length; i++) {
            switch (bullets[i].tag) {
                case "std":
                    if (( bullets[i].x + bullets[i].size/2 >= enemies[j].x && bullets[i].x - bullets[i].size/2  <= (enemies[j].x + enemies[j].size)) && (bullets[i].y <= enemies[j].y + enemies[j].size) && (bullets[i].y >= enemies[j].y - enemies[j].size )) {
                        enemies[j].health -= bullets[i].dmg
                        bullets.splice(i, 1)
                        if ( enemies[j].health <= 0) die(j)
                    }
                    break
                    case "side":
                        if ((enemies[j].x >= bullets[i].x1 && enemies[j].x <= bullets[i].x2) && ( enemies[j].y + enemies[j].size >= bullets[i].y1 )) {
                            enemies[j].health -= bullets[i].dmg
                            bullets.splice(i, 1)
                            if ( enemies[j].health <= 0) die(j)
                        }
                        break
            }
        }
    }
}

function die(enemyIndex) {
    p.score += enemies[enemyIndex].points
    enemies.splice(enemyIndex, 1)
}

function basicAttack() {
    push()
    fill("red")
    var attackerIndex = Math.floor(Math.random() * Math.floor(enemies.length))
    if (frameCount % 30 === 0) {
        enemyBullets.unshift( new stdEnemyBullet( enemies[attackerIndex].x + enemies[attackerIndex].size / 2, enemies[attackerIndex].y + enemies[attackerIndex].size ))
    }
    for (let i = 0; i < enemyBullets.length ; i++ ) {
        enemyBullets[i].y += enemyBullets[i].speed
        circle(enemyBullets[i].x, enemyBullets[i].y, enemyBullets[i].size)
    }
    pop()
}