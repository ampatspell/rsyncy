import Ember from 'ember';
import { Model, byId, settings } from './-base';

const {
  inject: { service },
  computed,
  A
} = Ember;

export default Model.extend({

  name: settings('name'),
  source: settings('source'),
  target: settings('target'),
  watch: settings('watch'),
  exclude: settings('exclude'),
  groupId: settings('groupId'),

  group: byId('groups', 'groupId'),

  excludes: computed('exclude', function() {
    let exclude = this.get('exclude');
    if(!exclude) {
      return A();
    }
    return A(exclude.split(',').map(item => item.trim()));
  }).readOnly(),

  platform: service(),

  didLoad() {
    this.get('platform').didAddProject(this);
  },

  didCreate() {
    this.get('platform').didAddProject(this);
  },

  didUpdate() {
    this.get('platform').didUpdateProject(this);
  },

  willDelete() {
    this.get('platform').didRemoveProject(this);
  }

});
