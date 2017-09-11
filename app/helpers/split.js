import Ember from 'ember';

export function split([ array, delimiter ]) {
  if(!array) {
    return;
  }
  return array.split(delimiter).map(item => {
    if(typeof item === 'string') {
      return item.trim();
    }
    return item;
  });
}

export default Ember.Helper.helper(split);
