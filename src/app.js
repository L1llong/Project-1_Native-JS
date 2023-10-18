const quote = document.querySelector('#quote');
const author = document.getElementById('author');

const newQuoteBtn = document.querySelector('.newQuote')

newQuoteBtn.addEventListener('click', () => {
    getQuote(api_url)    
})

const api_url = "https://api.quotable.io/random"

function getQuote(url){

    newQuoteBtn.classList.add('loading')
    newQuoteBtn.innerHTML = "loading Quote..."

    fetch(api_url).then((res) => res.json()).then(data => {
        quote.innerHTML = data.content
        author.innerHTML = data.author
        newQuoteBtn.innerHTML = "New Quote"
        newQuoteBtn.classList.remove('loading')

        copyBtn.innerHTML = "Copy"
        copyBtn.classList.remove('copied')
    })
    
}

getQuote(api_url)

function shareVk(){
    window.open('https://vk.com/share.php?title=' + 
    `"${quote.innerHTML}"`+ '---- by ' + `${author.innerHTML}`, 
    'VK window', 'height=350,width=300')
}


const shareBtn = document.querySelector('.share')
shareBtn.addEventListener('click', shareVk)

const copyBtn = document.querySelector('.copy')
copyBtn.addEventListener('click', () =>{
    navigator.clipboard.writeText(quote.innerHTML)
    copyBtn.classList.add('copied')
    copyBtn.innerHTML = 'Copied'
})
