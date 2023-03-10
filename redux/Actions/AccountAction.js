import { ACCOUNT } from "../Reducers/AccountReducer";

export const AccountAction = (id_Account, fullName, phone, email, state, currentLatitude, currentLongtitude) =>
    async dispatch => {
        try {
            dispatch({
                type : ACCOUNT,
                id_Account : id_Account,
                fullName : fullName,
                phone : phone,
                email : email,
                state : state,
                currentLatitude : currentLatitude,
                currentLongtitude : currentLongtitude,
            })
        } catch (error) {
            console.log(error);
        }
    }