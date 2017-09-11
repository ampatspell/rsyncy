import Edit from './-edit';

export default Edit.extend({

  modelName: 'group',
  changesetName: 'group-changeset',
  changesetDefaults: { name: 'New Group' },

});
