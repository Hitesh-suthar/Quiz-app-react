import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Preference = () => {
    const [difficulty , setDifficulty] = useState('easy')
    const [category , setCategory] = useState(9)
    const [categorytxt , setCategoryTxt] = useState('General Knowledge')

    function getDifficulty(e){
        setDifficulty(e.target.value)
    }

    function getCategory(e){
        setCategory(e.target.value)
        setCategoryTxt(e.target.selectedOptions[0].text)
    }
    
    return (
        <div className='container'>
            <div className='inner-container quiz'>
                <div className='question-container'>
                    <div className='heading'>Difficulty</div>
                    <div className='difficulty' onChange={(e=>getDifficulty(e))}>
                        <input type="radio" name='difficulty-lvl' value='easy' id='easy' defaultChecked/>
                        <label className='diff-label' htmlFor='easy'>Easy</label>
                        <input type="radio" name='difficulty-lvl' value='medium' id='medium' />
                        <label className='diff-label' htmlFor='medium'>Medium</label>
                        <input type="radio" name='difficulty-lvl' value='hard' id='hard' />
                        <label className='diff-label' htmlFor='hard'>Hard</label>
                    </div>
                    <div className='heading'>Category</div>
                    <select name="trivia_category" className="category" onChange={(e)=>getCategory(e)}>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals & Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime & Manga</option>
                        <option value="32">Entertainment: Cartoon & Animations</option>
                    </select>
                    <div id='btn-container'>
                        <Link to='/quiz' state={{difficulty:difficulty , category : category , categoryTxt : categorytxt}}><button>Start</button></Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preference