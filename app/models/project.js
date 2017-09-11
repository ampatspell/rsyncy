import Ember from 'ember';
import { Model, byId, settings } from './-base';

const {
  inject: { service }
} = Ember;

export default Model.extend({

  name: settings('name'),
  source: settings('source'),
  target: settings('target'),
  watch: settings('watch'),
  groupId: settings('groupId'),

  group: byId('groups', 'groupId'),

  exclude: [
    'node_modules',
    'tmp',
    'dist',
    'electron-out',
    '.git'    
  ],

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
