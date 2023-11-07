const player = document.getElementById('player');
const beatIndicator = document.getElementById('beat-indicator');
const gameContainer = document.getElementById('game-container');
const lanes = 5;
let currentLane = 2; // Start in the middle lane (0-indexed)
const laneHeight = 100;
const playerWidth = 50;
const playerHeight = 50;

// Set the tempo (in BPM)
const tempo = 40; // You can adjust this as needed

// Calculate the duration of a beat in milliseconds
const beatDuration = (60 / tempo) * 1000;

// Calculate the distance the beat indicator should travel
const distanceToTravel = window.innerWidth;

// Calculate the speed (distance per millisecond) of the beat indicator
const speed = distanceToTravel / beatDuration;

// Variables to track player state
let isRed = false; // Red player state
let isGreen = false; // Green player state
let isActionOnCooldown = false; // Action cooldown state
const actionCooldownDuration = 200; // 5 seconds (adjust as needed)

// ... (previous code)




// Projectiles configuration
const projectileWidth = 20;
const projectileHeight = 20;
const projectileSpeed = 20.000516; // Adjust the speed as needed
gameContainer.style.width = `${window.innerWidth * 1000}px`; // Adjust the width as needed
const projectiles = [];

// Load the embedded projectile scenario
const projectileScenario = JSON.parse(document.getElementById('projectileScenario').textContent);

// Function to move the player to a specific lane
function movePlayer(toLane) {
    if (toLane >= 0 && toLane < lanes) {
        currentLane = toLane;
        const targetTop = toLane * laneHeight;
        player.style.transition = 'top 0.2s';
        player.style.top = `${targetTop}px`;
    }
}

// Create a new projectile and add it to the game container
function createProjectile(laneIndex) {
    const projectile = document.createElement('div');
    projectile.classList.add('projectile');
    projectile.style.width = `${projectileWidth}px`;
    projectile.style.height = `${projectileHeight}px`;
    projectile.style.left = '2000%';
    projectile.style.top = `${laneIndex * laneHeight + laneHeight / 2 - projectileHeight / 2}px`; // Center in the lane
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
                player.style.backgroundColor = playerColor.hit;
                console.log('Collision detected with a projectile!');
                incrementHitCounter();
                collisionCooldown = true;

                // Reset the cooldown after a delay (adjust the delay as needed)
                setTimeout(() => {
                    collisionCooldown = false;
                    player.style.backgroundColor = playerColor.default;
                }, 300); // 1 second cooldown
            }
        });

        // Check collisions with the beat indicator
        const beatPosition = beatIndicator.getBoundingClientRect();
        const beatX = beatPosition.left + beatPosition.width / 2;
        const beatY = beatPosition.top + beatPosition.height / 2;

        if (
            Math.abs(playerX - beatX) <= (playerWidth + beatPosition.width) / 2 &&
            Math.abs(playerY - beatY) <= (playerHeight + beatPosition.height) / 2 && !isGreen
        ) {
            // Handle collision with the beat indicator
            player.style.backgroundColor = playerColor.hit;
            console.log('Collision detected with the beat indicator!');
            incrementHitCounter();
            collisionCooldown = true;

            // Reset the cooldown after a delay (adjust the delay as needed)
            setTimeout(() => {
                collisionCooldown = false;
                player.style.backgroundColor = playerColor.default;
            }, 300); // 1 second cooldown
        }
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
            player.style.backgroundColor = playerColor.success; // Apply a class for the green player state
            isGreen = true;
            isActionOnCooldown = true;

            // Set a timer to reset the player color and action state after the cooldown
            setTimeout(() => {
                player.style.backgroundColor = playerColor.default // Remove the class to revert to the default state
                isGreen = false;
            }, actionCooldownDuration);

            setTimeout(() => {
                isActionOnCooldown = false;
            }, 2*actionCooldownDuration);
        }
    }
});

let currentScenarioIndex = 0; // Track the current scenario
let previousTimestamp = 0;

// Function to update the beat indicator's position and handle projectile spawning
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

    // Update the beat indicator position
    const progress = (timestamp % beatDuration) / beatDuration;
    const indicatorPosition = distanceToTravel - (distanceToTravel * progress);
    beatIndicator.style.left = `${indicatorPosition}px`;

    // Continue with the rest of your logic
    // checkPlayerHitRange();
    moveProjectiles();
    checkCollisions();

    requestAnimationFrame(updateBeatIndicator);
}


const playerColor = {
    default: '#0000ff',
    hit: '#ff0000', // Red player state
    success: '#00ff00', // Green player state
    not: 'fff'
};

// let isHitRange = false; // Flag to track if the player is in the hit range

// // Function to check if the player is in the hit range and update its color
// function checkPlayerHitRange() {
//     const playerPosition = player.getBoundingClientRect();
//     const beatPosition = beatIndicator.getBoundingClientRect();

//     const playerX = playerPosition.left + playerPosition.width / 2;
//     const beatX = beatPosition.left + beatPosition.width / 2;

//     if (Math.abs(playerX - beatX) <= 30) {
//         isHitRange = true;
//         player.style.backgroundColor = playerColor.hit;
//         collisionCooldown = true;
//         // Reset the cooldown after a delay (adjust the delay as needed)
//         setTimeout(() => {
//             collisionCooldown = false;
//             player.style.backgroundColor = playerColor.default;
//             isHitRange = false;
//         }, 300); // 1 second cooldown
//     } 
// }
    // else {
    //     if (isHitRange == true)
    //     {
    //         isHitRange = false;
    //         player.style.backgroundColor = playerColor.default;
    //     }
        
    //}


// // Listen for spacebar key presses to check if the player is in the hit range and change color
// document.addEventListener('keydown', (event) => {
//     if (event.key === ' ' && isHitRange) {
//         player.style.backgroundColor = playerColor.success;
//     }
// });

// // Listen for spacebar key releases to reset the player color
// document.addEventListener('keyup', (event) => {
//     if (event.key === ' ') {
//         player.style.backgroundColor = playerColor.default;
//     }
// });

// Listen for spacebar key presses to check if the player is in the hit range and change color or perform the action



// Start the beat indicator animation
requestAnimationFrame(updateBeatIndicator);

// Initialize player position and color
movePlayer(currentLane);
player.style.backgroundColor = playerColor.default;
