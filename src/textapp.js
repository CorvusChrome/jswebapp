
export class TextApp {
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
            .then(addTolocalStorage)
            .then(TextApp.renderList);
    }

    static renderList() {
        const textApp = getTextFromLocalStorage();

        const html = textApp.length
            ? textApp.map(toCard).join(' ')
            : `<div class="mui--text-headline">No much text in here</div>`

        const list = document.getElementById('list');
        list.innerHTML = html;
    }
}


function addTolocalStorage(t) {
    const all = getTextFromLocalStorage();
    all.push(t)
    localStorage.setItem('Text', JSON.stringify(all))
}

function getTextFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Text') || '[]')
}


function toCard(t) {
    return `<div class="mui--text-black-54">
    <br>
    <div>${new Date(t.date).toLocaleDateString()}
    ${new Date(t.date).toLocaleTimeString()}</div>
    
    <div>${t.title}</div>
    <br>
    </div>`
}