import { createRef, useEffect, useMemo, useRef, useState } from "react"
import React from 'react'
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Statistics from "./Statistics";


let randomWords = require("random-words");


const TypingBox = () => {

    const inputRef = useRef(null);

    const [wordsArr, setwordsArr] = useState(()=>{
        return randomWords(50);
    })

    const [currWordIndex, setcurrWordIndex] = useState(0);
    const [currCharIndex, setcurrCharIndex] = useState(0);
    const [graphData, setgraphData] = useState([]);

    const {testTime} = useTestMode();
    const [intervalId, setintervalId] = useState(null)
    const [countDown, setcountDown] = useState(testTime);
    const [testStart, settestStart] = useState(false);
    const [testEnd, settestEnd] = useState(false);
    const [correctChars, setcorrectChars] = useState(0);
    const [incorrectChars, setincorrectChars] = useState(0);
    const [missedChars, setmissedChars] = useState(0);
    const [extraChars, setextraChars] = useState(0);
    const [correctWords, setcorrectWords] = useState(0);

    const wordsSpanRef = useMemo(()=>{
        return Array(wordsArr.length).fill(0).map(item=>createRef(null))
    },[wordsArr])
    
    //timer functionality
    const startTimer = ()=>{
        const intervalId = setInterval(timer,1000);
        setintervalId(intervalId)
        
        function timer(){
            setcountDown((latestCountDown)=>{
                setcorrectChars((correctChars)=>{
                    setgraphData((graphData)=>{
                        return [...graphData, [
                            testTime - latestCountDown+1,
                            (correctChars/5)/((testTime-latestCountDown+1)/60)
                        ]]
                    })
                    return correctChars;
                })
                if(latestCountDown==1)
                {
                    settestEnd(true)
                    clearInterval(intervalId)
                    unFocusInput();

                    return 0;
                }
                 return latestCountDown-1;
            })
        }
    }

    const calculateWPM = ()=>{
        return Math.round((correctChars/5)/(testTime/60))
    }

    const calculateAccuracy = ()=>{
        return Math.round((correctWords/currWordIndex)*100);
    }

    const focusInput = ()=>{
        inputRef.current.focus();
    }
    const unFocusInput = ()=>{
        inputRef.current.blur();
    }

    useEffect(()=>{
        resetTest();
    },[testTime])

    useEffect(()=>{
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = "current";
    },[]);

    const resetTest = ()=>{
        if(!testEnd){
        clearInterval(intervalId)
        setcountDown(testTime);
        setcurrWordIndex(0);
        setcurrCharIndex(0);
        settestStart(false);
        settestEnd(false);
        setwordsArr(randomWords(50));
        resetWordSpanrefClassname();
        focusInput();
        }
    }

    const resetWordSpanrefClassname = ()=>{
        wordsSpanRef.map(i=>{
            Array.from(i.current.childNodes).map(j=>{
                j.className = '';
            })
        })
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    }
    console.log("wordsspanref=>",wordsSpanRef)

    const handleUserInput = (e)=>{
        if(!testStart)
        {
            startTimer();
            settestStart(true)
        }
        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
        //space functionality=> jump to new word(32 is key code for space key in keyboard)
        if(e.keyCode===32)
        {
            let correctCharInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
            if(correctCharInWord.length === allCurrChars.length)
            {
                setcorrectWords(correctWords+1);
            }
            if(allCurrChars.length<=currCharIndex)
            {
                allCurrChars[currCharIndex-1].classList.remove("current-right");
            } else {
                allCurrChars[currCharIndex].classList.remove("current"); 
                setmissedChars(missedChars + (allCurrChars.length - currCharIndex))
            }

            wordsSpanRef[currWordIndex+1].current.childNodes[0].className = "current"; //put cursor before the first char of next word
            setcurrWordIndex(currWordIndex+1); //next word
            setcurrCharIndex(0)//1st char of the next word
            return;
        }
        // backspace functionality (key code = 8 => backspace)
        if(e.keyCode===8)
        {
            if(currCharIndex!==0) // user cant go back to the previous word
            {
                if(allCurrChars.length===currCharIndex) // backspace from last char
                {
                    if(allCurrChars[currCharIndex-1].className.includes("extra"))//to remove extra characters typed by user
                    {
                        allCurrChars[currCharIndex-1].remove();
                        allCurrChars[currCharIndex-2].className += " current-right"
                    } else {
                        allCurrChars[currCharIndex-1].className = "current";
                    }
                    
                    setcurrCharIndex(currCharIndex-1)
                    return;
                }
                allCurrChars[currCharIndex].className = ''; // remove red/green color from curr word
                allCurrChars[currCharIndex-1].className = "current"; //cursor move to previous char
                setcurrCharIndex(currCharIndex-1);
            }
            return;
        }
        // add extra chars after a word if user input extra chars without pressing space
        if(currCharIndex===allCurrChars.length)
        {
            let newSpan = document.createElement("span");
            newSpan.innerText = e.key;
            newSpan.className = "incorrect extra current-right";
            allCurrChars[currCharIndex-1].classList.remove("current-right")
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setcurrCharIndex(currCharIndex+1);
            setextraChars(extraChars+1);
            return
        }
        // checks if user gave correct character input
        if(e.key===allCurrChars[currCharIndex].innerText)
        {
            allCurrChars[currCharIndex].className = "correct"
            setcorrectChars(correctChars+1);
        } else {
            allCurrChars[currCharIndex].className = "incorrect"
            setincorrectChars(incorrectChars+1);
        }
        // move cursor from left to right if current character is last char of the word
        if(currCharIndex+1===allCurrChars.length)
        {
            allCurrChars[currCharIndex].className += " current-right";
        } else {
            allCurrChars[currCharIndex+1].className = "current"
        }
        setcurrCharIndex(currCharIndex+1);
    }
    
    
  return (
    <div>
    <UpperMenu countDown={countDown}/>
        {(testEnd) ? (<Statistics wpm={calculateWPM()} 
            accuracy={calculateAccuracy()}
            correctChars = {correctChars}
            incorrectChars = {incorrectChars}
            missedChars = {missedChars}
            extraChars = {extraChars}
            graphData = {graphData}
        />
        ) 
        : (<div className="type-box" onClick={focusInput}>
            <div className="words">
                {
                    wordsArr.map((word,index)=>(
                        <span className="word" ref={wordsSpanRef[index]}>
                            {word.split('').map(char=>(
                                <span>{char}</span>
                            ))}
                        </span>
                    ))
                }
            </div>
        </div>)}
        <input
        type="text"
        onKeyDown={handleUserInput} 
        className="hidden-input"
        ref={inputRef}>
        

        </input>
    </div>
  )
}

export default TypingBox