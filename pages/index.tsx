import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'

const Recipe: NextPage = () => {

  const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState([
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'London'],
        correct_answer: 'Paris',
        userAnswer: '',
        disabled: false,
      },
      {
        id: 2,
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correct_answer: 'Mars',
        userAnswer: '',
        disabled: false,
      },
      {
        id: 3,
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correct_answer: '4',
        userAnswer: '',
        disabled: false,
      },
    ]);

    const handleOptionSelect = (questionId: number, option: string) => {
      setQuestions((prevState) =>
        prevState.map((question) =>
          question.id === questionId
            ? {
              ...question,
              userAnswer: option,
              disabled: true,
            }
            : question
        )
      );
    };

    return (
      <div>
        {questions.map((question: any) => (
          <div key={question.id}>
            <h3>{question.question}</h3>
            <ul>
              {question.options.map((option: any) => (
                <li
                  key={option}
                  onClick={() => handleOptionSelect(question.id, option)}
                  style={{ cursor: 'pointer' }}
                  disabled={question.disabled}
                >
                  {option}
                </li>
              ))}
            </ul>
            {question.userAnswer && (
              <p>
                Your answer: {question.userAnswer}{' '}
                {question.userAnswer === question.correct_answer ? (
                  <span style={{ color: 'green' }}>Correct!</span>
                ) : (
                  <span style={{ color: 'red' }}>Wrong!</span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Amazing Recipe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Body */}
      <Quiz />
    </div>
  )
}

export default Recipe