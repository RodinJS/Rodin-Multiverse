import { env } from '../config/env.js'

window.submitCommitment = function() {
    if (validateForm()) {
        request("POST")
            .then(res => {
                showModal(false)
            }, err => showModal(false))
    }
}

function request(method) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, env.local.base)
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
        request.send();
    })
}

function validateForm() {
    let form = document.forms["metaverseForm"];
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(form['email'].value) || form['name'].value == "" || !Number(form['commitment'].value)) {
        return false;
    }
    return true;
}

export function showModal(bool = false) {
    let modal = document.getElementById('modal-commitment');
    if (!bool) {
        var event = new Event('modalClose');
        // Вызываем событие
        document.dispatchEvent(event);
    }
    return bool ? modal.style.display = "block" : modal.style.display = "none";
}