export function selectSay(state) {
  return state.app.say;
}

export function selectAccount(state) {
  return state.app.account;
}

export function selectIsAccountLoading(state) {
  return state.app.isAccountLoading;
}
