# Kawabanga

Kawabanga is an exciting and challenging browser-based rhythm dodging game. Test your reflexes and see how long you can survive against the oncoming obstacles in different lanes.

> For better experience play in 80% resolution mode when launching game in your browser

![Alt Text](https://github.com/VorkhlikAS/DDI_2023_private/blob/HW5/game/docs/demo.gif)
## How to Play

1. **Run the Game**: To play Kawabanga, simply open the `index.html` file in your web browser.

2. **Game Controls**:
   - Use the **Arrow Up** and **Arrow Down** keys to move your character up and down between different lanes.
   - Press the **Spacebar** to perform a dodge maneuver to avoid obstacles.

3. **Objective**: Dodge the projectiles and beat indicators by moving in the right lane and performing dodges when needed.

4. **Scoring**: Your goal is to survive as long as possible. You earn points for every successful dodge and the longer you survive.

5. **Game Over**: If you get hit by a projectile or beat indicator, it's game over. Your final score will be displayed.

## Game Features

- Fast-paced and challenging gameplay.
- Catchy background music to keep you in the groove.
- Dodge obstacles with precise timing and agility.
- Test and improve your reflexes as you play.

## Enjoy the Game and Good Luck!

Feel the rhythm, dodge with precision, and try to achieve the highest score in Kawabanga! Have fun and enjoy the game.

![Kawabanga Gameplay](screenshot.png)

## Attribution

The game "Kawabanga" was created using HTML, CSS, and JavaScript.

## Credits

This game is inspired by classic rhythm games and brought to you by [Your Name].

If you encounter any issues or have feedback, please let us know. Happy dodging!

# Game in the making

## Generating graphics

Using [stable-diffusion-online](https://stablediffusionweb.com/#ai-image-generator) following graphical elements were generated:

1. Background image (Guidance Scale:8-12):
You could try tinkering with Guidance Scale but values from 8-12 worked best for me.
```
artistic, evening, night time, new York, American, street, suburbs, crosswalk, road,
lanes, parked cars, neighborhood, break dance gang, pavement, side walk, horizontal,
parallel, left-to-right, houses, ground level, skyline, houses row, view from side,
street lights, night, ground point of view, houses, fire-safety stairs, ghetto 
```
2. Car models (Guidance Scale:7-9)
Figuring this one out was kinda hard, but in the end I've got what I wanted after about 30 tries. After getting the car image I removed background using some online services and mirrored it horizontally.
```
car, from side view, moving, model, single car, right to left, no background,
dark background, uniform background, one, american, dodge, old, side
```
## Generating source code

Here's are the prompts I used to develop the main.js source code as well as other resources for the game

> Hello, I need your help developing a rhythm game using JavaScript. The game will be launched from an Index.html file. First of all, I want you to tell me if there are some ways of developing such game that will make the process easier or less tedious.
> Second, I want you to recommend me a project directory structure so that it would be logical.
> Ok, now I want you to write some code for my game. I want my game to be a rhythmic game with beat indicators that fly through the screen, and some projectiles that player will have to avoid colliding with. 
> So accounting for my intended game plan can you generate index.html file and that js code that will run this game? 
> Can you change the scritp in such a way so that the player would be visible on the screen. I also need a mechanism of generating projectiles and beat indicators. 
> Also I've decided that the player should be constraint to moving vertically on 4-5 lanes in which the projectiles will launch.
> Account for new instructions and make necessary changes
> Lets for now randomly generate projectiles, there should also be a mechanism that will take into account the tempo of the melody and spawn beat indicators on tempo. Change the code accordingly
> For some reason the game isn't working as it should. For example, there are errors in the mechanism of spawning beats. Can you fix those?
> Hello, I am developing a game on js that allows player to move between 5 lanes vertically avoiding collision with projectiles flying right to left. I need your help creating a bar line that flies through the screen from right to left and on collision with the player model which is a blue circle it should turn the player model red. 
> Here's the script for the game I've got so far:
> Hello, I am developing a game as you will see later and I need the mechanism for moving the beat indicator to be the same as projectile movement, meaning that beat indicators should be spawning and moving from right to left. Can you do that? 
> I am expecting the fully rewritten code for my main.js code 
> Something is wrong, I don't see any beat indicators on my screen
> It seems like there are still some mistakes left can you fix them?
> Can you give me full code for this file, without any placeholders as it is hard to navigate with them
> I need to calculate the time I need to wait before starting the music so that the first beat that player encounters would hit on tempo. Right now my beats spawn with the music and are on time, but not on time when they get to the player model. 
> I need to spawn beat indicator, calculate the time it takes for it to hit the player and start the music, or instead delay the first beat indicator spawned
> Can you modify my code for this?
> Can you account for the fact that distance to travel stands for the whole travel of the beat and not to the player model which is closer
> Here's the current version of my script,
> Can you do one more thing, as it is now the timing of the projectiles is disturbed if the player decides to wait before pushing the start button. It causes projectiles that supposed to be far from each other time-wise to be stuck together, after the stuck bunch flies away everything seems to work normally. 
> What I need you to do, is to account for the time user spends before pushing the start button and using it to render projectiles as intended.
> Here's the example of how projectile list looks like
> So can you fix this time issue?
> Isn't in your example the user waiting time supposed to be always zero? I don't see how this fixes the issue
> Can you make the shadow in this css code pop out more? Be more visible
> I'm afraid that just increasing the radius makes it darker for some reason, more spread out
> Whats the setting for border shadow color in js? I have a list of colors and I want to change the shadow color for one of them
> So there is no direct way of changing the shadow color without tinkering with the size etc?
> So, the timing in miliseconds does not account for the tempo of the melody. Can I scale the timings so they would fit the music? Can you do this using some of these calculations
> Do the time differenses between projectile launches stay the same?
> So scaling 1000, 2000, 3000 would result in the time difference between the notes not being equal?
> Can you generate a list like this with some interesting patterns for the melody span 0-120000
> Give me more interesting list of patterns and do not use shortcuts as I don't see the contents. Timings can be both with 1000 milliseconds difference and 500. Longer differences mean more time between patterns. I want it more dinamyc however.
> Ok, now I want to make those lanes visible. I want it to be simple, maybe gray line with little bit of shadow. Can you help me doe that?
> Can you also modify index.html and main.js so that those lanes would be visible. Of course if one needs to modify them at all
> Can you adjust those styles so that the edges would be blurred
> Can you make the start button appear in the middle of the screen and be bigger?
> And I need it in the foreground, now it is behind the lanes which is bad
> Now, to the cool stuff. Can we add a text that would fly into the screen and dissapear after every succsessfull dodge? I want it to be printing different phrases depending on how many cosecutive dodges played did
> Can you create a css style for it so it would be green and animate it so it would wobble
> Also make it fall down when it is displayed
> For some reason falling animation does not work
> It seems like animations do not stuck up.
> Can you combine the animation into 1?
> Does not seem to be working
> Can you modify this list so that there would be more projectiles in one period of time?
> Can you also make less pauses, like adding inbetween lanes with projectiles? As it is now the pause is about a second long. You can also use timings devidable by 250
> Great but you made it impossible to dodge projectiles, can you decrease amount a bit. Maybe instead of the amount of projectiles you could add variaty or some shapes like
> continue the listMake this list easier, now some of them are still impossible to dodge
> Make this list easier, now some of them are still impossible to dodge
> Make this list more spread out timing wise
> Can you generate me a README.md file with the description of the game, how to run (open index.html)? The game is called kawabanga.
> I want to add background image to my game, how do I do that? My background image is in assets/images/background
> ok, now I want to change it a bit, I want background image to span until the middle of the screen only verticall from top to bottom. And also want opacity at the top to be 1 and at the bottom 0.
