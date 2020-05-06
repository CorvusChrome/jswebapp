Document.prototype.create = function (cfg) {
    return Object.assign(this.createElement(cfg.tag ?? 'div'), cfg);
}
HTMLElement.prototype.append = function (cfg) {
    return this.appendChild(document.create(cfg));
};
Date.prototype.toNiceString = function () {
    return this.toLocaleDateString() + ' ' + this.toLocaleTimeString();
}

window.addEventListener('load', renderList);
form.addEventListener('submit', submitFormHandler);
const textInput = form.querySelector('#text-input');

let fetchApp = {
    url: 'https://corvus-appjs.firebaseio.com/',
    get: async function () {
        let response = await fetch(`${this.url}text.json`);
        return response.json();
    },
    post: async function (data) {
        let response = await fetch(`${this.url}text.json`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.json();
    },
    pathc: async function (data, id) {
        let response = await fetch(`${this.url}text/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        response.json();
    },
    delete: async function (id) {
        await fetch(`${this.url}text/${id}.json`, {
            method: 'DELETE'
        });
    }
}

async function renderList() {
    const data = await fetchApp.get();
    const list = document.getElementById('list')
    list.innerText = null;
    for (let q in data) {
        list.appendChild(buildElement(data[q], q));
    }
}

async function submitFormHandler(e) {
    e.preventDefault()
    const textInfo = {
        title: textInput.value.trim(),
        date: new Date().toJSON(),
    }
    const key = await fetchApp.post(textInfo);
    const list = document.getElementById('list');
    list.appendChild(buildElement(textInfo, key.name))
    textInput.value = '';
    textInput.className = '';
}

function buildElement(t, key) {
    var element = document.create({ className: 'mui--text-black-54 block', id: key });
    element.append({
        innerText: new Date(t.date).toNiceString(),
        style: 'display:inline',
    });

    if (t.dateEdit) {
        element.append({
            className: 'edit date',
            style: 'display:inline',
            style: 'padding-left:5px',
            innerText: 'edited  ' + new Date(t.date).toNiceString()
        });
    }
    let title = element.append({
        innerText: t.title
    });
    title.append({
        className: 'edit btn',
        innerText: 'edit',
        onclick: () => editElement(t, title, key)
    });
    title.append({
        className: 'edit btn',
        innerText: 'delete',
        onclick: () => {
            fetchApp.delete(key);
            const elementToDelete = document.getElementById(key)
            elementToDelete.parentNode.removeChild(elementToDelete);
        }
    });
    return element;
}

async function editElement(t, title, key) {
    title.innerHTML = null;
    title.append({
        tag: 'textarea',
        className: 'mui-textfield mui-textfield--float-label',
        value: t.title,
        onkeypress: e => {
            if (e.key == 'Enter') {
                fetchApp.pathc({
                    title: e.target.value.trim(),
                    dateEdit: new Date()
                }, key).then(async editingKey => {
                    const data = await fetchApp.get();
                    let thisElement = document.getElementById(key);
                    thisElement.innerHTML = null;
                    thisElement.appendChild(buildElement(data[key], key))
                })
            }
        }
    });
}

