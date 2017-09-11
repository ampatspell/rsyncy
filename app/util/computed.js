import Ember from 'ember';

const {
  computed,
  A
} = Ember;

export const array = () => {
  return computed(function() {
    return A();
  });
}
