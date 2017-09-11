import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    sync() {
      Ember.logger.info('sync');
    }
  }

});
