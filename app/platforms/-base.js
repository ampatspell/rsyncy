import Ember from 'ember';
import { array } from 'rsyncy-app/util/computed';

const {
  getOwner
} = Ember;

export default Ember.Object.extend({

  name: null,

  syncers: array(),

  _createSyncer(project) {
    console.log('create', project+'');
    let name = this.get('name');
    let platform = this;
    return getOwner(this).factoryFor(`platform:syncer/${name}`).create({ platform, project });
  },

  syncer(project) {
    let syncers = this.get('syncers');
    return syncers.findBy('project', project);
  },

  didAddProject(project) {
    let syncers = this.get('syncers');
    let syncer = this._createSyncer(project);
    syncers.pushObject(syncer);
    return syncer.start();
  },

  didUpdateProject(project) {
    let syncer = this.syncer(project);
    return syncer.restart();
  },

  didRemoveProject(project) {
    let syncers = this.get('syncers');
    let syncer = this.syncer(project);
    syncers.removeObject(syncer);
    return syncer.stop();
  }

});
