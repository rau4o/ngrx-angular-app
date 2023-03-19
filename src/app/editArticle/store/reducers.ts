import {EditArticleStateInterface} from "../types/editArticleState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from "./actions/updateArticle.action";
import {getArticleAction} from "../../article/store/actions/getArticle.action";
import {getArticleFailureAction, getArticleSuccessAction} from "./actions/getArticle.actions";

const initialState: EditArticleStateInterface = {
  isSubmitting: false,
  isLoading: false,
  validationErrors: null,
  article: null
}

const editArticleReducer = createReducer(
  initialState,
  // TODO Update article
  on(updateArticleAction, (state): EditArticleStateInterface => ({
    ...state,
    isSubmitting: true,
  })),
  on(updateArticleSuccessAction, (state, action): EditArticleStateInterface => ({
    ...state,
    isSubmitting: false,
  })),
  on(updateArticleFailureAction, (state, action): EditArticleStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
  })),
  // TODO Get article
  on(getArticleAction, (state): EditArticleStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getArticleSuccessAction, (state, action): EditArticleStateInterface => ({
    ...state,
    isLoading: false,
    article: action.article
  })),
  on(getArticleFailureAction, (state): EditArticleStateInterface => ({
    ...state,
    isLoading: false
  }))
)

export function reducers(state: EditArticleStateInterface, action: Action) {
  return editArticleReducer(state, action);
}
