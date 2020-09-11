'use strict';

{
  const btn = document.getElementById('btn');
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');

  const questions = shuffle([
    {q: 'ミノフスキー・クラフトで空を飛べるのはなぜ？', a: ['地面との間に粒子を敷き詰めている', '反重力が発生している', '根性', '強力ホバー装置だから'],},
    {q: 'サイコフレームが光るのはなぜ？', a: ['原理はわからない', '暴走しているから', '通電すると光る'],},
    {q: '最大稼働したF91が分身して見えるのははぜか？', a: ['熱で塗装が剥がれたから', '高速移動でそう見えた', '本当に分身している'],},
  ]);

  let count = 0;
  let isSelect = false;
  let seikai = 0;
  
  function setQuestion(questions){
    //引数で渡しているので　この　questions　は　問題と解答が入ったヤツで
    question.textContent = questions[count].q;
  }

  function setChoices(questions){
    //引数で渡しているので　この　questions　は　１つの問題リストのみの入れる
    for(let i = 0; i < questions.length; i++){
      const li = document.createElement('li');
      li.textContent = questions[i];
      li.addEventListener('click', () => {
        checkAns(li);
      });
      choices.appendChild(li);
    }
  }
  
  function checkAns(li) {
    if(isSelect){
      return;
    }
    if(li.textContent === questions[count].a[0]){
      li.classList.add('correct');
      seikai++;
    }else{
      li.classList.add('wrong');
    }
    count++;
    isSelect = true;
    btn.classList.remove('disabled');
  }

  function startQuiz(questions){
    setQuestion(questions);
    setChoices(shuffle([...questions[count].a]));
  }

  btn.addEventListener('click', () => {
    // console.log(questions.length);
    // console.log(count);
    if(count === questions.length){
      btn.classList.remove('disabled');
      btn.textContent = 'Show Scrore';
      console.log(`${seikai}/${questions.length}`);
      return;
    }
    if(btn.classList.contains('disabled')){
      return;
    }
    choices.innerHTML = '';
    btn.classList.add('disabled');
    isSelect = false;
    setQuestion(questions);
    setChoices(shuffle([...questions[count].a]));
  });

  startQuiz(questions);



  // シャッフルするものを受け取ってシャッフルして返す
  function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
}