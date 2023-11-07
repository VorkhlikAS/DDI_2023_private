// Get references to the start button and game music
const startButton = document.getElementById('start-button');
const gameMusic = document.getElementById('game-music');
const beatIndicator = document.getElementById('beat-indicator');
const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');

const lanes = 5;
let currentLane = 2; // Start in the middle lane (0-indexed)
const laneHeight = 100;
const playerWidth = 50;
const playerHeight = 50;
let userWaitingTime = 0; // Initialize the user's waiting time
// Set the tempo (in BPM)
const tempo = 118; // You can adjust this as needed

// Calculate the duration of a beat in milliseconds
const beatDuration = (60 / tempo) * 1000 / 2;
const timingScale = beatDuration * 4 / 1000;
// Calculate the distance the beat indicator should travel
const distanceToTravel = window.innerWidth;

// Calculate the speed (distance per millisecond) of the beat indicator

const speed = distanceToTravel / beatDuration + 10;

// Variables to track player state
let isRed = false; // Red player state
let isGreen = false; // Green player state
let isActionOnCooldown = false; // Action cooldown state
const actionCooldownDuration = 200; // 5 seconds (adjust as needed)
let consecutiveDodges = 0; // Initialize the consecutive dodges counter
// Variables to track beat indicators
const beatIndicators = [];
const beatIndicatorWidth = 20; // Adjust the width as needed
let playerDodged = false;
// Projectiles configuration
const projectileWidth = 120;
const projectileHeight = 120;
//const projectileSpeed = 20.000516; // Adjust the speed as needed
const projectileSpeed = speed; // Adjust the speed as needed
gameContainer.style.width = `${window.innerWidth * 1000}px`; // Adjust the width as needed
const projectiles = [];

// Load the embedded projectile scenario
const projectileScenario = JSON.parse(document.getElementById('projectileScenario').textContent);
projectileScenario.forEach(event => {
    event.timing = event.timing * timingScale * 1.04;
});
console.log(timingScale, beatDuration);
console.log(projectileScenario);

function playGameMusic() {
  gameMusic.play();
}

function pauseGameMusic() {
  gameMusic.pause();
}

function replayGameMusic() {
  gameMusic.currentTime = 0; // Rewind the music to the beginning
  playGameMusic();
}

// Listen for the "ended" event and replay the music when it ends
gameMusic.addEventListener('ended', function () {
  replayGameMusic();
});

const playerColor = {
    default: '#ffffff',
    hit: '#ff0000', // Red player state
    success: '#00ff00', // Green player state
    not: 'fff'
};

const adjustedDistance = distanceToTravel;

// Calculate the time delay to start the music based on the adjusted distance
const timeDelay = (adjustedDistance * 13) / speed;

