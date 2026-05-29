/*
==========================================
VARIABLES
==========================================
*/
// Task 1.1 : Create canvas width 800, height 500
let canvas;

// Task 1.2: Load the background image
let bgImg;

// Task 1.4: Load the Player Image
let playerImg;

// Task 1.5: Create the Player Sprite
let playerSprite, playerScaleFactor;
let playerWidth = 100;

// Task 2.1: Create and Shoot a Bullet
let bulletImg, bulletSprite, bulletScaleFactor;
let bulletWidth = 10;

// Task 2.3: Create And Move Multiple Bullets
let bullets;

// Task 3.1: Create Random Enemies
let enemyImg, enemies, enemyWidth, enemyScaleFactor;

// Task 3.3: Use None Colliders
let colliderProperties = "none";

// Task 5.1: Create Score Logic
let score = 0;

// Task 5.2: Create Lives Logic
let lives = 3;

// Task 6.1: Create Game States
let gameState = "start";

// Task 6.2: Create The Start Screen Panel
// Panel settings
let panelX, panelY;
let panelW = 500;
let panelH = 300;
let panelRadius = 25;

// Task 6.3: Add The Start Screen Text
// Task 6.3: Text settings
let textSizeValue = 30;
let lineHeight = textSizeValue * 1.5;

// Task 6.3: Text position settings
let centerX, centerY, titleY, controlsY, startY;

// Task 6.3: Text values
let titleText = "STAR FURY";
let controlsText = "Move: ←  →    Shoot: SPACE";
let startText = "Press SPACE To Start";

// Task 6.6A: Create the end screen panel
// End screen panel settings
let endPanelX, endPanelY;
let endPanelW = 500;
let endPanelH = 340;
let endPanelRadius = 25;

// Task 6.6B: Add The End Screen Text
// End Screen Text settings
let endTextSize = 30;
let endLineHeight = endTextSize * 1.5;
let highScore = 0;
let endCenterX, endCenterY;
// END SCREEN TEXT VALUES
let gameOverText = "GAME OVER";
let finalScoreText;
let highScoreText;
let restartText = "Press R To Restart";
// END SCREEN TEXT POSITIONS
let gameOverY, finalScoreY, highScoreY, restartY;

// Task 6.11:  Add Sound Effects
let shootSound, enemyHitSound, playerHitSound, gameOverSound;

// Task 7.1:  Load Multiple Enemy Images
let obstacleImgs = [];

// Task 7.2:  Cycle Enemy Images Automatically
let currentObsImageIndex = 0;

// Task 7.3:  Create Random Column Settings
let columnCount, columnPadding, totalGapSpace, columnEnemyWidth;

// Task 7.4:  Create Enemy Columns Using A Loop
let jump;

// Task 7.5:  Apply Different Height Rules
let asteroidHeight;

//Task 7.6: Create New Obstacle Rows Over Time
let rowDistance = 180;
let obsSpeed = 0.5;
let initialSpawnRate = 60
let spawnRate;

// Task 7.7: Create The Level Difficulty System
let level = 1;
let levelGap = 20;

// Task 7.8: Create The Level Difficulty System
let baseSpeed = 0.5;

// Task 8.1: Create Explosion Particles
let particleCount = 8;
let particleDirection;

// Task 8.3 Create Screen Shake Effect
let shakeFrames, shakeX, shakeY;
let shakeStrength = 5;

// Task 8.4: Create Screen Shake Effect
let scorePopups;



function preload() {

    // Task 1.2: Load the background image
    bgImg = loadImage("assets/image/background.png");

    // Task 1.4: Load the Player Image
    playerImg = loadImage("assets/image/spaceship1.png");

    // Task 2.1: Create and Shoot a Bullet
    bulletImg = loadImage("assets/image/bullet.png");

    // Task 3.1: Create Random Enemies
    enemyImg = loadImage("assets/image/obstacle1.png");

    // Task 6.11:  Add Sound Effects
    shootSound = loadSound("assets/sounds/shooting_sound.mp3");
    enemyHitSound = loadSound("assets/sounds/blast.mp3");
    playerHitSound = loadSound("assets/sounds/player_get_hit.mp3")
    gameOverSound = loadSound("assets/sounds/game_over.mp3")

    // Task 7.1:  Load Multiple Enemy Images
    for (let i = 1; i <= 10; i++) {
        obstacleImgs.push(loadImage(`assets/image/Obstacle${i}.png`))
    }

    // Task 8.4: Creating Floating Score Text 
    scorePopups = new Group();


}

