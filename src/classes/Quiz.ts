import questions from '../components/questions';
import User from './User';

export default class Quiz {
  public static getQuestionForUser(user: User) {
    if (user.getRoundNumber() + 1 > questions.length) {
      return JSON.stringify({ gameWin: true });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const questionsWithoutAnswer: any = { ...questions[user.getRoundNumber()] };
    delete questionsWithoutAnswer.correctAnswer;

    return JSON.stringify(questionsWithoutAnswer);
  }

  public static checkUserAnswerIsCorrect(user: User, answer: string) {
    if (questions[user.getRoundNumber()].correctAnswer === answer) {
      user.incrementRoundNumber();
      return true;
    }
    return false;
  }
}
