import Ember from 'ember';
import { array } from 'rsyncy-app/util/computed';
import makeId from 'rsyncy-app/util/make-id';

const {
  computed,
  assign,
  A,
  RSVP: { resolve, reject },
  getOwner
} = Ember;

const localStorage = window.localStorage;
const prefix = 'rsyncy';

export default Ember.Object.extend({

  settings: null,
  identifier: null,

  modelName: null,
  models: null,

  defaults: array(),

  localStorageKey: computed('identifier', function() {
    let identifier = this.get('identifier');
    return `${prefix}-${identifier}`;
  }),

  _load() {
    let key = this.get('localStorageKey');
    return resolve().then(() => {
      let string = localStorage.getItem(key);
      if(!string) {
        return this.get('defaults');
      }
      return JSON.parse(string);
    });
  },

  _save(json) {
    let key = this.get('localStorageKey');
    return resolve().then(() => {
      let string = JSON.stringify(json);
      localStorage.setItem(key, string);
    });
  },

  _createModel() {
    let modelName = this.get('modelName');
    let store = this;
    return getOwner(this).factoryFor(`model:settings/${modelName}`).create({ store });
  },

  __deserialize(json) {
    let model = this._createModel();
    model.deserialize(json);
    return model;
  },

  _deserialize(json) {
    return A(json).map(props => this.__deserialize(props));
  },

  __serialize(model) {
    return model.serialize();
  },

  _serialize() {
    return resolve(this.get('models').map(model => this.__serialize(model)));
  },

  load() {
    return this._load()
      .then(json => this._deserialize(json))
      .then(models => this.set('models', A(models)))
      .then(() => this);
  },

  model(props) {
    let id = makeId();
    let model = this._createModel();
    model.setProperties(assign({ id }, props));
    this.get('models').pushObject(model);
    return model;
  },

  _saveModel() {
    return this.get('settings').save();
  },

  _deleteModel(model) {
    this.get('models').removeObject(model);
    model.destroy();
    return this.get('settings').save();
  },

  save() {
    return this._serialize().then(json => this._save(json));
  },

  find(id) {
    return resolve().then(() => {
      let model = this.get('models').findBy('id', id);
      if(!model) {
        let modelName = this.get('modelName');
        let err = new Ember.Error(`${modelName}:${id} not found`);
        return reject(err);
      }
      return model;
    });
  }

});
