System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            const env = {
                local: {
                    base: 'http://127.0.0.1:3000/api/user/metaverse'
                },
                dev: {
                    base: ''
                }
            };

            _export('env', env);
        }
    };
});