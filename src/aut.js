const API_KEY = 'AIzaSyBH84gEmnjHPr67KMlGNlo3_uVChTX6odU';

export function singInWithEmailAndPasword(email, password) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true })
    })
        .then(response => response.json())
        .then(data => console.log(data))
}

export function singUpWithEmailAndPasword(email, password) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true })
    })
        .then(response => response.json())
        .then(data => console.log(data))
}