import Ember from 'ember';

const {
  computed,
  computed: { reads, alias }
} = Ember;

export const byId = (name, key) => {
  let idKey = `settings.${key}`;
  let modelsKey = `store.store.${name}.models`;
  return computed(idKey, `${modelsKey}.@each.id`, function() {
    let id = this.get(idKey);
    if(!id) {
      return;
    }
    let models = this.get(modelsKey);
    if(!models) {
      return;
    }
    return models.findBy('id', id);
  }).readOnly();
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
    return this.get('settings').save();
  }

});

export default Model;
