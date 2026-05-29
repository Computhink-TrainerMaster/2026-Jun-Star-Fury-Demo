/*
==========================================
VARIABLES
==========================================
*/
// Day 1 Task 3: Create canvas width 800, height 500
let canvas;

// Day 1 Task 4: Load the background image
let bgImg;
// Day 1 Task 6: Load the Player Image
let playerImg;

// Day 1 Task 7: Create the Player Sprite
let playerSprite, playerScaleFactor;
let playerWidth = 100;

// Day 1 Task 11: Create and Shoot a Bullet
let bulletImg, bulletSprite, bulletScaleFactor;
let bulletWidth = 10;

// Day 2 Task 1: Create A Bullet Group
let bullets;

// Day 2 Task 3: Create Random Enemies
let enemyImg, enemies, enemyWidth, enemyScaleFactor;

// Day 2 Task 7: Create Score Logic
let score = 0;

// Day 2 Task 8: Create Lives Logic
let lives = 3;

// Day 2 Task 10: Create Game States
let gameState = "start";

// Day 2 Task 11: Create The Start Screen Panel
let panelX, panelY;
let panelW = 500;
let panelH = 300;
let panelRadius = 25;

// Day 2 Task 12: Add The Start Screen Text
let textSizeValue = 30;
let lineHeight = textSizeValue * 1.5;

let centerX, centerY, titleY, controlsY, startY;

let titleText = "STAR FURY";
let controlsText = "Move: LEFT/RIGHT    Shoot: SPACE";
let startText = "Press SPACE To Start";

// Day 2 Task 15 Part A: Create the end screen panel
let endPanelX, endPanelY;
let endPanelW = 500;
let endPanelH = 340;
let endPanelRadius = 25;

// Day 2 Task 15 Part B: Add The End Screen Text
let endTextSize = 30;
let endLineHeight = endTextSize * 1.5;
let highScore = 0;
let endCenterX, endCenterY;

let gameOverY, finalScoreY, highScoreY, restartY;

let gameOverText = "GAME OVER";
let finalScoreText;
let highScoreText;
let restartText = "Press R To Restart";

// Day 2 Task 20: Add Sound Effects
let shootSound, enemyHitSound, playerHitSound, gameOverSound;

// Power-up sound effects and music
let bgm, shieldPickupSound, shieldOnSound, laserSound;

// Day 3 Task 1: Load Multiple Enemy Images
let obstacleImgs = [];

let currentObsImageIndex = 0;

let columnCount, columnPadding, totalGapSpace, columnEnemyWidth;

let jump;

let asteroidHeight;

let rowDistance = 180;
let obsSpeed = 0.5;
let initialSpawnRate = 60;
let spawnRate;

let level = 1;
let levelGap = 20;

let baseSpeed = 0.5;

let particleCount = 8;
let particleDirection;

let shakeFrames, shakeX, shakeY;
let shakeStrength = 5;

let scorePopups;

let colliderProperties = "none";

// Power-up groups and sprites
let powerUps;
let shieldSprite;

// Power-up images
let shieldOrbImg, shield1Img, shield2Img;
let laserImg, laserOrbImg;

// Power-up settings
let powerUpInterval = 360;
let powerUpSize = 50;
let powerUpSpeed = 3;

let shieldActive = false;
let shieldTimer = 0;
let shieldDuration = 300;
let shieldSize = 130;

let laserActive = false;
let laserTimer = 0;
let laserDuration = 90;
let laserWidth = 90;
let laserHitWidth = 45;

let stars;
let gameFontMedium, gameFontBlack;
let justStarted = false;

