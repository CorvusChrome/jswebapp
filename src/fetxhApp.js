export const fetchApp = {
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