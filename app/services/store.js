import Ember from 'ember';
import props from 'rsyncy/util/lookup-computed-properties';

const {
  inject: { service },
  RSVP: { resolve, all },
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

  _load() {
    return all(this.get('stores').map(store => store.load()));
  },

  load() {
    return resolve()
      .then(() => this.get('settings').load())
      .then(() => this._load())
      .then(() => this);
  },

  save() {
    return resolve()
      .then(() => this.get('settings').save())
      .then(() => this);
  },

  find(name, id) {
    return this.get(name).find(id);
  },

  model(name) {
    return this.get(name).model();
  }

});
