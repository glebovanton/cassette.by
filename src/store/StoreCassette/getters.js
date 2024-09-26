export function requestData(state) {
  return state;
}

export function selectedLanguage(state) {
  return state.selectedLanguageIndex === 0 ? 'Ru' : 'Blr';
}
