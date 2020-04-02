## Installation

### npm
```
npm install -S phaser3-react react react-dom
```

### yarn
```
yarn add phaser3-react react react-dom
```

## Usage

### Setup

First add us to your game configs global plugins

```js
plugins: {
  global: [
    {
      key: 'ReactUI',
      plugin: ReactUI,
      start: true
    }
  ]
}
```
### Mounting the React Component

The **reactDom** method is attached to the add property of our Phaser Scene, and takes 2 arguments (component and the supplied state) The state is given to your component via props.
  
```js
Class Game extends Scene {
  constructor() {
    this.scoreText = null;
  }
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