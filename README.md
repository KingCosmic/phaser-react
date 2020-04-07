## Installation

This plugin requires you to have react react-dom and phaser installed aswell

### npm
```
npm install -S phaser3-react react react-dom phaser
```

### yarn
```
yarn add phaser3-react react react-dom phaser
```

## Usage

### Setup

First let us import the package and add the config to your game configs global plugins

```js
import phaserReact from "phaser3-react";

plugins: {
  global: [
    {
      key: 'phaser-react',
      plugin: phaserReact,
      start: true
    }
  ]
}
```
### Mounting the React Component

The **reactDom** method is attached to the add property of our Phaser Scene, and takes 2 arguments (component and the supplied state) and returns a manager for the component (shown later).

The state is given to your component via props. (example later)
  
```js
Class Game extends Scene {
  // .....
  create() {
    this.scoreText = this.add.reactDom(ScoreComponent, { score: 0 });
  }
  // .....
}
```
### Setting State from the Phaser scene

It's as simple as calling setState from phaser.
 
```js

// .....

increaseScore() {
  let newScore = this.scoreText.state.score + 10;
  this.scoreText.setState({ score: newScore })
}

// .....

```

### what methods and properties are on the manager? (I need to make some docs)

#### properties
state: the state object you've passed (incase you need the values for anything) not set from react.
events: an event emitter system you can shoot events into and listen to in react if you need to (or other things).

#### Methods
setState(Object); takes and updaates the eternal state which is passed to your component via props.
destroy(); removes this react component from rendering.

### react component example
```js
import React from 'react';

// the things passed to setState() is passed to your component as props, it also recieves the manager.
function Score({ score }) {
  return (
    <p style={{ position: 'absolute', top: '10px', left: '10px' }}>
      Score: {score}
    </p>
  )
}

export default Score;
```
