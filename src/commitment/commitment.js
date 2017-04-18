import { env } from '../config/env.js'

function showMessage(message) {
    let messagepanel = document.getElementsByClassName('message')[0];
    messagepanel.innerHTML = `<h1>${message}</h1>`
    setTimeout(() => {
        messagepanel.style.display = "none";
    }, 3000)
}
window.submitCommitment = function() {
    if (validateForm()) {
        request("POST", validateForm())
            .then(res => {
                showModal(false);
                showMessage('Thank You !!')
            }, err => {
                showModal(false);
                showMessage(`Ops !
                            Something went wrong.Please
                            try again later `)
            })
    }
}

function request(method, data) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        let encodStr = [];
        for (let p in data) {
            if (data.hasOwnProperty(p)) {
                encodStr.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
            }
        }
        let body = encodStr.join('&');
        request.open(method, env.dev.base);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(request.response);
            } else {
                reject({
                    status: this.status,
                    statusText: request.statusText
                });
            }
        };
        request.onerror = function() {
            reject({
                status: this.status,
                statusText: request.statusText
            });
        };
        request.send(body);
    })
}

function validateForm() {
    let form = document.forms["metaverseForm"];
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(form['email'].value) || form['name'].value == "" || !Number(form['commitment'].value)) {
        return false;
    }
    return {
        email: form.email.value,
        first_name: form.name.value,
        price: form.commitment.value
    };
}

export function showModal(bool = false) {
    let modal = document.getElementById('modal-commitment');
    return bool ? modal.style.display = "block" : modal.style.display = "none";
}