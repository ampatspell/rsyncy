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
  exclude: null,
  groupId: null,

  serialize() {
    return assign(this._super(), this.getProperties('name', 'source', 'target', 'watch', 'groupId', 'exclude'));
  },

  deserialize(json) {
    this._super(...arguments);
    let { name, source, target, watch, groupId, exclude } = json;
    this.setProperties({ name, source, target, watch, groupId, exclude });
  }

});
