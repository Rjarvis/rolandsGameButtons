
var gamepadInfo = document.getElementById('gamepad-info');
var ball = document.getElementById("ball");
const field = document.querySelector("body");
var start;
var a = 0;
var b = 0;

var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

var rAFStop = window.mozCancelRequestAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.cancelRequestAnimationFrame;

window.addEventListener("gamepadconnected", function() {
  var gp = navigator.getGamepads()[0];
  gamepadInfo.textContent = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";

  gameLoop();
});

window.addEventListener("gamepaddisconnected", function() {
  gamepadInfo.textContent = "Waiting for gamepad.";

  rAFStop(start);
});

if(!('GamepadEvent' in window)) {
  // No gamepad events available, poll instead.
  var interval = setInterval(pollGamepads, 500);
}

function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if(gp) {
      gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
      gameLoop();
      clearInterval(interval);
    }
  }
}
// 0 == A; 1 == B; 2== X; 3 == Y;
function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

function axisTilt(a){
    if (typeof(a) == "object"){
        return a.pressed;
    }
    return a == 1.0;
}

function gameLoop() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads)
    return;

  var gp = gamepads[0];
  if (buttonPressed(gp.buttons[3])) {
    b--;
  } if (buttonPressed(gp.buttons[0])) {
    b++;
    
  }
  if(buttonPressed(gp.buttons[1])) {
    a++;
  } if(buttonPressed(gp.buttons[2])) {
    a--;
  }
/**
 * 4 == LB;
 */
  if(buttonPressed(gp.buttons[4])){
    ball.style.backgroundColor = 'blue';
  }
  if(buttonPressed(gp.buttons[5])){ //Right Bumper
    ball.style.backgroundColor = 'green';
  }

  if(buttonPressed(gp.buttons[6])){ // Left Trigger
    ball.style.backgroundColor = 'yellow';
    field.style.backgroundColor = 'purple';
  }
  if(buttonPressed(gp.buttons[7])){ //Right Trigger
    ball.style.backgroundColor = 'purple';
    field.style.backgroundColor = 'yellow';
  }

  if(buttonPressed(gp.buttons[8])){// Back btn
    ball.style.backgroundColor = 'blue'; 
  }
  if(buttonPressed(gp.buttons[9])){ //Start btn
    ball.style.backgroundColor = 'green';
  }

  if(buttonPressed(gp.buttons[10])){
    ball.style.backgroundColor = 'blue';
    field.style.backgroundColor = 'red';
  }
  if(buttonPressed(gp.buttons[11])){ //Right Bumper
    ball.style.backgroundColor = 'green';
    field.style.backgroundColor = 'purple';
  }

  ball.style.left = a*2 + "px";
  ball.style.top = b*2 + "px";

  var start = rAF(gameLoop);
};
