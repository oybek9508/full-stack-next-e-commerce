import axios from "axios";

console.log(
  "process.env.NEXT_PUBLIC_QURAN_API_URL",
  process.env.NEXT_PUBLIC_QURAN_API_URL
);

export const HOME_URL = process.env.NEXT_PUBLIC_QURAN_API_URL;
export const BASE_URL = `${HOME_URL}/api/v4`;

class API {
  callApi({ url }) {
    return axios({
      url,
      method: "GET",
    });
  }
}

export const api = new API();
