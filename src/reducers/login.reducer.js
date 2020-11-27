import { loginConstants } from '../constants/index'

const initialState = {
  agentId: '',
  uuid: '',
  lsn: '',
  error:'',
  isValidLogin:false,
  loading:false
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading:true
      };
    case loginConstants.LOGIN_SUCCESS:
      return {
        ...state,
        agentId: action.payload.agentId,
        uuid: action.payload.uuid,
        lsn: action.payload.lsn,
        isValidLogin:true,
        loading:false,
        error:''
      };
    case loginConstants.LOGIN_FAIL:
      return {
        ...state,
        isValidLogin:false,
        error:action.payload,
        loading:false
      };
    case loginConstants.LOGOUT:
      return {
        ...state,
        agentId: '',
        uuid: '',
        lsn: '',
        isValidLogin:false,
        error:'',
        loading:false
      };
    default:
      return state
  }
}
