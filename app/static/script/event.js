document.addEventListener("DOMContentLoaded", function() {

    const next_btn = document.getElementById('next-btn')
    const start_btn = document.getElementById('start-btn')
    const submit_btn = document.getElementById('submit-btn')
    const survey_sec = document.querySelector('.survey')
    const survey_wrap = document.querySelector('.survey-wrapper')
    const get_started_sec = document.querySelector('.get-started')
    const complete = document.querySelector('.question-complete')
    const questions = document.getElementsByClassName('question')
    const nav = document.querySelector('nav')
    const warn = document.getElementsByClassName('warn')[0]
    const form = document.getElementsByClassName('form-quest')[0]
    const view_healthy = document.getElementsByClassName('healthy')[0]
    const view_unhealthy = document.getElementsByClassName('unhealthy')[0]
    const view_name = document.querySelectorAll(".result-desc span")
    const input_form = document.querySelectorAll("input")
    let quest_iterator = 0
    
    // Event for start butn
    start_btn.addEventListener('click',()=>{
        complete.innerHTML = "Pertanyaan "+ " "+ (quest_iterator + 1) + "/"+ (questions.length)
        survey_sec.style.display = "block"
        get_started_sec.style.cssText = 'display:none !important'
        nav.style.display = "none"
        survey_wrap.classList.add("survey-start")
    }) 


    // Event for next btn
    next_btn.addEventListener('click',()=>{
        if(quest_iterator === questions.length - 2){
            submit_btn.style.display = 'inline'
            next_btn.style.display = 'none'
        }

        // get input type
        const input_quest = questions[quest_iterator].getElementsByTagName('input')
        let isAnswered = false
        
        // handle radio input or number input whether is answered or not
        if (input_quest.length > 1){
            for (let i = 0 ; i < input_quest.length && isAnswered == false; i++){
                if (input_quest[i].checked == true){
                    isAnswered = true
                }
            }
        }else {
            if (input_quest[0].value != ""){
                isAnswered = true
            }
        }

        // Prevent next question if current question is not answered
        if (isAnswered){
            questions[quest_iterator].style.display = 'none'
            quest_iterator++
            questions[quest_iterator].style.display = 'block'
            complete.innerHTML = "Pertanyaan "+ " "+ (quest_iterator + 1) + "/"+ (questions.length)
            warn.innerHTML = ""
        }else {
            warn.innerHTML = "Jawab dulu ya sebelum lanjut"
        }
    
    })

    // Fetching Function
    const load_view = document.getElementsByClassName('loading')[0]
    
    async function uploadForm(formData){
        try {
            load_view.style.display = 'flex'
            const url = "/predict"
            const response = await fetch(url, {
                method : 'POST',
                body : formData
            })
            const result = await response.json()
            
            return result
            
        }catch(error) {
            return error
        }
    }
    
    // Event for submit btn
    submit_btn.addEventListener('click', (e) => {
        let formData = new FormData(form)

        uploadForm(formData).then(result => {
            const input_name = document.getElementById('nama').value
            
            // Server is to fast :3, lets make a timer
            setTimeout(() => {
                if (result['result'] == 0){
                    view_name[0].innerHTML = input_name
                    view_healthy.style.display = 'block'
                }else {
                    view_name[1].innerHTML = input_name
                    view_unhealthy.style.display = 'block'
                }
                
                load_view.style.display = 'none'
                survey_wrap.style.cssText = 'display:none !important'
                nav.style.cssText = 'display:block !important'
            }, 1500);

        }).catch(error => {
            console.log(error)
        })

        
        e.preventDefault()
    })

    // prevent enter for all input
    for (let i = 0 ; i < input_form.length ; i ++){
        input_form[i].addEventListener("keypress", (e)=> {
            if (e.key === "Enter") {
                e.preventDefault()
            }
        })
    }
})


