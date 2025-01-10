import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface ILoginData {
    phone: string | undefined
    loginData: any,
    consumerNo: string | undefined,
    type: string | undefined,
    password: string | undefined,
    email: string | undefined,
}


const initialState: ILoginData = {
    phone: undefined,
    loginData: {},
    consumerNo: undefined,
    type: undefined,
    password: undefined,
    email: undefined
}


const loginSlicer = createSlice({
    name: 'Login/slice',
    initialState,
    reducers: {
        updateLoginData(state, action: PayloadAction<any>) {
            state.loginData = {...action.payload,isLogin:true};
            
        },
        updatePhoneNumber(state, action: PayloadAction<any>) {
            state.phone = action.payload;
        },
        updateLogin(state, action: PayloadAction<any>) {
            // state.phone = action.payload?.phone;
            state.consumerNo = action.payload?.consumerNo;
            state.password = action.payload?.password
            state.type = action.payload?.type
            state.email = action.payload?.email
        },
        updateConsumerNumber(state, action: PayloadAction<any>) {
            state.consumerNo = action.payload;
        },
        updateLogout(state, action: PayloadAction<any>) {
            state.loginData = {...action.payload};
        },
    }
})


export const { updateLoginData, updatePhoneNumber, updateLogin,updateConsumerNumber } = loginSlicer.actions;

export const loginReducerState = (state: RootState) => state.login;
export default loginSlicer.reducer;