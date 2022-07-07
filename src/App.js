import React, {useEffect, useState} from 'react';
import Axios from 'axios'

export default function App() {

  const mixedArray = (array) => {
    const min = 0
    const max = array.length - 1
    let arr = []
  
    while(arr.length<array.length){
      let element = array[Math.floor(Math.random()*(max - min + 1)  + min)]
  
      if (!arr.includes(element)) {
        arr.push(element)
      }
     
    }
    return arr
  }

  const [generalState, setGeneralState] = useState({showScore: false, currentQuestion: 0, length: 0, questions: []});
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    Axios.get("https://the-trivia-api.com/api/questions").then(response => {
      let questions = response.data
      for (let q of questions) {
        q.answers = mixedArray([...q.incorrectAnswers, q.correctAnswer])

      }

      setGeneralState({ ...generalState, questions: questions, length: response.data.length })
      console.log(questions)
    })
  }, [])
    
  
  const handleAnswerOptionClick = (answerOption) => {

    if (generalState.questions[generalState.currentQuestion].correctAnswer === answerOption) {
      console.log(generalState.questions[generalState.currentQuestion].correctAnswer === answerOption)

      setScore(score + 1 )

      console.log(score)
      }


    if (generalState.currentQuestion + 1  < generalState.questions.length) {

      setGeneralState({...generalState, currentQuestion: generalState.currentQuestion + 1})
    } else {
      setGeneralState({...generalState, showScore: true})
    }
    
  };

 
  return (
    <>    
      {generalState.questions.length === 0 ? "No question" : 
    <div className='app'>
			{generalState.showScore ? (
				<div className='score-section'>
          You scored {score} out of {generalState.length}
				</div>
			) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {(generalState.currentQuestion) + 1}</span>/{generalState.length}
              </div>
                    <div className='question-text'>{ generalState.questions[generalState.currentQuestion].question}</div>
            </div>
            <div className='answer-section'>
                  {generalState.questions[generalState.currentQuestion].answers.map((answerOption, i) => (
                
                <button key={i} onClick={() => handleAnswerOptionClick(answerOption)}>{answerOption}</button>
              ))}
               
            </div>
				  </>
			)}
		</div>
  
      }
      </>
    )


}
