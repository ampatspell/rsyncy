import Ember from 'ember';
import props from 'rsyncy-app/util/lookup-computed-properties';

const {
  RSVP: { all },
  computed,
  getOwner
} = Ember;

const store = () => {
  return computed({
    get(identifier) {
      let settings = this;
      return getOwner(this).factoryFor(`settings-store:${identifier}`).create({ identifier, settings });
    }
  }).meta({ _store: true });
}

export default Ember.Service.extend({

  projects: store(),
  groups: store(),

  stores: computed(function() {
    return props(this, (name, meta) => meta._store === true);
  }),

  load() {
    return all(this.get('stores').map(store => store.load()));
  },

  save() {
    return all(this.get('stores').map(store => store.save()));
  }

});
