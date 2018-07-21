// ACTION TYPES
export const types = {
  SAY_HI: 'SAY_HI',
  SAY_BYE: 'SAY_BYE'
};

// ACTION CREATORS
export const sayHi = () => ({
  type: types.SAY_HI
});

export const sayBye = () => ({
  type: types.SAY_BYE
});
