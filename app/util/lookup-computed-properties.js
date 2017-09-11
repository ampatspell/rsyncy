import Ember from 'ember';

const {
  A
} = Ember;

export default (instance, match) => {
  let values = A();
  instance.constructor.eachComputedProperty((name, meta) => {
    if(match(name, meta)) {
      values.push(instance.get(name));
    }
  });
  return values;
}
