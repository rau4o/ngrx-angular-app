import {PopularTagsStateInterface} from "../types/popularTagsState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from "./actions/getPopularTags.action";

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

const popularTagsReducer = createReducer(
  initialState,
  //TODO: Get popular tags
  on(getPopularTagsAction, (state): PopularTagsStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getPopularTagsSuccessAction, (state, action): PopularTagsStateInterface => ({
    ...state,
    isLoading: false,
    data: action.popularTags
  })),
  on(getPopularTagsFailureAction, (state): PopularTagsStateInterface => ({
    ...state,
    isLoading: false
  }))
)

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action);
}
