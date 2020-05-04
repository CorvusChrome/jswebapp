import './styles.css';
import { isValidLength } from './utilits';
import { TextApp } from './textapp';


const form = document.getElementById('form');
const textInput = form.querySelector('#text-input');
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', TextApp.renderList)


form.addEventListener('submit', submitFormHandler)

textInput.addEventListener('input', () => { submitBtn.disabled = !isValidLength(textInput.value) })

function submitFormHandler(e) {
    e.preventDefault()

    if (isValidLength(textInput.value)) {
        const textInfo = {
            title: textInput.value.trim(),
            date: new Date().toJSON()
        }
        submitBtn.disabled = true;

        TextApp.create(textInfo).then(() => {
            textInput.value = '';
            textInput.className = '';
            submitBtn.disabled = false;
        })
    }
}