const questions = [
  {
    question: 'What is the coolest website?',
    type: 'button',
    answers: ["Anthony's Website", "Not Anthony's Website"],
    correctAnswer: "Anthony's Website",
  },
  {
    question: 'What is the answer to 3 ÷ 0?',
    answers: ['User Inputted Question'],
    type: 'form',
    correctAnswer: 'undefined',
  },
  {
    question: 'Play Snake Game',
    type: 'snake',
    answers: ['Score 10 points to proceed to the next level'],
    correctAnswer: 'Score 10 points to proceed to the next level',
  },
];

export default questions;
