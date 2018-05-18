function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function guid(): string {
    return `${s4()}${s4()}-${s4()}${s4()}`;
}

export class FetchWapiParams {
    endpoint: string;
    accessToken: string;
    method?: 'GET' | 'POST' | 'PUT';
    body?: any;
}

export function fetchWapi<T>(param: FetchWapiParams): Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(param.endpoint, {
            method: param.method || 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${param.accessToken}`,
                'X-Request-ID': guid()
            },
            body: param.body ? JSON.stringify(param.body) : undefined
        }).then((res) =>
            res.status >= 200 && res.status <= 300
                ? resolve(res.json())
                : res.json()
                    .then((ex) => reject(ex))
                    .catch(() => reject({
                        message: `${res.status}: ${res.statusText}`
                    }))
        ).catch((ex) => reject({message: `${ex}`}));
    });
}
