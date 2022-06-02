import {
  LIST_OF_EMP,
  IS_LOGIN,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
} from '../Action/Type';
const initialState = {
  listOfEmp: [],
  isLogin: false,
};

const EmpReducer = (state = initialState, action) => {
  console.log(action.body);
  switch (action.type) {
    case LIST_OF_EMP:
      return {
        ...state,
        listOfEmp: action.body,
      };
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.body,
      };
    case ADD_USER:
      return {
        ...state,
        listOfEmp: state.listOfEmp.concat(action.body),
      };
    case EDIT_USER:
      return {
        ...state,
        listOfEmp: action.body,
      };
    case DELETE_USER:
      return {
        ...state,
        listOfEmp: state.listOfEmp.filter(item => item.id != action.body),
      };

    default:
      return state;
  }
};

export default EmpReducer;
