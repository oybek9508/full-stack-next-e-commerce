import { BASE_URL, HOME_URL, api } from "./api";
import useSWR from "swr";
import qs from "qs";
import axios from "axios";

const useQuranChapters = () => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);
  const { data, error } = useSWR(`${BASE_URL}/chapters`, fetcher);
  //   console.log("data", data);
  //   console.log("error", error);
  return { data, error, isLoading: !data && !error };
};

const useSingleSurah = (id) => {
  const fetcher = (url) => api.callApi({ url }).then((res) => res.data);
  const { data, error } = useSWR(`${BASE_URL}/chapters/${id}`, fetcher);
  return { data, error, isLoading: !data && !error };
};

const useSingleSurahInfo = {};

export { useQuranChapters, useSingleSurah };
