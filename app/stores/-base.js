import Ember from 'ember';

const {
  getOwner,
  assign,
  RSVP: { resolve, reject }
} = Ember;

export default Ember.Object.extend({

  identifier: null,
  settings: null,
  store: null,

  modelName: null,

  models: null,

  _createModel(props) {
    let modelName = this.get('modelName');
    let store = this;
    return getOwner(this).factoryFor(`model:${modelName}`).create(assign({ store }, props));
  },

  load() {
    let models = this.get('settings.models').map(settings => {
      let model = this._createModel();
      model.setProperties({ settings });
      return model;
    });
    this.set('models', models);
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
    })
  },

  model() {
    let settings = this.get('settings').model();
    let model = this._createModel({ settings });
    this.get('models').pushObject(model);
    return model;
  },

  _saveModel(model) {
    return this.get('settings')._saveModel(model);
  },

  __deleteModel(model) {
    this.get('models').removeObject(model);
    model.destroy();
  },

  _deleteModel(model) {
    let settings = model.get('settings');
    return resolve()
      .then(() => this.__deleteModel(model))
      .then(() => this.get('settings')._deleteModel(settings))
      .then(() => undefined);
  }

});
