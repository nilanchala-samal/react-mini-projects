import styled from 'styled-components'
import { Button } from '../styled/Button'

const StartMenu = ({ toggle }) => {
    return (
        <Container>
            <img src="/images/dices.png" alt="" />
            <div className='content'>
                <h1>DICE GAME</h1>
                <Button
                    onClick={toggle}
                >Play Now</Button>
            </div>
        </Container>
    )
}

export default StartMenu

const Container = styled.div`
    max-width: 1180px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: 100vh;

    .content{
        h1{
            font-size: 96px;
            white-space: nowrap;
        }
    }
`
