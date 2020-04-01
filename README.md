## Usage


### Install ReactUI plugin

Clone or download the zip of this repository.

Add the following snippet to your Phaser config. You can use the plugin anywhere, but since this is dealing with UI, the default assumption is that you'd want to use it everywhere.

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
  
  The **reactDom** method is attached to the Scene object in our Phaser **Create()** function, and takes 2 arguments (component and the supplied state).
  
  ```js
   
 Class Game extends Scene {
   constructor() {
     this.scoreText = null;
   }
   create() {
      this.scoreText = this.add.reactDom(GameUI, { score: 0 });
   }
   // .....
 }
  ```
  ### Setting State from the Phaser scene
  
 We're using the Phaser tutorial to highlight usage of this method. The **collectStar** method is called each time our Player collides with a star sprite. When this happens, this.scoreText.setState(..) is called. The object passed to setState is provided as props (**score**) to the component we specified above (GameUI). If we want to update the props, we simply call collideStar once again, updating the component's props. 
 
 ```js 
 
 // .....
 
  collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setState({ score: this.score });

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {

        child.enableBody(true, child.x, 0, true, true);

      });

      let x = (this.player.x < 400) ? Math.Between(400, 800) : Math.Between(0, 400);

      let bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Math.Between(-200, 200), 20);
   }
  }
  
  // .....
  
  ```
  
```jsx
import React from 'react';

function Score({ score }) {
  return (
    <p style={{ position: 'absolute', top: '10px', left: '10px' }}>
      Score: {score}
    </p>
  )
}
export default Score;
```
  
