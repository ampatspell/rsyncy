import Ember from 'ember';
import Platform from './-base';

const {
  computed
} = Ember;

export default Platform.extend({

  path: computed(function() {
    return [
      '~/.bin',
      '~/.npm',
      '/usr/local/bin',
      '/usr/bin',
    ];
  }).readOnly()

});
