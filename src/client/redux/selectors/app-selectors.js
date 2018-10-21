export function selectSay(state) {
  return state.app.say;
}

export function selectAccount(state) {
  return state.app.account;
}

export function selectIsAccountLoading(state) {
  return state.app.isAccountLoading;
}

export function selectCurrentNotification(state) {
  return state.app.currentNotification;
}

export function selectIsNotificationOpen(state) {
  return state.app.isNotificationOpen;
}
