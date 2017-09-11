import Ember from 'ember';
import props from 'rsyncy-app/util/lookup-computed-properties';

const {
  inject: { service },
  RSVP: { all },
  computed,
  getOwner
} = Ember;

const store = () => {
  return computed({
    get(identifier) {
      let store = this;
      let settings = this.get(`settings.${identifier}`);
      return getOwner(this).factoryFor(`store:${identifier}`).create({ identifier, settings, store });
    }
  }).meta({ _store: true });
}

export default Ember.Service.extend({

  settings: service(),

  groups: store(),
  projects: store(),

  stores: computed(function() {
    return props(this, (name, meta) => meta._store === true);
  }),

  load() {
    return this.get('settings').load().then(() => all(this.get('stores').map(store => store.load())));
  }

});