function preload() {

    bgImg = loadImage("assets/image/background.png");

    playerImg = loadImage("assets/image/spaceship1.png");

    bulletImg = loadImage("assets/image/bullet.png");

    enemyImg = loadImage("assets/image/Obstacle1.png");

    shootSound = loadSound("assets/sounds/shooting_sound.mp3");
    enemyHitSound = loadSound("assets/sounds/blast.mp3");
    playerHitSound = loadSound("assets/sounds/player_get_hit.mp3");
    gameOverSound = loadSound("assets/sounds/game_over.mp3");

    bgm = loadSound("assets/sounds/game_bgm.mp3");
    shieldPickupSound = loadSound("assets/sounds/shield_orb_taken.mp3");
    shieldOnSound = loadSound("assets/sounds/shield_on.mp3");
    laserSound = loadSound("assets/sounds/laser.wav");

    shieldOrbImg = loadImage("assets/image/shield orb.png");
    shield1Img = loadImage("assets/image/shield (1).png");
    shield2Img = loadImage("assets/image/shield (2).png");

    laserImg = loadImage("assets/image/laser.png");
    laserOrbImg = loadImage("assets/image/laser orb.png");

    for (let i = 1; i <= 10; i++) {
        obstacleImgs.push(loadImage(`assets/image/Obstacle${i}.png`));
    }
    gameFontMedium = loadFont("assets/font/Orbitron-Medium.ttf");
    gameFontBlack = loadFont("assets/font/Orbitron-Black.ttf");

    scorePopups = new Group();
}

function setup() {

    new Canvas(800, 500);

    setSoundVolume(shootSound, 0.4);
    setSoundVolume(enemyHitSound, 0.8);
    setSoundVolume(playerHitSound, 0.8);
    setSoundVolume(gameOverSound, 0.8);
    setSoundVolume(bgm, 0.2);
    setSoundVolume(shieldPickupSound, 0.8);
    setSoundVolume(shieldOnSound, 0.8);
    setSoundVolume(laserSound, 0.8);

    playerSprite = new Sprite();
    playerSprite.img = playerImg;
    playerSprite.w = playerImg.width;
    playerSprite.h = playerImg.height;
    playerScaleFactor = playerWidth / playerImg.width;
    playerSprite.scale = playerScaleFactor;

    playerSprite.x = width / 2;
    playerSprite.y = height - playerSprite.h / 2;

    playerSprite.collider = colliderProperties;

    bullets = new Group();

    enemies = new Group();

    powerUps = new Group();

    shieldSprite = setupSprite(shield1Img, shieldSize, colliderProperties);
    shieldSprite.visible = false;
    let laserDisplayImg = laserImg.get();
    laserDisplayImg.resize(laserWidth, height);
    laserSprite = setupSprite(laserDisplayImg, laserWidth, colliderProperties);
    laserSprite.visible = false;

    stars = new Group();

    for (let i = 0; i < 80; i++) {

        let star = new Sprite();

        star.x = random(width);
        star.y = random(height);

        star.diameter = random(2, 5);

        star.color = "white";
        star.stroke = "white";

        star.speed = random(0.5, 2);
        star.direction = 90;

        star.collider = "none";

        stars.add(star);
    }
}

