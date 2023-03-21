import {AuthStateInterface} from "../types/authState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {registerAction, registerFailureAction, registerSuccessAction} from "./actions/register.action";
import {loginAction, loginFailureAction, loginSuccessAction} from "./actions/login.action";
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from "./actions/getCurrentUser.action";
import {updateCurrentUserSuccessAction} from "./actions/updateCurrentUser.action";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null
}

const authReducer = createReducer(
  initialState,
  // TODO: Registration
  on(registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })),
  on(registerSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser
  })),
  on(registerFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
  })),
  // TODO: Login
  on(loginAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })),
  on(loginSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser
  })),
  on(loginFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
  })),
  // TODO: Get current user
  on(getCurrentUserAction, (state): AuthStateInterface => ({
    ...state,
    isLoading: true,
  })),
  on(getCurrentUserSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    currentUser: action.currentUser
  })),
  on(getCurrentUserFailureAction, (state): AuthStateInterface => ({
    ...state,
    isLoggedIn: false,
    isLoading: false,
    currentUser: null
  })),
  //TODO Update current user
  on(updateCurrentUserSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    currentUser: action.currentUser
  }))
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
