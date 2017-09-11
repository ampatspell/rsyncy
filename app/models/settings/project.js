import Ember from 'ember';
import Settings from './-base';

const {
  assign
} = Ember;

export default Settings.extend({

  name: null,
  source: null,
  target: null,
  watch: true,
  groupId: null,

  serialize() {
    return assign(this._super(), this.getProperties('name', 'source', 'target', 'watch', 'groupId'));
  },

  deserialize(json) {
    this._super(...arguments);
    let { name, source, target, watch, groupId } = json;
    this.setProperties({ name, source, target, watch, groupId });
  }

});
