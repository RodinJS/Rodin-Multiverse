import {env} from '../config/env.js';

window.submitCommitment = function () {
    if (validateForm()) {
        request("POST", validateForm())
            .then(res => {
                showMessage('THANK YOU!')
            }, err => {
                showMessage(`Ops !
                            Something went wrong.Please
                            try again later `)
            })
    }
};

function showMessage(message) {
    let formContent = document.getElementsByClassName('form-content');
    let messagePanel = document.getElementsByClassName('message')[0];
    formContent[0].style.display = "none";
    messagePanel.style.display = "block";
    messagePanel.childNodes[1].innerText = message;
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
        request.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(request.response);
            } else {
                reject({
                    status: this.status,
                    statusText: request.statusText
                });
            }
        };
        request.onerror = function () {
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
    if (!emailReg.test(form['email'].value) || form['name'].value === "") {
        return false;
    }
    let obj = Object.assign({},{
        email: form.email.value,
        first_name: form.name.value
    });
    setTimeout(() => {
        form.reset();
    }, 1000);
    return obj
}

export function showModal(bool = false) {
    let modal = document.getElementById('modal-commitment');
    return bool ? modal.style.display = "block" : modal.style.display = "none";
}