const fetchResponsePromiseHandler = () => {
    return (responsePromise) => {
        if (responsePromise.status === 200) {
            return responsePromise.json();
        }
        return responsePromise;
    };
};

export const fetchJsonData = (url, fetchOptions) => {
    return fetch(url, fetchOptions)
        .then(fetchResponsePromiseHandler());
};