function draw() {
    shakeX = 0;
    shakeY = 0;

    if (shakeFrames > 0) {
        shakeX = random(-shakeStrength, shakeStrength);
        shakeY = random(-shakeStrength, shakeStrength);
        shakeFrames--;
    }

    translate(shakeX, shakeY);
    updateStars();
    imageMode(CENTER);
    image(bgImg, width / 2, height / 2, width, height);

    if (gameState == "start") {

        panelX = width / 2;
        panelY = height / 2;
        rectMode(CENTER);

        fill("#0F1428");
        stroke("#00FFFF");
        strokeWeight(3);

        rect(panelX, panelY, panelW, panelH, panelRadius);

        centerX = panelX;
        centerY = panelY;

        titleY = centerY - lineHeight * 2;
        controlsY = centerY;
        startY = centerY + lineHeight * 2;

        textAlign(CENTER, CENTER);
        textSize(textSizeValue);
        textFont(gameFontBlack);

        let titleWidth = textWidth(titleText);
        let controlsWidth = textWidth(controlsText);
        let startWidth = textWidth(startText);

        let widestText = max(
            titleWidth,
            controlsWidth,
            startWidth
        );

        panelW = widestText + 120;

        noStroke();

        fill("#00FFFF");
        text(titleText, centerX, titleY);

        fill("#DCDCDC");
        text(controlsText, centerX, controlsY);

        fill("#FFD84D");
        text(startText, centerX, startY);

        if (kb.presses(" ")) {
            userStartAudio();
            gameState = "run";
            justStarted = true;

            if (bgm && !bgm.isPlaying()) {
                bgm.loop();
            }
        }

    } else if (gameState == "run") {

        if (score % levelGap == 0) {
            currentObsImageIndex = level - 1;
        }

        currentObsImageIndex = currentObsImageIndex % 10;
        enemyImg = obstacleImgs[currentObsImageIndex];

        level = floor(score / levelGap) + 1;

        if (kb.pressing("left")) {
            playerSprite.x -= 5;
        }

        if (kb.pressing("right")) {
            playerSprite.x += 5;
        }

        playerSprite.x = constrain(playerSprite.x, playerSprite.w / 2, width - playerSprite.w / 2);

        if (kb.presses(" ") && !laserActive) {
            let bulletSprite = new Sprite();
            bulletSprite.img = bulletImg;
            bulletSprite.w = bulletImg.width;
            bulletSprite.h = bulletImg.height;
            bulletScaleFactor = bulletWidth / bulletImg.width;
            bulletSprite.scale = bulletScaleFactor;

            bulletSprite.x = playerSprite.x;
            bulletSprite.y = playerSprite.y - playerSprite.h / 2 - bulletSprite.h / 2;
            bulletSprite.collider = colliderProperties;
            bullets.add(bulletSprite);

            playSoundOnce(shootSound);
        }

        for (let bullet of bullets) {
            bullet.y -= 10;

            if (bullet.y < -bullet.h / 2) {
                bullet.remove();
            }
        }

        obsSpeed = baseSpeed + (level - 1) * 0.05;

        spawnRate = floor(rowDistance / obsSpeed);

        if ((frameCount - initialSpawnRate) % spawnRate == 0 || justStarted == true) {
            justStarted = false;
            columnCount = floor(random(4, 9));
            columnPadding = floor(random(5, 10));
            totalGapSpace = (columnPadding * 2) * columnCount;
            columnEnemyWidth = (width - totalGapSpace) / columnCount;

            jump = width / columnCount;
            enemyWidth = columnEnemyWidth;

            asteroidHeight = floor(random(40, 60));

            let enemyDisplayImg = enemyImg.get();

            if (currentObsImageIndex < 5) {
                enemyDisplayImg.resize(enemyWidth, asteroidHeight);
            }

            for (let i = 0; i < columnCount; i++) {
                let enemySprite = new Sprite();
                enemySprite.img = enemyDisplayImg;

                enemySprite.w = enemyDisplayImg.width;
                enemySprite.h = enemyDisplayImg.height;

                enemyScaleFactor = enemyWidth / enemyDisplayImg.width;
                enemySprite.scale = enemyScaleFactor;

                enemySprite.x = jump / 2 + jump * i;
                enemySprite.y = -enemySprite.h * 3;
                enemySprite.collider = colliderProperties;
                enemies.add(enemySprite);
            }
        }

        for (let enemy of enemies) {
            enemy.y += 2;

            if (enemy.y > enemy.h / 2 + height) {
                enemy.remove();
            }
        }

        if (frameCount % powerUpInterval == 0) {
            spawnPowerUp();
        }

        updatePowerUps();
        if (shieldSprite) {
            updateShield();
        }
        if (laserSprite) {
            updateLaser();
        }


        for (let enemy of enemies) {
            for (let bullet of bullets) {
                if (bullet.overlapping(enemy)) {
                    destroyEnemy(enemy, "+1");
                    bullet.remove();
                    score = score + 1;
                    break;
                }
            }

            if (enemy.overlapping(playerSprite)) {
                createExplosion(enemy.x, enemy.y);

                enemy.remove();

                if (shieldActive) {
                    shakeFrames = 6;
                } else {
                    playSoundOnce(playerHitSound);
                    lives -= 1;
                    shakeFrames = 10;
                }

                break;
            }
        }

        textSize(30);
        fill("white");
        let margin = 20;
        allSprites.draw();

        textFont(gameFontBlack);
        textAlign(LEFT, TOP);
        text(`Score: ${score}`, margin, margin);

        textAlign(RIGHT, TOP);
        text(`Lives: ${lives}`, width - margin, margin);

        textAlign(CENTER, TOP);
        text(`Level: ${level}`, width / 2, margin);

        if (shieldActive) {
            textFont(gameFontMedium);
            textSize(16);
            fill("#00FFFF");
            textAlign(LEFT, TOP);
            text(`Shield: ${ceil(shieldTimer / 60)}s`, margin, margin + 40);
        }

        if (laserActive) {
            textFont(gameFontMedium);
            textSize(16);
            fill("#FF78FF");
            textAlign(RIGHT, TOP);
            text(`Laser: ${ceil(laserTimer / 60)}s`, width - margin, margin + 40);
        }

        if (lives <= 0) {
            gameState = "end";

            if (bgm && bgm.isPlaying()) {
                bgm.stop();
            }

            if (laserSound && laserSound.isPlaying()) {
                laserSound.stop();
            }

            playSoundOnce(gameOverSound);
        }

    } else {
        enemies.removeAll();
        bullets.removeAll();
        powerUps.removeAll();

        shieldSprite.visible = false;
        laserSprite.visible = false;

        shieldActive = false;
        laserActive = false;

        if (laserSound && laserSound.isPlaying()) {
            laserSound.stop();
        }

        if (score > highScore) {
            highScore = score;
        }

        finalScoreText = `Final Score: ${score}`;
        highScoreText = `High Score: ${highScore}`;

        endPanelX = width / 2;
        endPanelY = height / 2;

        rectMode(CENTER);
        fill("#0F1428");
        stroke("#FF3B3B");
        strokeWeight(3);
        rect(endPanelX, endPanelY, endPanelW, endPanelH, endPanelRadius);

        endCenterX = endPanelX;
        endCenterY = endPanelY;
        gameOverY = endCenterY - endLineHeight * 3;
        finalScoreY = endCenterY - endLineHeight;
        highScoreY = endCenterY + endLineHeight;
        restartY = endCenterY + endLineHeight * 3;
        
        textFont(gameFontBlack);
        textAlign(CENTER, CENTER);
        textSize(endTextSize);
        noStroke();

        fill("#FF3B3B");
        text(gameOverText, endCenterX, gameOverY);

        fill("#DCDCDC");
        text(finalScoreText, endCenterX, finalScoreY);

        fill("#00FFFF");
        text(highScoreText, endCenterX, highScoreY);

        fill("#FFD84D");
        text(restartText, endCenterX, restartY);

        if (kb.presses("r")) {
            gameState = "run";
            justStarted = true;
            score = 0;
            lives = 3;
            level = 1;
            currentObsImageIndex = 0;

            shieldActive = false;
            shieldTimer = 0;

            laserActive = false;
            laserTimer = 0;

            enemies.removeAll();
            bullets.removeAll();
            powerUps.removeAll();
            scorePopups.removeAll();

            playerSprite.x = width / 2;
            playerSprite.y = height - playerSprite.h / 2;

            if (bgm && !bgm.isPlaying()) {
                bgm.loop();
            }
        }
    }
}

