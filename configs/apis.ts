import axios, { AxiosInstance } from "axios";
const BASE_URL = "http://192.168.88.104:5000/";

const defaultAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const endpoints = {
  voice: "/voice/",
  voiceDetail: (id: string | number) => `/voice/${id}/`,
  voiceReactions: (id: string | number) => `/voice/${id}/reactions/`,
  voiceComments: (id: string | number) => `/voice/${id}/comments/`,

  // filter
  voicesPublic: "/voices/?visibility=public",
  voicesFriends: "/voices/?visibility=friends",

  // voicePublic: "/voice/public/",
  // voiceFriends: "/voice/friends/",
  commentReplies: (commentId: string | number) => `/comments/${commentId}/replies/`,
  login: "/auth/login/",
};

export const authApis = (token: string): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `${token}`,
    },
  });
};

export default defaultAxios;