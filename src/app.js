class TextApp {
    static create(t) {
        return fetch('https://corvus-appjs.firebaseio.com/text.json', {
            method: 'POST',
            body: JSON.stringify(t),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                t.id = response.name
                return t
            })
            .then(TextApp.renderList);
    }

    static renderList() {
        fetch('https://corvus-appjs.firebaseio.com/text.json')
            .then(response => response.json())
            .then(response => {
                let output;
                if (response.error) {
                    window.alert(`<p>${response}</p>`);
                }
                else {
                    output = Object.keys(response).map(key => ({
                        ...response[key],
                        id: key
                    }))
                }
                const list = document.getElementById('list');
                list.innerHTML = output.map(toCard).join(' ');
                const editBtn = document.querySelectorAll('#edit-btn');
                editBtn.forEach(q => q.addEventListener('click', editElement));
                const deleteBtn = document.querySelectorAll('#delete-btn');
                deleteBtn.forEach(q => q.addEventListener('click', deleteElement));
            })
    }

}

const form = document.getElementById('form');
const textInput = form.querySelector('#text-input');
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', TextApp.renderList)


form.addEventListener('submit', submitFormHandler)

textInput.addEventListener('input', () => { submitBtn.disabled = !isValidLength(textInput.value) })

function submitFormHandler(e) {
    e.preventDefault()

    if (textInput.value.length >= 5) {
        const textInfo = {
            title: textInput.value.trim(),
            date: new Date().toJSON(),
            dateEdit: ""
        }
        submitBtn.disabled = true;

        TextApp.create(textInfo).then(() => {
            textInput.value = '';
            textInput.className = '';
            submitBtn.disabled = false;
        })
    }
}


function toCard(t) {
    const date = `<div style="display:inline">${new Date(t.date).toLocaleDateString()}
    &nbsp;${new Date(t.date).toLocaleTimeString()}</div>`

    const dateEdit = t.dateEdit ? `<div class="edit date">edited: ${new Date(t.dateEdit).toLocaleDateString()}
    &nbsp;${new Date(t.dateEdit).toLocaleTimeString()}</div>`
        : ""

    const title = `<div><div id='${t.id}' style="display:inline;"> 
    ${t.title}</div><div class="edit btn" id="edit-btn"> edit</div><div class="edit btn" id="delete-btn">delete </div></div>`

    return `<div class="mui--text-black-54 ${t.id}">${date}  ${dateEdit}${title}<br></div>`
}


function editElement() {
    const textClass = this.previousSibling;
    const date = this.parentNode.parentNode.firstChild.nextSibling.innerText;
    textClass.innerHTML = `<input id=${textClass.id} value="${textClass.innerText}">`;
    textClass.addEventListener('keypress', function (e) {
        let editedText = textClass.firstChild;
        if (e.key === 'Enter') {
            const textInfo = {
                title: editedText.value.trim(),
                dateEdit: new Date().toJSON()
            }
            fetch(`https://corvus-appjs.firebaseio.com/text/${this.id}.json`, {
                method: 'PATCH',
                body: JSON.stringify(textInfo),
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => {
                    textInfo.id = response.name
                    return textInfo;
                })
                .then(TextApp.renderList);
        }
    })
}

function deleteElement() {
    const elementToDelete = this.parentNode.firstChild;
    fetch(`https://corvus-appjs.firebaseio.com/text/${elementToDelete.id}.json`, {
        method: 'DELETE'
    }).then(TextApp.renderList);
}

