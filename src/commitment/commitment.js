import {env} from '../config/env.js';

window.submitCommitment = function () {
    if (validateForm()) {
        validateForm()[2].setAttribute('disabled', 'disabled');
        let data = {
            email: validateForm().email.value,
            first_name: validateForm().name.value
        };
        request("POST", data)
            .then(res => {
                showMessage('Thank You!');
                setTimeout(() => {
                    validateForm()[2].removeAttribute('disabled');
                    validateForm().reset();
                }, 0)
            }, err => {
                showMessage(`Something went wrong. Please check your connection and try again!`);
                setTimeout(() => {
                    validateForm()[2].removeAttribute('disabled');
                    validateForm().reset();
                }, 0)
            })
    }
};

function showMessage(message) {
    let formContent = document.getElementsByClassName('form-content');
    let messagePanel = document.getElementsByClassName('message')[0];
    formContent[0].style.display = "none";
    messagePanel.style.display = "table";
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
    if (!emailReg.test(form.email.value)) {
        form.email.classList.add('error');
        if (form.name.value === "") {
            if (!form.name.classList.contains('error')) {
                form.name.classList.add('error');
            }
        }
        return
    } else {
        form.email.classList.remove('error');
        form.name.classList.remove('error');
    }
    return form
}

export function showModal(bool = false) {
    let modal = document.getElementById('modal-commitment');
    let closeModal = function (e) {
        if (e.srcElement.className === "modaloverlay") {
            modal.removeEventListener('click', closeModal);
            return showModal(false);
        }
    };
    let submitEvent = function (e) {
        if (e.keyCode === 13) {
            e.stopImmediatePropagation();
            modal.removeEventListener('keypress', submitEvent);
            return submitCommitment();
        }
    };
    if (bool) {
        modal.addEventListener('click', closeModal);
        modal.addEventListener('keypress', submitEvent);
    }
    return bool ? modal.style.display = "block" : modal.style.display = "none";
}