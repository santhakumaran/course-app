import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';
export default function courseReducer(state = initialState.courses, action) {

  console.log("reducer", action);
  switch(action.type) {
      case actionTypes.GET_COURSE_SUCCESS:
        console.log("GET_COURSE_SUCCESS", action);
        return [...state.filter(course => course.id !== action.course.id),
          Object.assign({}, action.course)
        ];

      case actionTypes.CREATE_COURSE_SUCCESS:
        return [...state, 
            Object.assign({}, action.course)
        ];
        
        case actionTypes.UPDATE_COURSE_SUCCESS:
        return [...state.filter(course => course.id !== action.course.id), 
            Object.assign({}, action.course)
        ];
        
        case actionTypes.LOAD_COURSES_SUCCESS:
        return action.courses;

        default :
        return state;
    }
}
