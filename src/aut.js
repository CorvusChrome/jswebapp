
const apiKey = 'AIzaSyBH84gEmnjHPr67KMlGNlo3_uVChTX6odU';

export async function singInWithEmailAndPasword(email, password) {
    let data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    data = await data.json();
    let user = await fetch(`https://corvus-appjs.firebaseio.com/userdata.json`, {
        method: 'GET'
    });
    user = await user.json();
    for (let q in user) {
        if (user[q].id == data.localId) {
            return user[q].userName
        }
    }
}

export async function singUpWithEmailAndPasword(email, password, userName) {
    console.log(userName)
    let data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    data = await data.json();
    data = await fetch(`https://corvus-appjs.firebaseio.com/userdata.json`, {
        method: 'POST',
        body: JSON.stringify({ userName: userName, id: data.localId })
    });
}