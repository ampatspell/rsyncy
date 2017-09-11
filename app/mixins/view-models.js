import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Mixin.create({

  viewModels: service(),

  createViewModel() {
    return this.get('viewModels').create(...arguments);
  },

  loadViewModel() {
    return this.get('viewModels').load(...arguments);
  }

});
