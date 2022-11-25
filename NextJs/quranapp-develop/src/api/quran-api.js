import useSWR from "swr";
import { api, BASE_URL } from "./api";

const useUthmaniScript = ({
  chapter_number,
  // juz_number,
  // page_number,
  // hizb_number,
  // rub_number,
  // verse_key,
}) => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);

  const { data, error } = useSWR(
    `${BASE_URL}/quran/verses/uthmani?chapter_number=${chapter_number}`,
    fetcher
  );
  console.log("quran verses data", data);

  return { data, error, isLoading: !data && !error };
};

const useUthmaniTajweedScript = () => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);

  const { data, error } = useSWR(
    `${BASE_URL}/quran/verses/uthmani_tajweed`,
    fetcher
  );
  return { data, error, isLoading: !data && !error };
};

export { useUthmaniScript, useUthmaniTajweedScript };
