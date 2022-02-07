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
  {
    question: 'Find The Cow',
    type: 'findCow',
    answers: ['Find the cow to proceed to the next level'],
    correctAnswer: 'Find the cow to proceed to the next level',
  },
  {
    question: 'What page number is this?',
    type: 'button',
    answers: ['8', '4', '6', '5'],
    correctAnswer: '6',
  },
  {
    question: 'What is 0.5 ÷ 59',
    type: 'button',
    answers: ['0.0084745762711864', '1.4661778471', '80', '17.8'],
    correctAnswer: '0.0084745762711864',
  },
  {
    question: 'What is this quiz called?',
    type: 'button',
    answers: [
      'Quiz',
      'Test',
      'The Ultimate Quiz',
      "Anthony's Ultimate Quiz",
      'Anthonys Ultimate Quiz',
    ],
    correctAnswer: "Anthony's Ultimate Quiz",
  },
  {
    question: 'Find i',
    type: 'findI',
    answers: ['Find the letter i to proceed to the next level'],
    correctAnswer: 'Find the letter i to proceed to the next level',
  },
  {
    question: "What is Prince William's full name?",
    type: 'button',
    answers: [
      'William Arthur Philip Louis Windsor',
      'William Philip Arthur Louis Windsor',
      'John',
    ],
    correctAnswer: 'William Arthur Philip Louis Windsor',
  },
  {
    question: 'Do you want to play snake?',
    type: 'button',
    answers: ['Yes', 'No'],
    correctAnswer: 'No',
  },
  {
    question: 'Are you sure you want to Continue?',
    type: 'button',
    answers: ['No', 'Yes'],
    correctAnswer: 'Yes',
  },
  {
    question: 'Are you ready for the evil cows?',
    type: 'button',
    answers: ['No', 'No', 'Yes'],
    correctAnswer: 'Yes',
  },
  {
    question: 'Evil Cows of Doom',
    type: 'evilCows',
    answers: ['Continue?'],
    correctAnswer: 'Continue?',
  },
];

export default questions;
