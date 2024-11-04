import React, { useContext, useEffect, useState } from 'react'
import { userStateProvider } from './../App'
import { useLocation, useNavigate } from 'react-router-dom'
import loadingSVG from './../assets/loading.svg'
import './../styles/quiz.css'

const Quiz = () => {
    const userState = useContext(userStateProvider)
    const navigate = useNavigate()
    const location = useLocation()

    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0)
    const [selectedAnswer , setSelectedAnswer] = useState({})
    const [score , setScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        if (!userState.state.isUserLoggedIn) navigate('/login')
    },[userState.state.isUserLoggedIn , navigate])

    useEffect(() => {
        try {
            let options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    difficulty: location.state.difficulty,
                    category: location.state.category
                })
            };
            fetch("/quiz", options)
                .then(res => res.json())
                .then(res => {
                    if (res.status) {
                        setQuestions(processData(res.questions))
                        setIsLoading(false)
                    }
                    else {
                        console.log(res.message)
                    }
                })
        } catch (err) {
            console.log(err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        if(!isSubmitted){
            if(selectedAnswer[index] === undefined)
                document.getElementsByName('option').forEach((ele)=>ele.checked = false)
            else 
                document.getElementById('inp'+selectedAnswer[index]).checked = true
        }
        else{
            document.getElementsByName('op-label').forEach(ele=>{
                if(ele.classList.contains('correct')) ele.classList.remove('correct')
                if(ele.classList.contains('incorrect')) ele.classList.remove('incorrect')
            })

            if(selectedAnswer[index] === questions[index].correctOption)
                document.getElementById('op'+selectedAnswer[index]).classList.add('correct')
            else {
                document.getElementById('op'+selectedAnswer[index]).classList.add('incorrect')
                document.getElementById('op'+questions[index].correctOption).classList.add('correct')
            }
        }
    },[index, isSubmitted, questions, selectedAnswer])

    useEffect(()=>{
        if(isSubmitted) 
            document.getElementById('submit-quiz').innerHTML = `Score : ${score} / 10`
    },[isSubmitted,score])
    
    function handleSubmit(e){
        if(!isSubmitted){
            if(Object.keys(selectedAnswer).length === 10){
                setScore(calculateScore)
                setIsSubmitted(true)  
                document.getElementsByName('option').forEach((ele)=>ele.checked = false)
                for(let i=0;i<10;i++){
                    if(selectedAnswer[i] === questions[i].correctOption)
                        document.getElementById(i).classList.add('correct')
                    else 
                        document.getElementById(i).classList.add('incorrect')
                }       
            }
            else{
                document.getElementById('wm6').style.visibility = 'visible'
                setTimeout(()=>{
                    document.getElementById('wm6').style.visibility = 'hidden'
                },3000)
            }
        }
    }

    function calculateScore(){
        let score = 0
        questions.forEach((ele,pos) =>{
            if(ele.correctOption === selectedAnswer[pos]) score++
        })
        return score
    }

    function next() {
        if (index < 9) {
            document.getElementsByClassName('active')[0].classList.remove('active')
            document.getElementById(index+1).classList.add('active')
            setIndex(index + 1)
        }
    }

    function previous() {
        if (index > 0) {
            document.getElementsByClassName('active')[0].classList.remove('active')
            document.getElementById(index-1).classList.add('active')
            setIndex(index - 1)
        }
    }

    function changeIndex(e){
        document.getElementsByClassName('active')[0].classList.remove('active')
        e.target.classList.add('active')
        setIndex(Number(e.target.id))
    }

    function setAnswer(e){
        setSelectedAnswer({...selectedAnswer , [index] :Number(e.target.value)})
    }

    function processData(data){
        return data.results.map(item => {
            let correctOption = Math.floor(Math.random() * 4)
            let options = item.incorrect_answers.map(ele=>decodeStr(ele))
            options.splice(correctOption , 0 , item.correct_answer)
            return {
                question : decodeStr(item.question),
                options : options,
                correctOption : correctOption
            }
        })
    }

    function decodeStr(str){
        var txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.innerText;
    }

    return (
        <div className='container'>
            <div className='inner-container quiz'>
                <div className='question-indicator'>
                    <div className='question-type'>
                        <p>Category : {location.state.categoryTxt}</p>
                        <p>Difficulty : {location.state.difficulty}</p>
                    </div>
                    <ul className='num-list'>
                        <li id='0' className='num-list-item active' onClick={(e)=>changeIndex(e)}>1</li>
                        <li id='1' className='num-list-item' onClick={(e)=>changeIndex(e)}>2</li>
                        <li id='2' className='num-list-item' onClick={(e)=>changeIndex(e)}>3</li>
                        <li id='3' className='num-list-item' onClick={(e)=>changeIndex(e)}>4</li>
                        <li id='4' className='num-list-item' onClick={(e)=>changeIndex(e)}>5</li>
                        <li id='5' className='num-list-item' onClick={(e)=>changeIndex(e)}>6</li>
                        <li id='6' className='num-list-item' onClick={(e)=>changeIndex(e)}>7</li>
                        <li id='7' className='num-list-item' onClick={(e)=>changeIndex(e)}>8</li>
                        <li id='8' className='num-list-item' onClick={(e)=>changeIndex(e)}>9</li>
                        <li id='9' className='num-list-item' onClick={(e)=>changeIndex(e)}>10</li>
                    </ul>
                </div>
                <div className='question-container' >
                    {
                        isLoading ? <div className='loading'><img src={loadingSVG} alt="" /></div> :
                            <>
                                <div className='question'>{`${questions[index].question}`}</div>
                                <div className='op-list' onChange={(e)=>setAnswer(e)}>
                                    <input type="radio" name='option' value='0' id='inp0' />
                                    <label htmlFor='inp0' name='op-label' className='op-list-item' id='op0'>
                                        <p className='op-number'>A</p>
                                        <p className='option'>{`${questions[index].options[0]}`}</p>
                                    </label>
                                    <input type="radio" name='option' value='1' id='inp1' />
                                    <label htmlFor='inp1' name='op-label' className='op-list-item' id='op1'>
                                        <p className='op-number'>B</p>
                                        <p className='option'>{`${questions[index].options[1]}`}</p>
                                    </label>
                                    <input type="radio" name='option' value='2' id='inp2' />
                                    <label htmlFor='inp2' name='op-label' className='op-list-item' id='op2'>
                                        <p className='op-number'>C</p>
                                        <p className='option'>{`${questions[index].options[2]}`}</p>
                                    </label>
                                    <input type="radio" name='option' value='3' id='inp3' />
                                    <label htmlFor='inp3' name='op-label' className='op-list-item' id='op3'>
                                        <p className='op-number'>D</p>
                                        <p className='option'>{`${questions[index].options[3]}`}</p>
                                    </label>
                                </div>
                                <div className='navigation-btns'>
                                    <button onClick={previous}>Previous</button>
                                    <button onClick={next}>Next</button>
                                </div>
                                <div id='btn-container'>
                                    <button type='button' id='submit-quiz' onClick={handleSubmit}>Submit</button>
                                </div>
                            </>
                    }
					<p className='warning-message' id='wm6'>*Attemp all question!</p>
                </div>
            </div>
        </div>
    )
}

export default Quiz