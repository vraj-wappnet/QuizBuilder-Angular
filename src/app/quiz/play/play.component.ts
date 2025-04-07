import { Component, OnInit } from '@angular/core';
import { Quiz, Question } from '../models/quiz.model';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  imports: [CommonModule, FormsModule],
})
export class PlayComponent implements OnInit {
  quiz?: Quiz;
  currentQuestionIndex = 0;
  selectedOption: number | null = null;
  userAnswers: number[] = [];
  showResult = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.quiz = this.quizService.getQuiz(id);
      if (!this.quiz) {
        this.router.navigate(['/quizzes']);
      }
    }
  }

  get currentQuestion(): Question | undefined {
    return this.quiz?.questions[this.currentQuestionIndex];
  }

  get progress(): number {
    if (!this.quiz) return 0;
    return ((this.currentQuestionIndex + 1) / this.quiz.questions.length) * 100;
  }

  selectOption(index: number): void {
    this.selectedOption = index;
  }

  nextQuestion(): void {
    if (this.selectedOption !== null) {
      this.userAnswers.push(this.selectedOption);
      this.selectedOption = null;

      if (this.currentQuestionIndex < (this.quiz?.questions.length || 0) - 1) {
        this.currentQuestionIndex++;
      } else {
        this.showResult = true;
        // Navigate to result page with data
        this.router.navigate(['/result'], {
          state: {
            quiz: this.quiz,
            userAnswers: this.userAnswers,
          },
        });
      }
    }
  }
}
