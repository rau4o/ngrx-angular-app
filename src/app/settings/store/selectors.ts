import {AppStateInterface} from "../../shared/types/appState.interface";
import {SettingsStateInterface} from "../types/settingsState.interface";
import {createSelector} from "@ngrx/store";

export const settingsFeatureSelector = (state: AppStateInterface): SettingsStateInterface => state.settings;

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInterface) => settingsState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInterface) => settingsState.validationErrors
)
