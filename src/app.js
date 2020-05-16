import { fetchApp } from './fetxhApp.js';
import { buildElement } from './buildElement.js';
import { userName, createLoginPanel } from './createModal.js'

Document.prototype.create = function (cfg) {
    return Object.assign(this.createElement(cfg.tag ?? 'div'), cfg);
}
HTMLElement.prototype.append = function (cfg) {
    return this.appendChild(document.create(cfg));
};
Date.prototype.toNiceString = function () {
    return this.toLocaleDateString() + ' ' + this.toLocaleTimeString();
}

window.addEventListener('load', () => {
    renderList();
    createLoginPanel();
});

form.addEventListener('submit', submitFormHandler);



const textInput = form.querySelector('#text-input');

export async function renderList() {
    const data = await fetchApp.get();
    const list = document.getElementById('list')
    list.innerText = null;
    for (let q in data) {
        list.appendChild(buildElement(data[q], q, data[q].userName));
    }
}

async function submitFormHandler(e) {
    e.preventDefault()
    const textInfo = {
        title: textInput.value.trim(),
        date: new Date().toJSON(),
        userName: userName
    }
    const key = await fetchApp.post(textInfo);
    const list = document.getElementById('list');
    list.appendChild(buildElement(textInfo, key.name, userName))
    textInput.value = '';
    textInput.className = '';
}





