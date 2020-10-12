const question = document.querySelector('.question');
const answers = document.querySelector('.answers');
const optionContainer = document.getElementById('option-container');

// function addQuestionToDOM(){
//   fetch('https://wpr-quiz-api.herokuapp.com/attempts',{
//     method: 'POST',
//   }).then(res => {
//     return res.json();
//   }).then(data => {
//     question.innerHTML = `
//       <p class="ques-text">${data.questions[0].text}</p>
//     `;
//     const optLen = 0 ;
//   }).catch((err) => {
//     console.err(err);
//     let errorMessage = new Error('Something is wrong!');
//     container.innerText = errorMessage;
//   });
// }

const availableQuestions = [];
const availableAnswers = [];
let currentQuestion;

fetch('https://wpr-quiz-api.herokuapp.com/attempts',{
    method: 'POST',
  }).then(res => {
    return res.json();
  }).then(data => {
    for(let i = 0 ; i < data.questions.length; i++){
      availableQuestions.push(data.questions[i])
    }
    question.innerHTML = `
      <p class="ques-text">${data.questions[0].text}</p>
    `;

    console.log(availableQuestions)
    const questIndex = availableQuestions[Math.floor(Math.random() *availableQuestions.length)]
    currentQuestion = questIndex;
    question.innerHTML = currentQuestion.text
    // Question text 

    console.log(currentQuestion);

    // Lấy vị trí của 'questionIndex' từ availableQuestions array
    const index_1 = availableQuestions.indexOf(questIndex);
    
	  // Bỏ 'questionIndex' từ availableQuestions array, để cho các question ko bị lặp lại
	  availableQuestions.splice(index_1, 1);

    const answerLen = currentQuestion.answers.length;
    for(let i = 0; i < answerLen; i++){
      availableAnswers.push(i);
    }

    console.log(availableAnswers)
    for(let i = 0; i < answerLen; i++){
      // Random options
      const optionIndex = availableAnswers[Math.floor(Math.random() * availableAnswers.length)];
      
      // Get optionIndex in availableAnswers
      const index_2 = availableAnswers.indexOf(optionIndex);
      
      // Remove optionIndex from availableAnswers array so that option can not duplicate 
      availableAnswers.splice(index_2, 1);
      
      // Add option to DOM 
      const option = document.createElement('p');
      option.textContent = `${currentQuestion.answers[optionIndex]}`;
      optionContainer.appendChild(option);

    }

    // console.log(data)
  })

// addQuestionToDOM();