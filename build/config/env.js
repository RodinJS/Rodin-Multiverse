System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            const env = {
                local: {
                    base: 'http://localhost:3000/api/user/metaverse'
                },
                dev: {
                    base: 'https://api.rodin.io/api/user/metaverse'
                }
            };

            _export('env', env);
        }
    };
});