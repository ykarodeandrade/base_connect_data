// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

import { useState } from 'react';

export default function useRequest(baseUrl) {
    const [state, setState] = useState({
        running: false,
        success: true,
        body: null,
    });

    function request(method, uri, body) {
        setState({
            running: true,
            success: state.success,
            body: state.body,
        });

        const init = { method: method };
        if (method === 'POST' || method === 'PUT') {
            init.body = JSON.stringify(body);
        }

        fetch(`${baseUrl}${uri}`, init)
            .then((response) => {
                const type = response.headers.get('Content-Type');
                if (response.status === 200) {
                    if (type.startsWith('application/json')) {
                        return response.json()
                            .then((json) => {
                                setState({
                                    running: false,
                                    success: true,
                                    body: json,
                                });
                            });
                    } else {
                        return response.text()
                            .then((text) => {
                                setState({
                                    running: false,
                                    success: true,
                                    body: text,
                                });
                            });
                    }
                } else {
                    return response.text()
                        .then((text) => {
                            if (type.startsWith('text/html')) {
                                const parser = new DOMParser();
                                const document = parser.parseFromString(text, 'text/html');
                                setState({
                                    running: false,
                                    success: false,
                                    body: {
                                        status: response.status,
                                        message: document.body.innerText.trim(),
                                    },
                                });
                            } else {
                                setState({
                                    running: false,
                                    success: false,
                                    body: {
                                        status: response.status,
                                        message: text,
                                    },
                                });
                            }
                        });
                }
            })
            .catch(() => {
                setState({
                    running: false,
                    success: false,
                    body: {
                        status: 0,
                    },
                });
            });
    }

    return {
        get: (uri) => request('GET', uri),
        post: (uri, body) => request('POST', uri, body),
        put: (uri, body) => request('PUT', uri, body),
        del: (uri) => request('DELETE', uri),
        response: state,
    };
}
