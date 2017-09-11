import Ember from 'ember';

const {
  getOwner,
  RSVP: { resolve, reject }
} = Ember;

export default Ember.Object.extend({

  identifier: null,
  settings: null,
  store: null,

  modelName: null,

  models: null,

  _createModel() {
    let modelName = this.get('modelName');
    let store = this;
    return getOwner(this).factoryFor(`model:${modelName}`).create({ store });
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
  }

});
