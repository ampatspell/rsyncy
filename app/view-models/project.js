import Ember from 'ember';
import Edit from './-edit';

const {
  computed: { reads }
} = Ember;

export default Edit.extend({

  groups: reads('store.groups.models'),

  storeName: 'projects',
  changesetName: 'project-changeset',
  changesetDefaults: {
    name: 'New Project',
    exclude: [
      '.git',
      '.hg',
      'node_modules',
      'bower_components',
      'tmp',
      'dist'
    ].join(', ')
  }

});
