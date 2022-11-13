const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const getQuotes = async() => {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await (await fetch(apiUrl)).json();
        apiQuotes = response;
        getNewQuote();
    } catch (error) {
        alert("Something went wrong. Please try again")
    }
}

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const getNewQuote = () => {
    showLoadingSpinner();
    const quote =  apiQuotes[Math.floor(Math.random() * Math.floor(apiQuotes.length))];
    if (!quote.author) {
        authorText.textContent = "Uknown";
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

const hideLoadingSpinner = () => {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

newQuoteBtn.addEventListener('click', getNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuotes();
