import axios, { AxiosError, AxiosResponse } from "axios"
import { CHAT_GET_API, CONNECTION_REPORT_USER, CONNECTION_REQUEST, DISCONNECT_USER_CONNECTION, DISMISSED_SUJJECTION_API, GET_CONNECTION_API, GET_PROFILES, GET_SENDER_API, GET_SUJJECTION_API, GLOBAL_SEARCH, INVITATION_LIST, JOKES_URL, LOGIN_URL, SEARCH_CONNECTION, SEND_CHAT_RESPONSE_API, SENDER_WITHDRAW_REQUEST, UPDATE_CONNECTION_STATUS } from "./api"

// export const jokesFetching=()=>{
//     axios.get('/api/v1/jokes').then((d: AxiosResponse) => {
//         console.log(d)
//         return d})
//     .catch((d: AxiosError) => d.response?.data);
// }

export function jokesFetching(
    
  ): Promise<AxiosResponse> {
    return axios
      .get(`/api/v1/jokes`)
      .then((d: any) => d)
      .catch((d: AxiosError) => d.response?.data);
  }

  export const loginUsernamePasswordApi = (postData: any) => {
    return axios
      .post(`${LOGIN_URL}`, postData)
      .then((d: AxiosResponse<any>) => d?.data);
  };

  export const serachFilterApi = (postData: any) => {
    return axios
      .post(`${SEARCH_CONNECTION}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const sujjectionApi = (postData: any) => {
    return axios
      .post(`${GET_SUJJECTION_API}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const connectionRequest=(postData: any) => {
    return axios
      .post(`${CONNECTION_REQUEST}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const invitationRequest=(postData: any) => {
    return axios
      .post(`${INVITATION_LIST}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const updateInvitationRequest=(postData: any) => {
    return axios
      .put(`${UPDATE_CONNECTION_STATUS}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const profileRequest=(postData: any) => {
    return axios
      .post(`${GET_PROFILES}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const getConnection=(postData: any) => {
    return axios
      .post(`${GET_CONNECTION_API}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const getsenderApi=(postData: any) => {
    return axios
      .post(`${GET_SENDER_API}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const senderWithdrawApi=(postData: any) => {
    return axios
      .post(`${SENDER_WITHDRAW_REQUEST}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const chatSendMessageApi=(postData: any) => {
    return axios
      .post(`${SEND_CHAT_RESPONSE_API}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const getChaMessageApi=(query: string) => {
    return axios
      .get(`${CHAT_GET_API}?${query}`)
      .then((d: AxiosResponse<any>) => d);
  };
  
  export const getGlobalSearchApi=(query: string) => {
    // console.log(query)
    return axios
      .get(`${GLOBAL_SEARCH}?${query}`)
      .then((d: AxiosResponse<any>) => d);
  };

  export const reportUserApi=(postData: any) => {
    return axios
      .post(`${CONNECTION_REPORT_USER}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const disconnectUserApi=(postData: any) => {
    return axios
      .post(`${DISCONNECT_USER_CONNECTION}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };

  export const dismissedSujjectionApi=(postData: any) => {
    return axios
      .post(`${DISMISSED_SUJJECTION_API}`,postData)
      .then((d: AxiosResponse<any>) => d);
  };
  