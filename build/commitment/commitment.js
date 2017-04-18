System.register(['../config/env.js'], function (_export, _context) {
    "use strict";

    var env;


    function validateForm() {
        let form = document.forms["metaverseForm"]['email'].value;
        let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailReg.test(form['email'].value) && form['name'].value == "" && !Number(form['commitment'].value)) {
            return false;
        }
        return true;
    }

    function submitCommitment() {
        if (validateForm()) {
            let request = new XMLHttpRequest();
            request.open('POST');
        }
    }

    return {
        setters: [function (_configEnvJs) {
            env = _configEnvJs.default;
        }],
        execute: function () {
            window.showModal = function (bool = false) {
                let modal = document.getElementById('modal-commitment');
                return bool ? modal.style.display = "block" : modal.style.display = "none";
            };
        }
    };
});