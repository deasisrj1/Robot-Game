# Robot-Game

A game that involves moving a robot towards the position of a target. Each time a target is acquired a point is added to the score and the target moves to a new location. Once the time limit is zero or the robot moves out of bounds the game is over.

### Initial Setup

```
$ cd frontend
$ npm i
$ npm run dev
```

### Future Versions

Inside the file `/fronend/public/defaultLevel.json` contains a JSON object of what the structre of a level may look like. Each level could be implemented with customizable width, height and time durations. The target can be set to an array to allow multiple targets. Board is an array of tile objects which can hold different fills of obstacle tiles.

Inside the file `/fronend/public/player1.json` is what the structure of a player may look like. Each player has a name and each player owns one to many robots. The robots can be customized by changing their skin attribute.