function spawnPowerUp() {
    let powerUpImage, powerUpSprite, powerUpType;
    if (random() < 0.5) {
        powerUpType = "shield";
        powerUpImage = shieldOrbImg;
    } else {
        powerUpType = "laser";
        powerUpImage = laserOrbImg;
    }
    powerUpSprite = setupSprite(powerUpImage, powerUpSize, colliderProperties);
    powerUpSprite.type = powerUpType;
    powerUpSprite.x = random(powerUpSize, width - powerUpSize);
    powerUpSprite.y = -powerUpSize;

    powerUps.add(powerUpSprite);
}

function updatePowerUps() {
    for (let powerUp of powerUps) {
        powerUp.y += powerUpSpeed;

        if (powerUp.overlapping(playerSprite)) {
            if (powerUp.type == "shield") {
                activateShield();
            }

            if (powerUp.type == "laser") {
                activateLaser();
            }

            powerUp.remove();
        }

        if (powerUp.y > height + powerUp.h / 2) {
            powerUp.remove();
        }
    }
}

function activateShield() {
    shieldActive = true;
    shieldTimer = shieldDuration;

    playSoundOnce(shieldPickupSound);
    playSoundOnce(shieldOnSound);
}

function updateShield() {
    if (!shieldActive) {
        shieldSprite.visible = false;
        return;
    }

    shieldTimer--;

    shieldSprite.visible = true;
    shieldSprite.x = playerSprite.x;
    shieldSprite.y = playerSprite.y;

    if (frameCount % 20 < 10) {
        shieldSprite.img = shield1Img;
    } else {
        shieldSprite.img = shield2Img;
    }

    if (shieldTimer <= 0) {
        shieldActive = false;
        shieldSprite.visible = false;
    }
}

