import { AppConfig } from './app-config';
import { getNocacheValue } from 'app/utils/get-nocache-value';

export const getAppConfig = (): Promise<AppConfig> => (
    fetch(`../appConfig.json?nocache=${getNocacheValue()}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then((response) => response.json())
);
