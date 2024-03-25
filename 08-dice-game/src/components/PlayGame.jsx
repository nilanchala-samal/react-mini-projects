import TotalScore from './TotalScore'
import NumberSelector from './NumberSelector'
import styled from 'styled-components'
import RollDice from './RollDice'
import { useState } from 'react'
import { Button, OutlineButton } from '../styled/Button'
import Rules from './Rules'

const PlayGame = () => {

    const [score, setScore] = useState(0)
    const [selectedNum, setSelectedNum] = useState()
    const [currentDice, setCurrentDice] = useState(1)
    const [error, setError] = useState("")
    const [showRules, setShowRules] = useState(false)

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const rollDice = () => {
        if (!selectedNum) {
            setError("You haven't selected any number")
            return;
        }
        const randomNumber = generateRandomNumber(1, 7);
        setCurrentDice(prev => randomNumber)


        if (selectedNum === randomNumber) {
            setScore(prevScore => prevScore + randomNumber)
        } else {
            setScore(prevScore => prevScore - 1)
        }
        setSelectedNum(undefined)
    }

    const resetScore = () => {
        setScore(0)
        setSelectedNum(undefined)
        setCurrentDice(1)
    }



    return (
        <MainContainer>
            <div className="top-section">
                <TotalScore score={score} />
                <NumberSelector
                    selectedNum={selectedNum}
                    setSelectedNum={setSelectedNum}
                    error={error}
                    setError={setError}
                />
            </div>
            <RollDice currentDice={currentDice} rollDice={rollDice} />
            <div className='btns'>
                <OutlineButton onClick={resetScore}>Click to Reset</OutlineButton>
                <Button onClick={() => setShowRules(prev => !prev)}>
                    {
                        showRules ? "Hide Rules" : "Show Rules"
                    }
                </Button>
            </div>
            {showRules && <Rules />}
        </MainContainer>
    )
}

export default PlayGame

const MainContainer = styled.div`
padding-top: 70px;
.top-section{
    display: flex;
    justify-content: space-around;
    align-items: end;
}
.btns{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
}
`