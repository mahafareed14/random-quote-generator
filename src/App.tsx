import './App.css'
import axios from "axios";
import { useState , useEffect} from "react"
import {FaTwitter, FaQuoteLeft, FaQuoteRight} from 'react-icons/fa'
 
const API_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
interface Quote {
  quote: string,
  author: string
}
const transition = "1s ease-in-out";
function App() {

  //Get the Random Color..
  const getRandomColor = () : string => {
    const RED = Math.floor(Math.random() * 128);
    const GREEN = Math.floor(Math.random() * 128);
    const BLUE = Math.floor(Math.random() * 128);
    return `rgb(${RED}, ${GREEN}, ${BLUE})`;
  }

  // Change the Quotes...
  function changequote() {
    const randomquote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomquote);
    setRandomColor(getRandomColor());
}

 // UseState variables for quotes, current quotes, current colot
  const [quotes, setquotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState<Quote>({
    author: 'Socrates',
    quote: 'An unexamined life is not worth living.'
  });

  const [randomColor, setRandomColor] = useState(getRandomColor());
  
  useEffect(() => {
    axios.get(API_URL).then(response => {
    const data = response.data.quotes;
    setquotes(data);
    });
  }, [])

  return (
      <div className="background" style={{background: randomColor, transition}}>
        <div id="quote-box">
          <div className="quote-content" style={{color: randomColor, transition}}>
            <h3 id="text">
            <FaQuoteLeft size="30" style= {{marginRight: '10px'}} />
              {currentQuote.quote}
              <FaQuoteRight size="30" style= {{marginRight: '10px'}} />
            </h3>
            <h4 id="author" > - {currentQuote.author}</h4>
            <div className="buttons">
              <a href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${currentQuote.quote}`}
              id="tweet-quote"
              style={{
                marginRight: "10px",
                backgroundColor: "#1DA1F2"
              }}><FaTwitter color="white"/></a>
              <button id="new-quote" onClick= {changequote} 
              style={{background: randomColor, transition}}>
              New Quote
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default App
