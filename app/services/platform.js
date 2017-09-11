import Ember from 'ember';
import environment from 'rsyncy-app/config/environment';

const {
  rsyncy: { electron }
} = environment;

const name = electron ? 'electron' : 'browser';

export default Ember.Service.extend({

  name

});
