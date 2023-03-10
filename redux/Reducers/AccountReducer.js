export const ACCOUNT = 'ACCOUNT';
const initialState ={};
const AccountReducer = (state = initialState, payload) => {
    switch(payload.type) {
        case ACCOUNT :
            return {
                ...state,
                id_Account : payload.id_Account,
                fullName : payload.fullName,
                phone : payload.phone,
                email : payload.email,
                state : payload.state,
                currentLatitude : payload.currentLatitude,
                currentLongtitude : payload.currentLongtitude,
            }
        default : return state;
    }
}
export default AccountReducer;