function setup() {

    // Task 1.2: Create canvas width 800, height 500
    canvas = new Canvas(800, 500);

    // Task 1.5: Create the Player Sprite
    playerSprite = new Sprite();
    playerSprite.img = playerImg;
    playerSprite.w = playerImg.width;
    playerSprite.h = playerImg.height;
    playerScaleFactor = playerWidth / playerImg.width;
    playerSprite.scale = playerScaleFactor;

    // Task 1.6: Position the Player Sprite
    playerSprite.x = width / 2;
    playerSprite.y = height - playerSprite.h / 2
    
    // Task 3.3 Use None Colliders
    playerSprite.collider = colliderProperties

    // Task 2.1: Create and Shoot a Bullet
    // bulletSprite = new Sprite();
    // bulletSprite.img = bulletImg;
    // bulletScaleFactor = bulletWidth / bulletImg.width;
    // bulletSprite.scale = bulletScaleFactor;

    // bulletSprite.w = bulletWidth;
    // bulletSprite.h = bulletImg.height * bulletScaleFactor;

    // Task 2.3: Create And Move Multiple Bullets
    bullets = new Group();

    // Task 3.1: Create Random Enemies
    enemies = new Group();
}

function draw() {
    // Task 8.3:  Create Screen Shke Effect
    shakeX = 0; shakeY = 0;
    if (shakeFrames > 0) {
        shakeX = random(-shakeStrength, shakeStrength);
        shakeY = random(-shakeStrength, shakeStrength);

        shakeFrames--;
    }

    translate(shakeX, shakeY);

    // Task 1.3: Display the background image
    imageMode(CENTER);
    image(bgImg, canvas.w / 2, canvas.h / 2, canvas.w, canvas.h);


    // Task 6.1 Create Game States
    if (gameState == "start") {

        // Day 2 Task 11: Create The Start Screen Panel
        // Draw panel
        panelX = width / 2;
        panelY = height / 2;
        rectMode(CENTER);

        fill("#0F1428");
        stroke("#00FFFF");
        strokeWeight(3);

        rect(panelX, panelY, panelW, panelH, panelRadius);

        // Day 2 Task 12: Add The Start Screen Text
        // Text position settings
        centerX = panelX;
        centerY = panelY;

        titleY = centerY - lineHeight * 2;
        controlsY = centerY;
        startY = centerY + lineHeight * 2;
        // Draw text
        textAlign(CENTER, CENTER);
        textSize(textSizeValue);

        noStroke();

        fill("#00FFFF");
        text(titleText, centerX, titleY);

        fill("#DCDCDC");
        text(controlsText, centerX, controlsY);

        fill("#FFD84D");
        text(startText, centerX, startY);

        // Task 6.4: Start The Game
        if (kb.presses(" ")) {
            gameState = "run";
        }

    } else if (gameState == "run") {
        // Task 7.2:  Cycle Enemy Images Automatically
        // if (frameCount % 600 == 0) {
        //     currentObsImageIndex++;
        // }
        // Task 7.9: Match Enemy Images With Levels
        if (score % levelGap == 0) {
            currentObsImageIndex = level - 1;
        }
        currentObsImageIndex = currentObsImageIndex % 10;
        enemyImg = obstacleImgs[currentObsImageIndex];

        // Task 7.7: Translate Score Into Levels
        level = floor(score / levelGap) + 1;

        // Task 1.7: Move the Player Left and Right
        if (kb.pressing("left")) {
            playerSprite.x -= 5;
        }

        if (kb.pressing("right")) {
            playerSprite.x += 5;
        }

        // Day 1 Task 1.8: Prevent the Player from Leaving the Screen
        playerSprite.x = constrain(playerSprite.x, playerSprite.w / 2, width - playerSprite.w / 2)

        // Task 2.1: Create and Shoot a Bullet
        // if (kb.pressing(" ")) {
        //     bulletSprite.x = playerSprite.x;
        //     bulletSprite.y = playerSprite.y - playerSprite.h/2 - bulletSprite.h / 2;
        // }
        // bulletSprite.y -= 10;

        // Task 2.2
        // if (kb.presses(" ")){
        //     bulletSprite.x = playerSprite.x;
        //     bulletSprite.y = playerSprite.y - playerSprite.h/2 - bulletSprite.h / 2;
        // }


        // Task 2.3: Create And Move Multiple Bullets
        if (kb.presses(" ")) {
            let bulletSprite = new Sprite();
            bulletSprite.img = bulletImg;
            bulletSprite.w = bulletImg.width;
            bulletSprite.h = bulletImg.height;
            bulletScaleFactor = bulletWidth / bulletImg.width;
            bulletSprite.scale = bulletScaleFactor;

            bulletSprite.x = playerSprite.x;
            bulletSprite.y = playerSprite.y - playerSprite.h / 2 - bulletSprite.h / 2;
            
            // Task 3.3: Use None Colliders
            bulletSprite.collider = colliderProperties
            bullets.add(bulletSprite);
            // Task 6.11:  Add Sound Effects
            shootSound.play()
        }

        // Task 2.4: Remove Off-Screen Bullets
        for (let bullet of bullets) {
            bullet.y -= 10;
            if (bullet.y < - bullet.h / 2) {
                bullet.remove()
            }
        }

        // Task 3.2: Create Enemies Repeatedly
        // if (frameCount % 60 == 0) {
        //     // Task 3.1: Create Random Enemies
        //     enemyWidth = random(40, 80);
        //     let enemySprite = new Sprite();
        //     enemySprite.img = enemyImg;
        //     enemySprite.w = enemyImg.width;
        //     enemySprite.h = enemyImg.height;
        //     enemyScaleFactor = enemyWidth / enemyImg.width;
        //     enemySprite.scale = enemyScaleFactor;
        //     enemySprite.x = random(enemySprite.w / 2, width - enemySprite.w / 2);
        //     enemySprite.y = random(-enemySprite.h * 2, -enemySprite.h / 2);

        //     // Task 3.3 Use None Colliders
        //     enemySprite.collider = colliderProperties;
        //     enemies.add(enemySprite);
        // }

        // Task 7.8: Create The Level Difficulty System
        obsSpeed = baseSpeed + (level - 1) * 0.05;
        //Task 7.6: Create New Obstacle Rows Over Time
        spawnRate = floor(rowDistance / obsSpeed);
        if ((frameCount - initialSpawnRate) % spawnRate == 0) {
            // Task 7.3: Create Random Column Settings
            columnCount = floor(random(4, 9));
            columnPadding = floor(random(5, 10));
            totalGapSpace = (columnPadding * 2) * columnCount;
            columnEnemyWidth = (width - totalGapSpace) / columnCount;

            // Task 7.4:  Create Enemy Columns Using A Loop
            jump = width / columnCount;
            enemyWidth = columnEnemyWidth;

            // Task 7.5:  Apply Different Height Rules
            asteroidHeight = floor(random(40, 60));

            let enemyDisplayImg = enemyImg.get();
            if (currentObsImageIndex < 5) {

                enemyDisplayImg.resize(enemyWidth, asteroidHeight);
            }
  

            // Task 7.4:  Create Enemy Columns Using A Loop
            for (let i = 0; i < columnCount; i++) {
                let enemySprite = new Sprite();
                enemySprite.img = enemyDisplayImg;


                enemySprite.w = enemyDisplayImg.width;
                enemySprite.h = enemyDisplayImg.height;

                enemyScaleFactor = enemyWidth / enemyDisplayImg.width;
                enemySprite.scale = enemyScaleFactor;

                // Task 7.4:  Create Enemy Columns Using A Loop
                enemySprite.x = jump / 2 + jump * i;
                enemySprite.y = -enemySprite.h * 3

                enemySprite.collider = colliderProperties;
                enemies.add(enemySprite);

            }
        }

        for (let enemy of enemies) {
            enemy.y += 2;
            if (enemy.y > enemy.h / 2 + height) {
                enemy.remove()
            }
        }


        // Task 4.1 Check Collision Part A: Bullet vs Enemy
        for (let enemy of enemies) {
            for (let bullet of bullets) {
                if (bullet.overlapping(enemy)) {
                    // scoreTextX = enemy.x;
                    // scoreTextY = enemy.y;
                    // Task 6.11:  Add Sound Effects
                    enemyHitSound.play();
                    // Task 8.1: Create Explosion Particles
                    for (let i = 0; i < particleCount; i++) {
                        let particle = new Sprite();

                        particle.x = enemy.x;
                        particle.y = enemy.y;

                        particle.diameter = random(6, 12);
                        particle.color = "orange";
                        particle.stroke = "orange";
                        particle.collider = colliderProperties;
                        particleDirection = i * (360 / particleCount) + (180 / particleCount);
                        particle.direction = particleDirection;
                        particle.speed = random(2, 5);
                        particle.life = random(20, 30);
                    }

                    // Task 8.3 Create Screen Shake Effect
                    shakeFrames = 10;

                    // Task 8.4 Create Floating Text
                    let scoreSprite = new Sprite();

                    scoreSprite.text = "+1";

                    scoreSprite.x = enemy.x;
                    scoreSprite.y = enemy.y;

                    scoreSprite.textColor = "yellow";
                    scoreSprite.textSize = 20;
                    scoreSprite.color = color(0, 0, 0, 0);
                    scoreSprite.stroke = color(0, 0, 0, 0);

                    scoreSprite.collider = colliderProperties;

                    scoreSprite.life = 30;

                    scoreSprite.direction = 270;
                    scoreSprite.speed = 1;

                    scorePopups.add(scoreSprite);



                    bullet.remove();
                    enemy.remove();
                    // Task 5.1 Create Score Logic
                    score = score + 1;
                    break;
                }
            }

            // Task 4.1 Check Collision Part B Player vs Enemy
            if (enemy.overlapping(playerSprite)) {
                // Task 6.11:  Add Sound Effects
                playerHitSound.play();
                // Task 8.2: Add Explosion To Player Collision
                for (let i = 0; i < particleCount; i++) {
                    let particle = new Sprite();

                    particle.x = enemy.x;
                    particle.y = enemy.y;

                    particle.diameter = random(6, 12);
                    particle.color = "orange";
                    particle.stroke = "orange";
                    particle.collider = colliderProperties;
                    particleDirection = i * (360 / particleCount) + (180 / particleCount);
                    particle.direction = particleDirection;
                    particle.speed = random(2, 5);
                    particle.life = random(20, 30);
                }

                enemy.remove();

                // Task 5.2: Create Lives Logic
                lives -= 1;
                break;
            }
        }
        allSprites.draw();
        // Task 5.3: Display Score and Lives
        textSize(30);
        fill("white");
        let margin = 20;
        // Display Score
        textAlign(LEFT, TOP);
        text(`Score: ${score}`, margin, margin);

        // Display Lives
        textAlign(RIGHT, TOP);
        text(`Lives: ${lives}`, width - margin, margin);

        // Task 7.10: Display The Current Level
        textAlign(CENTER, TOP);
        text(`Level: ${level}`, width / 2, margin);

        // Task 6.5:Switch to The End Game State
        if (lives <= 0) {
            gameState = "end";
            // Task 6.11:  Add Sound Effects
            gameOverSound.play();
        }
    } else {
        // Task 6.7:  Remove Remaining Bullets and Enemies
        enemies.removeAll();
        bullets.removeAll();

        //Task 6.9:  Update The High Score
        if (score > highScore) {
            highScore = score;
        }

        // Task 6.8: Update The Final Score Text 
        finalScoreText = `Final Score: ${score}`;
        highScoreText = `High Score: ${highScore}`;

        // if (highScore < score) {
        //     highScore = score;
        // }
        // Task 6.6A: Create the end screen panel
        endPanelX = width / 2;
        endPanelY = height / 2;

        // DRAW END SCREEN PANEL
        rectMode(CENTER);
        fill("#0F1428");
        stroke("#FF3B3B");
        strokeWeight(3);
        rect(endPanelX, endPanelY, endPanelW, endPanelH, endPanelRadius);

        // Task 6.6B: Add The End Screen Text
        endCenterX = endPanelX;
        endCenterY = endPanelY;
        gameOverY = endCenterY - endLineHeight * 3;
        finalScoreY = endCenterY - endLineHeight;
        highScoreY = endCenterY + endLineHeight;
        restartY = endCenterY + endLineHeight * 3;
        // DRAW END SCREEN TEXT
        textAlign(CENTER, CENTER);
        textSize(endTextSize);
        noStroke();

        // Game Over Title
        fill("#FF3B3B");
        text(gameOverText, endCenterX, gameOverY);

        // Final Score
        fill("#DCDCDC");
        text(finalScoreText, endCenterX, finalScoreY);

        // High Score
        fill("#00FFFF");
        text(highScoreText, endCenterX, highScoreY);

        // Restart Prompt
        fill("#FFD84D");
        text(restartText, endCenterX, restartY);

        // Task 6.10:  Restart The Game
        if (kb.presses("r")) {
            gameState = "run";
            score = 0;
            lives = 3;
            currentObsImageIndex = 0;
        }
    }
}