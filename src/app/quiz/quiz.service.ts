import { Injectable } from '@angular/core';
import { Quiz, Question } from './models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private storageKey = 'quizzes';

  constructor() {}

  getQuizzes(): Quiz[] {
    const quizzesJson = localStorage.getItem(this.storageKey);
    return quizzesJson ? JSON.parse(quizzesJson) : [];
  }

  getQuiz(id: string): Quiz | undefined {
    const quizzes = this.getQuizzes();
    return quizzes.find((q) => q.id === id);
  }

  saveQuiz(quiz: Quiz): void {
    const quizzes = this.getQuizzes();
    const index = quizzes.findIndex((q) => q.id === quiz.id);

    if (index >= 0) {
      quizzes[index] = quiz;
    } else {
      quizzes.push(quiz);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(quizzes));
  }

  deleteQuiz(id: string): void {
    const quizzes = this.getQuizzes().filter((q) => q.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(quizzes));
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  createNewQuiz(): Quiz {
    return {
      id: this.generateId(),
      title: '',
      questions: [],
    };
  }

  createNewQuestion(): Question {
    return {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
  }
}
