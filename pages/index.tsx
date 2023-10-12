import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'

const Recipe: NextPage = () => {

  const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get('https://quiz-app-backend.cowcow02.repl.co/quizzes/2/questions/');
          setQuestions(response.data.data);
        } catch (e) {
          console.log(e);
        }
      }
      fetchQuestions();
    }, []);

    const handleOptionSelect = (questionId: number, option: string) => {
      setQuestions((prevState: any) =>
        prevState.map((question: any) =>
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
        {questions.length === 0 && <div>Loading questions...</div>}
        {questions.map((question: any) => (
          <div key={question.id}>
            <h3>{question.question}</h3>
            <ul>
              {question.options.map((option: any) => (
                <li
                  key={option}
                  onClick={() => handleOptionSelect(question.id, option)}
                  style={{ cursor: 'pointer' }}
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
        <title>Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Body */}
      <Quiz />
    </div>
  )
}

export default Recipe