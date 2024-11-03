const playerCountSpan = document.getElementById("player-count");
const computerCountSpan = document.getElementById("computer-count");
const roundResultMsg = document.getElementById("round-result-message");
const finalResultMsg = document.getElementById("final-result-message");
const replayButton = document.getElementById("replay-button");
const rulesButton = document.getElementById("rules-button");
const rulesModal = document.getElementById("rules-modal");
const closeButton = document.querySelector(".close-button");

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getRoundResults(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return { message: "It's a tie!" };
    }
    if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Scissors" && computerChoice === "Paper") ||
        (playerChoice === "Paper" && computerChoice === "Rock")
    ) {
        playerScore++;
        return { message: `You win this round! ${playerChoice} beats ${computerChoice}.` };
    } else {
        computerScore++;
        return { message: `You lose this round! ${computerChoice} beats ${playerChoice}.` };
    }
}

function showResults(userChoice) {
    const computerChoice = getComputerChoice();
    const result = getRoundResults(userChoice, computerChoice);
    
    roundResultMsg.innerText = result.message;
    computerCountSpan.innerText = computerScore;
    playerCountSpan.innerText = playerScore;

    // Check for winner
    if (playerScore === 3) {
        finalResultMsg.innerText = "Congratulations! You won the game!";
        replayButton.style.display = "block";
        hideOptions();
    } else if (computerScore === 3) {
        finalResultMsg.innerText = "Oh no! The computer won the game!";
        replayButton.style.display = "block";
        hideOptions();
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerCountSpan.innerText = playerScore;
    computerCountSpan.innerText = computerScore;
    roundResultMsg.innerText = '';
    finalResultMsg.innerText = '';
    replayButton.style.display = 'none';
    showOptions();
}

function showOptions() {
    document.querySelector('.choice-container').style.display = 'block';
}

function hideOptions() {
    document.querySelector('.choice-container').style.display = 'none';
}

// Function to show rules modal
rulesButton.addEventListener('click', () => {
    rulesModal.style.display = 'block';
});

// Function to close rules modal
closeButton.addEventListener('click', () => {
    rulesModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = "none";
    }
}

// Event listeners for game buttons
document.getElementById("rock-option").addEventListener("click", () => showResults("Rock"));
document.getElementById("paper-option").addEventListener("click", () => showResults("Paper"));
document.getElementById("scissors-option").addEventListener("click", () => showResults("Scissors"));
replayButton.addEventListener("click", resetGame);
