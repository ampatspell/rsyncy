import Ember from 'ember';
import environment from 'rsyncy/config/environment';

const {
  rsyncy: { electron },
} = environment;

const {
  getOwner,
  computed
} = Ember;

const name = electron ? 'electron' : 'browser';

const forward = name => {
  return function(...args) {
    let content = this.get('content');
    return content[name].call(content, ...args);
  }
};

const Service = Ember.ObjectProxy.extend({

  content: computed(function() {
    return getOwner(this).factoryFor(`platform:${name}`).create({ name });
  }).readOnly(),

  syncer:           forward('syncer'),
  didAddProject:    forward('didAddProject'),
  didUpdateProject: forward('didUpdateProject'),
  didRemoveProject: forward('didRemoveProject'),

});

Service.reopenClass({
  isServiceFactory: true
});

export default Service;
