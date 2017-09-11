import Ember from 'ember';
import Settings from './-base';

const {
  assign
} = Ember;

export default Settings.extend({

  name: null,
  local: null,
  remote: null,
  watch: true,
  groupId: null,

  serialize() {
    return assign(this._super(), this.getProperties('name', 'local', 'remote', 'watch', 'groupId'));
  },

  deserialize(json) {
    this._super(...arguments);
    let { name, local, remote, watch, groupId } = json;
    this.setProperties({ name, local, remote, watch, groupId });
  }

});
