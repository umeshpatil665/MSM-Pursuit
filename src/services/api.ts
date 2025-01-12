
const apiUrl = import.meta.env.VITE_API_URL;
const apiUrlAiMl=import.meta.env.VITE_API_URL_AI_ML
export const JOKES_URL=apiUrl+"/api/v1/jokes"
export const LOGIN_URL=apiUrl+"/api/v1/login"
export const SEARCH_CONNECTION=apiUrl+"/api/v1/globalSearchConnections"
export const GET_SUJJECTION_API=apiUrl+"/api/v1/getsuggestion"
// export const GET_SUJJECTION_API=apiUrlAiMl+"/api/v1/recommend-user"

export const CONNECTION_REQUEST=apiUrl+"/api/v1/connectionRequest"
export const INVITATION_LIST=apiUrl+"/api/v1/getConnectionListByReceiver"
export const UPDATE_CONNECTION_STATUS=apiUrl+"/api/v1/updateconnectionstuats"

export const GET_PROFILES=apiUrl+"/api/v1/getprofile"

export const GET_CONNECTION_API=apiUrl+"/api/v1/getUserConnections"
export const GET_SENDER_API=apiUrl+"/api/v1/getConnectionListBysender"

export const SENDER_WITHDRAW_REQUEST =apiUrl+'/api/v1/deleteconnectionrequest'

// chating api
 export const CHAT_GET_API=apiUrl+'/api/v1/fetch-conversations'
 export const SEND_CHAT_RESPONSE_API=apiUrl+"/api/v1/conversations"

 export const GLOBAL_SEARCH=apiUrl+"/api/v1/globalSearch"