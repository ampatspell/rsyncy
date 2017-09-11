import Ember from 'ember';
import { Model, byId, settings } from './-base';

export default Model.extend({

  name:    settings('name'),
  local:   settings('local'),
  remote:  settings('remote'),
  watch:   settings('watch'),
  groupId: settings('groupId'),

  group:   byId('groups', 'groupId'),

  isSyncing: false,

  sync() {
    this.set('isSyncing', true);
    Ember.run.later(() => this.set('isSyncing', false), 3000);
  }

});
