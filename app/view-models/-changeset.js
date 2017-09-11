import Ember from 'ember';
import ViewModel from './-base';

const {
  computed: { reads, not, or },
  RSVP: { reject, resolve }
} = Ember;

export default ViewModel.extend({

  isValid: reads('validations.isValid'),
  isInvalid: not('isValid'),
  isBusy: false,

  isActionsDisabled: or('isInvalid', 'isBusy'),

  serialize() {
    if(this.get('isInvalid')) {
      return reject(new Error('Changeset is invalid'));
    }
    let props = this.get('properties');
    return resolve().then(() => {
      if(!props) {
        return {};
      }
      return this.getProperties(props);
    });
  },

  build(model) {
    if(!model) {
      return this;
    }
    let props = this.get('properties');
    if(!props) {
      return this;
    }
    let values = model.getProperties(props);
    for(let key in values) {
      let value = values[key];
      if(Ember.ObjectProxy.detectInstance(value)) {
        values[key] = value.get('content');
      }
    }
    this.setProperties(values);
    return this;
  }

});
