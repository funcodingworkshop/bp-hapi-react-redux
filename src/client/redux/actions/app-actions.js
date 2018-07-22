// TODO delete test actions
// ACTION TYPES
export const APP_TYPES = {
  SAY_HI: 'SAY_HI',
  SAY_BYE: 'SAY_BYE'
};

// ACTION CREATORS
export function sayHi() {
  return {
    type: APP_TYPES.SAY_HI
  };
}

export function sayBye() {
  return {
    type: APP_TYPES.SAY_BYE
  };
}
