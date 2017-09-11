import Ember from 'ember';
import Settings from './-base';

const {
  assign
} = Ember;

export default Settings.extend({

  name: null,

  serialize() {
    return assign(this._super(), this.getProperties('name'));
  },

  deserialize(json) {
    this._super(...arguments);
    let { name } = json;
    this.setProperties({ name });
  }

});