function activateLaser() {
    laserActive = true;
    laserTimer = laserDuration;
    shakeFrames = 8;

    if (laserSound && !laserSound.isPlaying()) {
        laserSound.loop();
    }
}

function updateLaser() {
    if (!laserActive) {
        laserSprite.visible = false;
        return;
    }

    laserTimer--;

    laserSprite.visible = true;
    laserSprite.x = playerSprite.x;
    laserSprite.y = height / 2 - playerSprite.h / 4; //height is adjusted to let the laser and player to be seamlessly connected
    // p5play adaptation:
    // The laser is a sprite hitbox instead of a raw rectangle distance check.
    for (let enemy of enemies) {
        if (laserSprite.overlapping(enemy)) {
            destroyEnemy(enemy, "+1");
            score = score + 1;
        }
    }

    if (laserTimer <= 0) {
        laserActive = false;
        laserSprite.visible = false;

        if (laserSound && laserSound.isPlaying()) {
            laserSound.stop();
        }
    }
}

function destroyEnemy(enemy, scoreText) {
    playSoundOnce(enemyHitSound);

    createExplosion(enemy.x, enemy.y);

    shakeFrames = 10;

    let scoreSprite = new Sprite();

    scoreSprite.text = scoreText;

    scoreSprite.x = enemy.x;
    scoreSprite.y = enemy.y;

    scoreSprite.textColor = "yellow";
    scoreSprite.textSize = 24;
    scoreSprite.color = color(0, 0, 0, 0);
    scoreSprite.stroke = color(0, 0, 0, 0);

    scoreSprite.collider = colliderProperties;

    scoreSprite.life = 30;

    scoreSprite.direction = 270;
    scoreSprite.speed = 1;

    scorePopups.add(scoreSprite);

    enemy.remove();
}

function createExplosion(x, y) {
    for (let i = 0; i < particleCount; i++) {
        let particle = new Sprite();

        particle.x = x;
        particle.y = y;

        particle.diameter = random(6, 12);
        particle.color = "orange";
        particle.stroke = "orange";
        particle.collider = colliderProperties;

        particleDirection = i * (360 / particleCount) + (180 / particleCount);
        particle.direction = particleDirection;
        particle.speed = random(2, 5);
        particle.life = random(20, 30);
    }
}

function setSoundVolume(soundFile, volume) {
    if (soundFile) {
        soundFile.setVolume(volume);
    }
}

function playSoundOnce(soundFile) {
    if (soundFile) {
        soundFile.stop();
        soundFile.play();
    }
}

function setupSprite(img, desiredWidth, colliderProperties) {
    newSprite = new Sprite();
    newSprite.img = img;
    newSprite.w = img.width;
    newSprite.h = img.height;
    scaleFactor = desiredWidth / img.width;
    newSprite.scale = scaleFactor;
    newSprite.collider = colliderProperties;
    return newSprite
}

function updateStars() {

    for (let star of stars) {

        if (star.y > height) {

            star.y = 0;
            star.x = random(width);
            star.diameter = random(1, 5);

            star.color = "white";
            star.stroke = "white";

            star.speed = random(0.5, 1);
        }
    }
}