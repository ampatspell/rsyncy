import ViewModel from './-base';
import Ember from 'ember';

const {
  RSVP: { resolve },
  computed
} = Ember;

export default ViewModel.extend({

  target: null,
  changesetName: null,
  changesetDefaults: null,

  isNew: computed('target.isNew', function() {
    let model = this.get('target');
    if(!model) {
      return true;
    }
    return model.get('isNew');
  }).readOnly(),

  changeset: computed(function() {
    let { changesetName, changesetDefaults, target } = this.getProperties('changesetName', 'changesetDefaults', 'target');
    return this.createViewModel(changesetName, changesetDefaults).build(target);
  }).readOnly(),

  load() {
    return resolve();
  },

  willUpdate() {
  },

  update(props) {
    let model = this.get('target');
    if(!model) {
      let modelName = this.get('modelName');
      model = this.get('store').createRecord(modelName);
      this.set('target', model);
    }

    model.setProperties(props);

    return resolve(this.willUpdate(model)).then(() => model.save()).then(() => model);
  },

  save() {
    let changeset = this.get('changeset');
    return changeset.serialize().then(props => this.update(props));
  },

  delete() {
    let model = this.get('target');
    if(!model) {
      return resolve();
    }
    return model.destroyRecord();
  }

});
