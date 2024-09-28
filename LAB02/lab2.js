const prompt = require('prompt');

prompt.start();

prompt.get(['userSelection'], function (err, result) {
  if (err) { 
    return console.error(err); 
  }
  const userSelection = result.userSelection.toUpperCase();
  console.log(`User selected: ${userSelection}`);
  function getComputerSelection() {   
    const randomNumber = Math.random();
    if (randomNumber < 0.34) {
      return 'PAPER';
    } else if (randomNumber < 0.67) {
      return 'SCISSORS';
    } else {
      return 'ROCK';
    }
  }
  
  const computerSelection = getComputerSelection();
  console.log(`Computer selected: ${computerSelection}`);
  function determineWinner(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
      return "It's a tie";
    } else if (
      (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
      (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
      (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
      return 'User Wins';
    } else {
      return 'Computer Wins';
    }
  }
  
  const outcome = determineWinner(userSelection, computerSelection);
  console.log(outcome);
    
});

