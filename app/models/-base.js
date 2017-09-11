import Ember from 'ember';

const {
  computed,
  computed: { reads, alias },
  RSVP: { resolve }
} = Ember;

export const byId = (name, key) => {
  let idKey = `settings.${key}`;
  let modelsKey = `store.store.${name}.models`;
  return computed(idKey, `${modelsKey}.@each.id`, {
    get() {
      let id = this.get(idKey);
      if(!id) {
        return;
      }
      let models = this.get(modelsKey);
      if(!models) {
        return;
      }
      return models.findBy('id', id);
    },
    set(_, value) {
      let id = null;
      if(value) {
        id = value.get('id');
      }
      this.set(key, id);
      return value;
    }
  });
}

export const inverse = (name, key) => {
  let modelsKey = `store.store.${name}.models`;
  return computed(`id`, `${modelsKey}.@each.${key}`, function() {
    let id = this.get('id');
    let models = this.get(modelsKey);
    return models.filterBy(key, id);
  }).readOnly();
}

export const settings = key => {
  return alias(`settings.${key}`);
}

export const Model = Ember.Object.extend({

  store: null,
  settings: null,

  id: reads('settings.id').readOnly(),

  save() {
    return this.get('store')._saveModel(this);
  },

  delete() {
    return this.get('store')._deleteModel(this);
  },

  didCreate() {},
  didUpdate() {},
  willDelete() {},

  _didUpdate() {
    if(this.get('isNew')) {
      return resolve(this.didCreate()).then(() => {
        this.set('isNew', false);
      });
    } else {
      return resolve(this.didUpdate());
    }
  },

});

export default Model;
