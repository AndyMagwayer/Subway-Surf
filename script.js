document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const player = document.getElementById('player');
    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;
  
    function control(e) {
      if (e.keyCode === 32) {
        if (!isJumping) {
          isJumping = true;
          jump();
        }
      }
    }
  
    document.addEventListener('keyup', control);
  
    let position = 0;
    function jump() {
      let count = 0;
      let timerId = setInterval(function () {
        // Move player up
        if (count === 15) {
          clearInterval(timerId);
          let downTimerId = setInterval(function () {
            // Move player down
            if (count === 0) {
              clearInterval(downTimerId);
              isJumping = false;
            }
            position += 5;
            count--;
            position = position * gravity;
            player.style.bottom = position + 'px';
          }, 20);
        }
        // Move player up
        position -= 30;
        count++;
        position = position * gravity;
        player.style.bottom = position + 'px';
      }, 20);
    }
  
    function generateObstacles() {
      let randomTime = Math.random() * 4000;
      let obstaclePosition = 800;
      const obstacle = document.createElement('div');
      if (!isGameOver) obstacle.classList.add('obstacle');
      gameBoard.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + 'px';
  
      let timerId = setInterval(function () {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
          clearInterval(timerId);
          isGameOver = true;
          document.body.innerHTML = '<h1>Game Over</h1>';
        }
  
        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + 'px';
      }, 20);
  
      if (!isGameOver) setTimeout(generateObstacles, randomTime);
    }
  
    generateObstacles();
  });