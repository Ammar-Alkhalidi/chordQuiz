// Import the readline-sync module
const readlineSync = require("readline-sync");

// Wrap everything in an async function to use dynamic import
(async () => {
  // Dynamically import the chalk module
  const chalk = (await import("chalk")).default;

  // List of 20 chord questions with their notes and options
  const chordsQuiz = [
    {
      chord: "Gm",
      correct: "G, Bb, D",
      options: {
        a: "G, B, E",
        b: "G, Bb, E",
        c: "G, A, C",
        d: "G, Bb, D",
      },
    },
    {
      chord: "C Major",
      correct: "C, E, G",
      options: {
        a: "C, Eb, G",
        b: "C, E, G",
        c: "C, D, G",
        d: "C, E, A",
      },
    },
    {
      chord: "A Minor",
      correct: "A, C, E",
      options: {
        a: "A, C#, E",
        b: "A, C, E",
        c: "A, D, F",
        d: "A, B, D",
      },
    },
    {
      chord: "D Major",
      correct: "D, F#, A",
      options: {
        a: "D, F, A",
        b: "D, F#, G",
        c: "D, F#, A",
        d: "D, G, A",
      },
    },
    {
      chord: "E Minor",
      correct: "E, G, B",
      options: {
        a: "E, G#, B",
        b: "E, G, B",
        c: "E, A, C",
        d: "E, G, D",
      },
    },
    {
      chord: "F Major",
      correct: "F, A, C",
      options: {
        a: "F, A, C",
        b: "F, G, C",
        c: "F, A, D",
        d: "F, Ab, C",
      },
    },
    {
      chord: "E Major",
      correct: "E, G#, B",
      options: {
        a: "E, A, C#",
        b: "E, G, B",
        c: "E, G#, B",
        d: "E, F#, B",
      },
    },
    {
      chord: "B Minor",
      correct: "B, D, F#",
      options: {
        a: "B, D, G",
        b: "B, D, F#",
        c: "B, E, F#",
        d: "B, F, G",
      },
    },
    {
      chord: "D Minor",
      correct: "D, F, A",
      options: {
        a: "D, F, G",
        b: "D, F, A",
        c: "D, G, A",
        d: "D, F#, A",
      },
    },
    {
      chord: "A Major",
      correct: "A, C#, E",
      options: {
        a: "A, C, E",
        b: "A, D, F",
        c: "A, C#, E",
        d: "A, B, E",
      },
    },
    {
      chord: "Bb Major",
      correct: "Bb, D, F",
      options: {
        a: "Bb, C#, F",
        b: "Bb, D, F",
        c: "Bb, D, G",
        d: "Bb, F, A",
      },
    },
    {
      chord: "F Minor",
      correct: "F, Ab, C",
      options: {
        a: "F, A, C",
        b: "F, Ab, C",
        c: "F, G#, B",
        d: "F, G, C",
      },
    },
    {
      chord: "G Major",
      correct: "G, B, D",
      options: {
        a: "G, Bb, D",
        b: "G, A, D",
        c: "G, B, D",
        d: "G, C, D",
      },
    },
    {
      chord: "C Minor",
      correct: "C, Eb, G",
      options: {
        a: "C, E, G",
        b: "C, D, G",
        c: "C, Eb, G",
        d: "C, F, G",
      },
    },
    {
      chord: "B Major",
      correct: "B, D#, F#",
      options: {
        a: "B, D, F#",
        b: "B, E, G#",
        c: "B, D#, F#",
        d: "B, D#, A",
      },
    },
    {
      chord: "Eb Major",
      correct: "Eb, G, Bb",
      options: {
        a: "Eb, G, Bb",
        b: "Eb, Ab, C",
        c: "Eb, F, Bb",
        d: "Eb, G, C",
      },
    },
    {
      chord: "F# Minor",
      correct: "F#, A, C#",
      options: {
        a: "F#, A#, C#",
        b: "F#, A, B",
        c: "F#, A, C#",
        d: "F#, G, C",
      },
    },
    {
      chord: "Ab Major",
      correct: "Ab, C, Eb",
      options: {
        a: "Ab, Bb, Eb",
        b: "Ab, C, D",
        c: "Ab, C, F",
        d: "Ab, C, Eb",
      },
    },
    {
      chord: "C# Minor",
      correct: "C#, E, G#",
      options: {
        a: "C#, E, G#",
        b: "C#, F, A",
        c: "C#, D, G",
        d: "C#, E, A",
      },
    },
    {
      chord: "D# Minor",
      correct: "D#, F#, A#",
      options: {
        a: "D#, G, A#",
        b: "D#, F#, B",
        c: "D#, F#, A#",
        d: "D#, F, A#",
      },
    },
  ];

  // Shuffle function to randomize questions
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to start the quiz
  function startQuiz(players) {
    console.log(
      chalk.blueBright.bold("\nWelcome to the Guitar  Chords Notes Quiz!\n")
    );

    // Shuffle the chords to randomize question order
    const selectedChords = shuffle([...chordsQuiz]);
    const totalQuestions = selectedChords.length;
    const questionsPerPlayer = Math.floor(totalQuestions / players.length);

    // Initialize player scores
    let scores = players.map((player) => ({
      name: player,
      score: 0,
    }));

    // Loop through all players and assign questions
    let questionIndex = 0;

    for (let round = 0; round < questionsPerPlayer; round++) {
      for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
        const currentPlayer = players[playerIndex];
        const chord = selectedChords[questionIndex];
        console.log(chalk.yellowBright(`\n${currentPlayer}'s turn!`));
        console.log(
          chalk.yellowBright(
            `\nQuestion ${questionIndex + 1}: What are the notes in the ${
              chord.chord
            } chord?\n`
          )
        );

        // Display the answer options
        for (let option in chord.options) {
          console.log(`${option}: ${chalk.cyan(chord.options[option])}`);
        }

        // Get the player's answer
        const answer = readlineSync
          .question(
            chalk.green(
              `Choose the correct answer (a, b, c, or d), ${currentPlayer}: `
            )
          )
          .toLowerCase();

        // Validate the answer and give immediate feedback
        if (
          answer === "a" ||
          answer === "b" ||
          answer === "c" ||
          answer === "d"
        ) {
          if (chord.options[answer] === chord.correct) {
            console.log(chalk.greenBright("Correct!\n"));
            scores[playerIndex].score++; // Increment the player's score
          } else {
            console.log(
              chalk.redBright(
                `Wrong! The correct answer is ${chalk.bold(chord.correct)}.\n`
              )
            );
          }
        } else {
          console.log(
            chalk.red("Invalid input! Please choose a, b, c, or d.\n")
          );
        }

        // Move to the next question
        questionIndex++;

        // Stop if all questions have been asked
        if (questionIndex >= totalQuestions) break;
      }

      if (questionIndex >= totalQuestions) break;
    }

    // Show final scores for all players after all questions are answered
    console.log(
      chalk.blueBright.bold("\nQuiz Over! Here are the final scores:")
    );
    scores.forEach((player) => {
      console.log(
        chalk.bold(`${player.name}: ${player.score} / ${questionsPerPlayer}`)
      );
    });

    // Announce the winner(s)
    const maxScore = Math.max(...scores.map((p) => p.score));
    const winners = scores
      .filter((p) => p.score === maxScore)
      .map((p) => p.name);

    if (winners.length > 1) {
      console.log(
        chalk.greenBright(`\nIt's a tie between: ${winners.join(", ")}!`)
      );
    } else {
      console.log(chalk.greenBright(`\nThe winner is: ${winners[0]}!`));
    }
  }

  // Function to get player names
  function getPlayerNames() {
    let numberOfPlayers = readlineSync.questionInt(
      chalk.yellow("How many players are playing? (Max 4 players): ")
    );

    // Ensure the number of players is between 1 and 4
    while (numberOfPlayers < 1 || numberOfPlayers > 4) {
      console.log(chalk.red("Please enter a valid number between 1 and 4."));
      numberOfPlayers = readlineSync.questionInt(
        chalk.yellow("How many players are playing? (Max 4 players): ")
      );
    }

    let players = [];

    for (let i = 0; i < numberOfPlayers; i++) {
      const playerName = readlineSync.question(
        chalk.green(`Enter name for Player ${i + 1}: `)
      );
      players.push(playerName);
    }

    return players;
  }

  // Start the game
  const players = getPlayerNames();
  startQuiz(players);
})();
