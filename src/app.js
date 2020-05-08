import { fetchApp } from './fetxhApp.js';
import { buildElement } from './buildElement.js';
import { createModal } from './createModal.js'

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

const modal = document.querySelectorAll('#login');
modal.forEach(el => el.addEventListener('click', createModal))

const textInput = form.querySelector('#text-input');

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





