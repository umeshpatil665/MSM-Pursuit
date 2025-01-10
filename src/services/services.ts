import axios, { AxiosError, AxiosResponse } from "axios"
import { CONNECTION_REQUEST, GET_CONNECTION_API, GET_PROFILES, GET_SENDER_API, GET_SUJJECTION_API, INVITATION_LIST, JOKES_URL, LOGIN_URL, SEARCH_CONNECTION, UPDATE_CONNECTION_STATUS } from "./api"

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