// Function to start the game when the start button is clicked
function startGame() {
    projectileScenario.forEach((scenario) => {
        scenario.timing += userWaitingTime;
      });
    setTimeout(() => {
        playGameMusic();
      }, timeDelay); // Start the game music
    startButton.style.display = 'none'; // Hide the start button

    // Function to move the player to a specific lane
    function movePlayer(toLane) {
        if (toLane >= 0 && toLane < lanes) {
            currentLane = toLane;
            const targetTop = toLane * laneHeight;
            player.style.transition = 'top 0.2s';
            player.style.top = `${targetTop}px`;
        }
    }

    function createProjectile(laneIndex) {
        const projectile = document.createElement('img'); // Create an <img> element
        projectile.src = './assets/images/projectiles/oCJQv0q.gif'; // Set the source to your GIF file
        projectile.classList.add('projectile');
        projectile.style.width = `${projectileWidth}px`;
        projectile.style.height = `${projectileHeight}px`;
        projectile.style.left = '2000%';
        projectile.style.top = `${laneIndex * laneHeight + laneHeight / 2 - projectileHeight / 2}px`;

        gameContainer.appendChild(projectile);
        projectiles.push(projectile);

    }

    // Remove a projectile from the game container
    function removeProjectile(projectile) {
        gameContainer.removeChild(projectile);
        const index = projectiles.indexOf(projectile);
        if (index !== -1) {
            projectiles.splice(index, 1);
        }
    }

    function showTextMessage(message) {
        const textMessage = document.createElement('div');
        textMessage.classList.add('text-message');
        textMessage.textContent = message;
        gameContainer.appendChild(textMessage);

        setTimeout(() => {
            // Remove the text message after a delay (adjust as needed)
            gameContainer.removeChild(textMessage);
        }, 1000); // Text message disappears after 2 seconds
    }

    function handleSuccessfulDodge(dodged) {
        if (dodged && !playerDodged) {
            playerDodged = true;
            consecutiveDodges++;
            if (consecutiveDodges === 1) {
                showTextMessage("Nice Dodge!");
            } else if (consecutiveDodges === 2) {
                showTextMessage("Double Dodge!");
            } else {
                showTextMessage(`Consecutive Dodges: ${consecutiveDodges}`);
            }
        } else if (!playerDodged) {
            consecutiveDodges = 0;
        }
    }



    // Move projectiles from right to left and remove them when they go off the screen
    function moveProjectiles() {
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const projectile = projectiles[i];
            const leftPosition = parseInt(projectile.style.left, 10);

            if (leftPosition <= -projectileWidth) {
                // Remove the projectile from the game container and the array
                removeProjectile(projectile);
            } else {
                projectile.style.left = `${leftPosition - projectileSpeed}px`;
            }
        }
    }

    function playerDamage() {
        player.style.borderColor = playerColor.hit;
        player.src = 'assets/images/Neco-Arc-4814387.gif';
        collisionCooldown = true;
        handleSuccessfulDodge(false);

        setTimeout(() => {
            collisionCooldown = false;
            // player.style.backgroundColor = playerColor.default;
            player.style.borderColor = playerColor.default;
            player.src = 'assets/images/Juszxkl.gif';
        }, 300); // 1 second cooldown
    }

    function playerDodge() {
        player.style.borderColor = playerColor.success;
        player.src = 'assets/images/breakdance-neco-arc.gif';

        isGreen = true;
        isActionOnCooldown = true;

        // Set a timer to reset the player color and action state after the cooldown
        setTimeout(() => {
            // player.style.backgroundColor = playerColor.default // Remove the class to revert to the default state
            player.style.borderColor = playerColor.default;
            isGreen = false;
            playerDodged = false;
        }, actionCooldownDuration);

        setTimeout(() => {
            player.src = 'assets/images/Juszxkl.gif';
            isActionOnCooldown = false;
        }, 2*actionCooldownDuration);
    }

    let hitCounter = 0; // Initialize the hit counter

    // Track the cooldown for collisions
    let collisionCooldown = false;

    // Check for collisions between the player and projectiles or the beat indicator
    function checkCollisions() {
        if (!collisionCooldown) {
            const playerPosition = player.getBoundingClientRect();
            const playerX = playerPosition.left + playerWidth / 2;
            const playerY = playerPosition.top + playerHeight / 2;

            // Check collisions with projectiles
            projectiles.forEach((projectile) => {
                const projectilePosition = projectile.getBoundingClientRect();
                const projectileX = projectilePosition.left + projectileWidth / 2;
                const projectileY = projectilePosition.top + projectileHeight / 2;

                if (
                    Math.abs(playerX - projectileX) <= (playerWidth + projectileWidth) / 2 &&
                    Math.abs(playerY - projectileY) <= (playerHeight + projectileHeight) / 2 && !isGreen
                ) {
                    // Handle collision with a projectile
                    // player.style.backgroundColor = playerColor.hit;
                    playerDamage();
                    console.log('Collision detected with a projectile!');
                    incrementHitCounter();
                    // Reset the cooldown after a delay (adjust the delay as needed)
                    
                } else if (Math.abs(playerX - projectileX) <= (playerWidth + projectileWidth) / 2 &&
                Math.abs(playerY - projectileY) <= (playerHeight + projectileHeight) / 2  && isGreen) {
                    handleSuccessfulDodge(true);
                }
            });

            beatIndicators.forEach((indicator) => {
                const beatPosition = indicator.getBoundingClientRect();
                const beatX = beatPosition.left + beatPosition.width / 2;
                const beatY = beatPosition.top + beatPosition.height / 2;

                if (
                    Math.abs(playerX - beatX) <= (playerWidth + beatPosition.width) / 2 &&
                    Math.abs(playerY - beatY) <= (playerHeight + beatPosition.height) / 2 && !isGreen
                ) {
                    // Handle collision with the beat indicator
                    // player.style.backgroundColor = playerColor.hit;
                    console.log('Collision detected with the beat indicator!');
                    incrementHitCounter();
                    playerDamage();
                } else if (Math.abs(playerX - beatX) <= (playerWidth + beatPosition.width) / 2 &&
                Math.abs(playerY - beatY) <= (playerHeight + beatPosition.height) / 2 && isGreen) {
                    handleSuccessfulDodge(true);
                }
            });

            // // Check collisions with the beat indicator
            
        }
    }

    // Function to increment the hit counter and update the display
    function incrementHitCounter() {
        hitCounter++;
        const hitCounterElement = document.getElementById('hit-counter');
        if (hitCounterElement) {
            hitCounterElement.textContent = `Hits: ${hitCounter}`;
        }
    }

    // Function to increment the hit counter and update the display
    function incrementHitCounter() {
        hitCounter++;
        const hitCounterElement = document.getElementById('hit-counter');
        if (hitCounterElement) {
            hitCounterElement.textContent = `Hits: ${hitCounter}`;
        }
    }

    // Listen for arrow key presses to move the player
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            movePlayer(currentLane - 1);
        } else if (event.key === 'ArrowDown') {
            movePlayer(currentLane + 1);
        } else if (event.key === ' ') {
            console.log('space');
            if (!isActionOnCooldown) {
                // player.style.backgroundColor = playerColor.success; // Apply a class for the green player state
                playerDodge();
            }
        }
    });

    let currentScenarioIndex = 0; // Track the current scenario
    let previousTimestamp = 0;

    // Function to update the beat indicator's position and handle projectile and beat indicator spawning
