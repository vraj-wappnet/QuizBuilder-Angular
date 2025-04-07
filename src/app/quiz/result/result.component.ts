import { Component, OnInit } from '@angular/core';
import { Quiz, Question } from '../models/quiz.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ResultComponent implements OnInit {
  quiz?: Quiz;
  userAnswers: number[] = [];
  score = 0;
  totalQuestions = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.quiz = navigation.extras.state['quiz'];
      this.userAnswers = navigation.extras.state['userAnswers'];
    }

    if (!this.quiz) {
      this.router.navigate(['/quizzes']);
    }
  }

  ngOnInit(): void {
    if (this.quiz) {
      this.totalQuestions = this.quiz.questions.length;
      this.score = this.quiz.questions.reduce((acc, question, index) => {
        return (
          acc + (question.correctAnswer === this.userAnswers[index] ? 1 : 0)
        );
      }, 0);
    }
  }

  restartQuiz(): void {
    if (this.quiz) {
      this.router.navigate(['/quiz', this.quiz.id]);
    }
  }

  backToQuizzes(): void {
    this.router.navigate(['/quizzes']);
  }

  isCorrect(questionIndex: number): boolean {
    return (
      this.quiz?.questions[questionIndex].correctAnswer ===
      this.userAnswers[questionIndex]
    );
  }
}
