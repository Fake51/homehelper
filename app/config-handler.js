export function loadConfig() {
    return fetch('/config.json')
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error('Could not load config');
            }

            return response.json();
        });
};
