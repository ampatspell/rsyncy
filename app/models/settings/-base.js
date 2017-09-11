import Ember from 'ember';

export default Ember.Object.extend({

  id: null,

  save() {
    return this.get('store')._saveModel(this);
  },

  serialize() {
    return this.getProperties('id');
  },

  deserialize(json) {
    let { id } = json;
    this.setProperties({ id });
  }

});
