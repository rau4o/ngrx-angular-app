import {AppStateInterface} from "../../shared/types/appState.interface";
import {UserProfileStateInterface} from "../types/userProfileState.interface";
import {createSelector} from "@ngrx/store";

export const userProfileFeatureSelector = (state: AppStateInterface): UserProfileStateInterface => state.userProfile

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.isLoading
)

export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.data
)

export const validationErrorsSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.error
)
