document.addEventListener("DOMContentLoaded", function() {
    let next_btn = document.getElementById('next-btn');
    let prev_btn = document.getElementById('prev-btn');
    let start_btn = document.getElementById('start-btn');
    let submit_btn = document.getElementById('submit-btn');
    let survey_sec = document.querySelector('.survey');
    let get_started_sec = document.querySelector('.get-started');
    let complete = document.querySelector('.question-complete');
    let questions = document.getElementsByClassName('question');
    let quest_iterator = 0;
    
    complete.innerHTML = "Pertanyaan "+ " "+ (quest_iterator + 1) + "/"+ (questions.length);

    start_btn.addEventListener('click',()=>{
        survey_sec.style.display = "block";
        get_started_sec.style.display = "none";

    }); 


    next_btn.addEventListener('click',()=>{
        if(quest_iterator === questions.length - 2){
            submit_btn.style.display = 'inline';
            next_btn.style.display = 'none';
        }
        prev_btn.style.display = 'inline';
        questions[quest_iterator].style.display = 'none';
        quest_iterator++;
        questions[quest_iterator].style.display = 'block';
        complete.innerHTML = "Pertanyaan "+ " "+ (quest_iterator + 1) + "/"+ (questions.length);
    
    });

    prev_btn.addEventListener('click',()=>{
        if(quest_iterator === 0){
            survey_sec.style.display = 'none';
            get_started_sec.style.display = "block";
        }else {
            if(quest_iterator === questions.length - 1){
                submit_btn.style.display = 'none';
                next_btn.style.display = 'inline'
            }
            questions[quest_iterator].style.display = 'none';
            quest_iterator--;
            questions[quest_iterator].style.display = 'block';
            complete.innerHTML = "Pertanyaan "+ " "+ (quest_iterator + 1) + "/"+ (questions.length);
        }


        
    });


});


