const quote = document.querySelector('#quote');
const author = document.getElementById('author');

const newQuoteBtn = document.querySelector('.newQuote')

newQuoteBtn.addEventListener('click', () => {
    getQuote(api_url)    
    copyBtn.innerHTML = "Copy"
    copyBtn.classList.remove('copied')

    likeBtn.innerHTML = 'Like'
    likeBtn.classList.add('like')
    likeBtn.classList.remove('unlike')
})

const api_url = "https://api.quotable.io/random"

function getQuote(url){

    newQuoteBtn.classList.add('loading')
    newQuoteBtn.innerHTML = "loading Quote..."

    let keyId = 0;

    fetch(url).then((res) => res.json()).then(data => {
        quote.innerHTML = data.content
        author.innerHTML = data.author
        newQuoteBtn.innerHTML = "New Quote"
        newQuoteBtn.classList.remove('loading')
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
    copyBtn.classList.remove('copy')
    copyBtn.innerHTML = 'Copied'
})

const likeBtn = document.querySelector('.like');
let quotesArray = JSON.parse(localStorage.getItem('favoriteQuotes')) || []
let id = quotesArray.length
likeBtn.addEventListener('click', () => {
  if (likeBtn.classList.contains('like')) {
    likeBtn.innerHTML = 'Unlike'
    likeBtn.classList.add('unlike')
    likeBtn.classList.remove('like')

    const newQuote = {
      id: id,
      text: quote.innerHTML,
      author: author.innerHTML
    }

    quotesArray.push(newQuote)
    id++
    localStorage.setItem('favoriteQuotes', JSON.stringify(quotesArray))
  } else {
    likeBtn.innerHTML = 'Like'
    likeBtn.classList.add('like')
    likeBtn.classList.remove('unlike')

    const quoteToRemove = quotesArray.find(quote => quote.id === id)
    const indexToRemove = quotesArray.indexOf(quoteToRemove);
    quotesArray.splice(indexToRemove, 1);

    localStorage.setItem('favoriteQuotes', JSON.stringify(quotesArray));
  }
});

const favoriteBtn = document.querySelector('.favorite')
favoriteBtn.addEventListener('click', () => {
  handleClick()
})

const handleClick = () => {
  favoriteBtn.classList = 'favorite opened'
  const container = document.querySelector('.container')
  const favoriteBox = document.createElement('div')
  favoriteBox.className = 'favorite-box'
  container.appendChild(favoriteBox)

  const h4 = document.createElement('h4')
  h4.innerHTML = 'Favorite Quote'

  const ol = document.createElement('ol')
  ol.classList.add('ol')
  for (let i = 0; i < quotesArray.length; i++){
    const li = document.createElement('li')
    const textQuote = quotesArray[i].text
    const authorQuote = quotesArray[i].author
    li.innerHTML = `"${textQuote}"` + ' ---' + authorQuote
    ol.appendChild(li)
  }

  const divBtn = document.createElement('div')
  divBtn.className = 'favorite-box__btn'

  const btn__close = document.createElement('button')
  btn__close.innerHTML = 'Close'
  btn__close.className = 'closeBtn'
  btn__close.addEventListener('click', () =>{
    favoriteBtn.classList.remove('opened')
    favoriteBox.remove()
  })

  const btn__clearAll = document.createElement('button')
  btn__clearAll.innerHTML = 'Clear All'
  btn__clearAll.className = 'clearAllBtn'
  btn__clearAll.addEventListener('click', () =>{
    localStorage.removeItem('favoriteQuotes')
  })


  divBtn.appendChild(btn__close)
  divBtn.appendChild(btn__clearAll)

  favoriteBox.appendChild(h4)
  favoriteBox.appendChild(ol)
  favoriteBox.appendChild(divBtn)
}


