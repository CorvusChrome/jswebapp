import { singInWithEmailAndPasword, singUpWithEmailAndPasword } from './aut.js'

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

    function submitEmailForm(e) {
        e.preventDefault();
        const email = e.target.querySelector('#email-input').value;
        const password = e.target.querySelector('#password-input').value;
        const userName = e.target.querySelector('#user-name-input') ? e.target.querySelector('#user-name-input').value : '';
        userName ? singUpWithEmailAndPasword(email, password) :  singInWithEmailAndPasword(email, password)
        ;

    }
}

