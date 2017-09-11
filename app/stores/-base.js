import Ember from 'ember';

const {
  getOwner
} = Ember;

export default Ember.Object.extend({

  identifier: null,
  settings: null,
  store: null,

  modelName: null,

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
  }

});