function updateBeatIndicator(timestamp) {
    if (currentScenarioIndex < projectileScenario.length) {
        const scenario = projectileScenario[currentScenarioIndex];
        const scenarioTimestamp = scenario.timing;

        if (timestamp >= scenarioTimestamp) {
            for (const laneIndex of scenario.lanes) {
                createProjectile(laneIndex - 1); // Adjust the index if necessary
            }

            currentScenarioIndex++;
        }
    }
    // Update the beat indicator and projectile positions
    const progress = (timestamp % beatDuration) / beatDuration;
    const indicatorPosition = distanceToTravel - (distanceToTravel * progress);
    // beatIndicator.style.left = `${indicatorPosition}px`;

    moveProjectiles();
    moveBeatIndicators(); // Function to move the beat indicators
    checkCollisions();

    requestAnimationFrame(updateBeatIndicator);
}

function updateBeat() {
    createBeatIndicator();
    setTimeout(() => {
        requestAnimationFrame(updateBeat);
    }, beatDuration * 4); // 1 second cooldown

}

// Function to create a beat indicator
function createBeatIndicator() {
    const indicator = document.createElement('div');
    indicator.classList.add('beat-indicator');
    indicator.style.left = '2000%'; // Starting position on the right
    gameContainer.appendChild(indicator);
    beatIndicators.push(indicator);
}

// Function to move beat indicators from right to left and remove them when they go off the screen
function moveBeatIndicators() {
    for (let i = beatIndicators.length - 1; i >= 0; i--) {
        const indicator = beatIndicators[i];
        const leftPosition = parseInt(indicator.style.left, 10);

        if (leftPosition <= -beatIndicatorWidth) {
            // Remove the beat indicator from the game container and the array
            removeBeatIndicator(indicator);
        } else {
            indicator.style.left = `${leftPosition - speed}px`;
        }
    }
}

// Remove a beat indicator from the game container
function removeBeatIndicator(indicator) {
    gameContainer.removeChild(indicator);
    const index = beatIndicators.indexOf(indicator);
    if (index !== -1) {
        beatIndicators.splice(index, 1);
    }
}

    // Start the beat indicator animation
    requestAnimationFrame(updateBeatIndicator);
    requestAnimationFrame(updateBeat);
    // Initialize player position and color
    movePlayer(currentLane);


}

// Add a click event listener to the start button
//startButton.addEventListener('click', startGame);

// Listen for the "load" event to record the time when the page loaded
window.addEventListener('load', function () {
    const pageLoadTime = Date.now();
  
    // Add a click event listener to the start button
    startButton.addEventListener('click', function () {
      // Calculate the user's waiting time when the start button is clicked
      const startButtonClickTime = Date.now();
      userWaitingTime = startButtonClickTime - pageLoadTime;
  
      // Start the game
      startGame();
    });
  });
