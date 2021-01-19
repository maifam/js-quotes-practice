const likesAPI = 'http://localhost:3000/quotes?_embed=likes'
const quoteUl = document.querySelector('#quote-list')
const quoteForm = document.querySelector('#new-quote-form')

fetch(likesAPI)
.then(data => data.json())
.then(quotesArr => iterateQuotes(quotesArr))

function iterateQuotes (quotesArray) {
    quotesArray.forEach (quote => renderQuote(quote))
}

function renderQuote (quoteObj){

    const quoteLi = document.createElement('li')
    quoteLi.setAttribute('class', 'quote-card')
    const blockQuote = document.createElement('blockquote')
    blockQuote.setAttribute('class', 'blockquote')
    const ptag = document.createElement('p')
    ptag.setAttribute('class', 'mb-0')
    const footer = document.createElement('footer')
    footer.setAttribute('class', 'blockquote-footer')
    const likesBtn = document.createElement('button')
    likesBtn.setAttribute('class', 'btn-success')
    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('class', 'btn-danger')
    let quoteSpan = document.createElement('span')
    const editBtn = document.createElement('button')
    editBtn.setAttribute('class', 'btn-light')
    const editSpan = document.createElement('span')
    const deleteSpan = document.createElement('span')
    

    editSpan.textContent = 'Edit'
    deleteSpan.textContent = 'Delete'
    footer.textContent = `Author: ${quoteObj.author}`
    quoteSpan.innerText = quoteObj.likes.length
    blockQuote.innerText = quoteObj.quote
    likesBtn.append(quoteSpan)
    editBtn.append(editSpan)
    deleteBtn.append(deleteSpan)
    blockQuote.append(ptag, footer, likesBtn, deleteBtn, editBtn)
    quoteLi.append(blockQuote)
    quoteUl.append(quoteLi)

    deleteBtn.addEventListener('click', function(){

        fetch((`http://localhost:3000/quotes/${quoteObj.id}`), {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(quoteLi.remove())
    })

    likesBtn.addEventListener('click', function(){
        let likeObj = {
            quoteId: quoteObj.id,
            createdAt: Date.now()
        }
        fetch((`http://localhost:3000/likes`), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(likeObj)
        })
        .then(data => {
            let likes = parseInt(quoteSpan.innerText)
            likes += 1
            quoteSpan.innerText = likes
        })
    })

    editBtn.addEventListener('click', function(event) {
        quoteLi.append(renderEditForm(event))
    })
}

function renderEditForm(quoteObj){
    const quoteInput = document.createElement('input')
    quoteInput.setAttribute = ('id', 'quote-input')
    const quoteLabel = document.createElement('label')
    quoteLabel.setAttribute ('for', 'quote-input')
    quoteLabel.innerHTML= ('Edit Quote')
    quoteInput.innerHTML = quoteObj.quote
    return quoteInput

}

quoteForm.addEventListener('submit', function(event){
    event.preventDefault()
    
    let newQuote = { 
        author: event.target.author.value,
        quote: event.target.quote.value
    }
    renderQuote(newQuote)
    postNewQuote(newQuote)
})


function postNewQuote(newQuote){
    fetch(('http://localhost:3000/quotes'), {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newQuote)
    }) 
    console.log('success!')
}




{/* <li class='quote-card'>
<blockquote class="blockquote">
  <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer class="blockquote-footer">Someone famous</footer>
  <br>

  <button class='btn-success'>Likes: <span>0</span></button>
  <button class='btn-danger'>Delete</button>
</blockquote>
</li> */}