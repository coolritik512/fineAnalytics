import { API_KEY, BASE_URL } from "../const/variable";

const getfinalUrl = (baseUrl, apiKey, query) => {
    return baseUrl + '/query?' + `apikey=${apiKey}` + `&${query}`;
}

export const fetchData = async (query) => {
    const baseUrl = BASE_URL
    const apiKey = API_KEY;

    const finalUrl = getfinalUrl(baseUrl, apiKey,query);
    console.log(finalUrl);
    const response = await fetch(finalUrl).then(res => res.json());

    return response;
}