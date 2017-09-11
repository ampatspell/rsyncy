import Ember from 'ember';

export function or(params) {
  for(let i = 0; i < params.length; i++) {
    if(params[i]) {
      return true;
    }
  }
  return false;
}

export default Ember.Helper.helper(or);
