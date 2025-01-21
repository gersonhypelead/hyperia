// utils/fetchWithIP.ts
import getIp from './getIp';
import config from '../../../config';

interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

async function fetchWithIP(endpoint: string, options: FetchOptions = {}, data?: any): Promise<any> {
    const url = `${config.API_URL}${endpoint}`;
  
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const headers: HeadersInit = {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Timezone': timeZone, 
  
    };
    if (options.method !== 'GET') {
        const ip = await getIp();
        headers['ip'] = ip;
    }
    const isFormData = data instanceof FormData;


    let body: any;
    if (data instanceof FormData) {
        body = data;
    } else if (data && options.method !== 'GET') {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
    }


    const response = await fetch(url, {
        method: options.method || "POST" || "PUT",
         headers,
         body,
    });
    return response;
}



  
export default fetchWithIP;