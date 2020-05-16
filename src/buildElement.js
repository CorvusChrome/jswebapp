import { fetchApp } from './fetxhApp.js';
import { userName } from './createModal.js';



export function buildElement(t, key, userNameforBuild) {
    var element = document.create({
        className: 'mui--text-black-54 block',
        id: key,
        style: 'margin-bottom: 1rem'
    });
    element.append({
        className: 'UserName mui--text-subhead',
        innerText: userNameforBuild,
        style: ''
    })
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
    if (userNameforBuild == userName) {
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
    }
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
                    dateEdit: new Date(),
                }, key).then(async editingKey => {
                    const data = await fetchApp.get();
                    let thisElement = document.getElementById(key);
                    thisElement.innerHTML = null;
                    thisElement.appendChild(buildElement(data[key], key, userName))
                })
            }
        }
    });
}
