import Ember from 'ember';

const {
  getOwner
} = Ember;

export default (owner, factoryName, extendedName, fn) => {
  owner = getOwner(owner);
  let fullName = `${factoryName}/-${extendedName}`;
  let Factory = owner.factoryFor(fullName);
  if(!Factory) {
    Factory = owner.factoryFor(factoryName);
    let Extended = fn(Factory.class);
    owner.register(fullName, Extended);
    Factory = owner.factoryFor(fullName);
  }
  return Factory;
}
