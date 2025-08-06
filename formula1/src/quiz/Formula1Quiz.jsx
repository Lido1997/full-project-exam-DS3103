import {useState} from 'react'

const questions = [
    {
      question: 'Which team won the Formula 1 championship in 2021?',
      options: ['Mercedes', 'Red Bull Racing', 'Ferrari', 'McLaren'],
      answer: 'Mercedes'
    },
    {
      question: 'Who is the youngest world champion in Formula 1 history?',
      options: ['Sebastian Vettel', 'Lewis Hamilton', 'Max Verstappen', 'Fernando Alonso'],
      answer: 'Sebastian Vettel'
    },
    {
      question: 'In which year did the first official Formula 1 season start?',
      options: ['1998', '1980', '1967', '1950'],
      answer: '1950'
    },
    {
      question: 'Who is the only driver to have won the World Championship for three different teams?',
      options: ['Sebastian Vettel', 'Max Verstappen', 'Lewis Hamilton', 'Nino Farina'],
      answer: 'Lewis Hamilton'
    },
    {
      question: 'Which driver won the first-ever Formula 1 race?',
      options: ['Sebastian Vettel', 'Max Verstappen', 'Lewis Hamilton', 'Nino Farina'],
      answer: 'Nino Farina'
    }
  ];
  
  const Formula1Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    
    const handleAnswerOptionClick = (selectedAnswer) => {
      if (selectedAnswer === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
  
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    };

    const retryQuiz = () => {
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
    };
  
    return (
      <div className="formula1-quiz">
        {showScore ? (
          <div className="score-section text-white">
            <h2>You got {score} out of {questions.length} right answers!</h2>
            <button className="btn btn-primary p-2 m-2 btn-lg" onClick={retryQuiz}>Try again!</button>
          </div>
        ) : (
          <>
            <div className="question-section text-white fs-3">
              <h2 className=''>Question {currentQuestion + 1} out of {questions.length}</h2>
              <div className="question-text">{questions[currentQuestion].question}</div>
            </div>
            <div className="answer-section text-white mt-2">
              {questions[currentQuestion].options.map((option) => (
                <button className = "btn btn-primary p-2 m-2 btn-lg" key={option} onClick={() => handleAnswerOptionClick(option)}>
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default Formula1Quiz;