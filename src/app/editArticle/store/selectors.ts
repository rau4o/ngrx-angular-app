import {AppStateInterface} from "../../shared/types/appState.interface";
import {EditArticleStateInterface} from "../types/editArticleState.interface";
import {createSelector} from "@ngrx/store";

export const editArticleFeatureSelector = (state: AppStateInterface): EditArticleStateInterface => state.editArticle

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isSubmitting
)

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isLoading
)

export const validationErrorsSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.validationErrors
)

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.article
)
