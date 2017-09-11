import Ember from 'ember';
import environment from 'rsyncy-app/config/environment';

const {
  rsyncy: { electron },
} = environment;

const {
  getOwner,
  computed
} = Ember;

const name = electron ? 'electron' : 'browser';

const Service = Ember.ObjectProxy.extend({

  content: computed(function() {
    return getOwner(this).factoryFor(`platform:${name}`).create({ name });
  }).readOnly(),

  syncer() {
    return this.get('content').syncer(...arguments);
  }

});

Service.reopenClass({
  isServiceFactory: true
});

export default Service;
