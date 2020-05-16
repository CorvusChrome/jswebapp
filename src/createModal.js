import { renderList } from './app.js'
import { singInWithEmailAndPasword, singUpWithEmailAndPasword } from './aut.js'

let loginPanel = document.getElementById('login-panel')

export function createLoginPanel() {
    loginPanel.innerHTML = `<div class="mui--text-right" id="login" style="display: inline; padding-right: 30px;">Sing up</div>
    <div class="mui--text-right" id="login" style="display: inline;">Sing in</div>`;
    const modal = document.querySelectorAll('#login');
    modal.forEach(el => el.addEventListener('click', createModal))
}

export var userName;

export function createModal(e) {
    const autMetod = e.target.innerText == 'Sing in';
    const modal = document.create({
        className: 'modal'
    });
    let modalForm = autMetod ?
        `<form class="mui-form" id="modal-form">
    <div class="mui-textfield mui-textfield--float-label">
        <input type="text" id="email-input" required autocomplete="on">
        <label>Email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="password-input" required autocomplete="on">
        <label>Password</label>
    </div>
    <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary" id="aut-submit">
        Enter
    </button>    
    </form>`
        : `<form class="mui-form" id="modal-form">
    <div class="mui-textfield mui-textfield--float-label">
        <input type="text" id="email-input" required autocomplete="on">
        <label>Email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="password-input" required autocomplete="on">
        <label>Password</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
        <input type="text" id="user-name-input" required autocomplete="on">
        <label>User name</label>
    </div>
    <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary" id="aut-submit">
        Enter
    </button>    
    </form>`;
    modal.innerHTML = modalForm;

    mui.overlay('on', modal);

    const modalFormHandler = document.getElementById('modal-form');
    modalFormHandler.addEventListener('submit', submitEmailForm);
}

async function submitEmailForm(e) {
    e.preventDefault();
    const email = e.target.querySelector('#email-input').value;
    const password = e.target.querySelector('#password-input').value;
    userName = e.target.querySelector('#user-name-input') ? e.target.querySelector('#user-name-input').value : '';

    if (userName) {
        singUpWithEmailAndPasword(email, password, userName)
    } else {
        userName = await singInWithEmailAndPasword(email, password)
    }

    renderList();

    let user = document.create({
        tag: 'td',
        className: 'mui--text-right user-name mui--text-subhead',
        innerText: `Singed in as ${userName}`,
        title: 'Sing out',
        onclick: () => {
            createLoginPanel();
            renderList();
            return userName = null;
        }
    });
    loginPanel.innerHTML = null
    loginPanel.appendChild(user);
    mui.overlay('off');

    return userName;
}