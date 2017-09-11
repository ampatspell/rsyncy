import Ember from 'ember';

const {
  getOwner,
  assert,
  String: { dasherize },
} = Ember;

export default Ember.Service.extend({

  create(name, props) {
    let normalizedName = dasherize(name);
    let ViewModel = getOwner(this).factoryFor(`view-model:${normalizedName}`);
    assert(`view model ${normalizedName} not registered`, !!ViewModel);
    return ViewModel.create(props);
  },

  load() {
    let viewModel = this.create(...arguments);
    if(typeof viewModel.load === 'function') {
      return viewModel.load().then(() => viewModel);
    }
    return viewModel;
  }

});
