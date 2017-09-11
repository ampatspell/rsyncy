import Edit from './-edit';

export default Edit.extend({

  groups: null,

  modelName: 'project',
  changesetName: 'project-changeset',
  changesetDefaults: { name: 'New Project' },

  load() {
    return this.get('store').findAll('group').then(groups => this.setProperties({ groups }));
  },

  willUpdate() {
    return this.get('groups').map(group => group.save());
  }

});
