// utils/fetchWithIP.ts
import getIp from './getIp';
import config from '../../../config';

interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

async function fetchWithIP(endpoint: string, options: FetchOptions = {}, data?: any): Promise<any> {
    const url = `${config.API_URL}${endpoint}`;
    console.log(url, " esta es la url", data);
    /*     const ip = await getIp(); */
    const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    };
    console.log(options.method, " ?#################3")
    if (options.method !== 'GET') {
        console.log("ENTREO =======")
        const ip = await getIp();
        headers['ip'] = ip;
    }

    const response = await fetch(url, {
        method: options.method || "POST",
        headers,
        body: data && options.method !== 'GET' ? JSON.stringify(data) : undefined,
    });

    return response
}


export default fetchWithIP;
