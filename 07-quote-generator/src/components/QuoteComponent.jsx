import React, { useEffect, useState } from 'react'
import axios from 'axios'
import twitter_logo from '../assets/Twitter logo.png'

const QuoteComponent = () => {
    const [quote, setQuote] = useState(null)
    const [author, setAuthor] = useState(null)

    const fetchQuote = () => {
        axios
            .get('https://api.quotable.io/random')
            .then(response => {
                setQuote(response.data.content)
                setAuthor(response.data.author)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    function handleOnClick() {
        fetchQuote();
    }
    function handleTweet() {
        window.open(`https://twitter.com/intent/tweet?text=${quote}`,"Tweet Window","width=600,height=400");
    }

    return (
        <div className='quote-container'>
            <div className="title"><h1>Quote of the Day</h1></div>
            <div className='bar'></div>
            <div className='display'>{quote}</div>
            <div className='author-box'>
                <div className='bar'></div>
                <div className='author-name'>{author}</div>
            </div>
            <div className='quote-element'>
                <button onClick={handleOnClick} className='new-quote'>New Quote</button>
                <div className='tweet-box'>
                    <button onClick={handleTweet} className='tweet'><img className='logo' src={twitter_logo} alt="" />Tweet</button>
                </div>
            </div>
        </div>
    )
}

export default QuoteComponent
