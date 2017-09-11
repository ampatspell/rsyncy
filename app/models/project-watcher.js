import Ember from 'ember';

const {
  on,
  computed
} = Ember;

export default Ember.Object.extend({

  watchers: null,
  model: null,

  isSyncing: false,

  sync() {
    Ember.Logger.info('sync project', this+'');
    this.set('isSyncing', true);
    Ember.run.later(() => this.set('isSyncing', false), 2000);
  },

  prepare: on('init', function() {
    this.startListeningModel();
  }),

  didUpdateModel(model) {
    Ember.Logger.info('didUpdate', model+'');
  },

  didDeleteModel(model) {
    this.get('watchers')._destroyWatcher(this);
  },

  events: computed(function() {
    return [
      [ 'didUpdate', this.didUpdateModel ],
      [ 'didDelete', this.didDeleteModel ]
    ];
  }).readOnly(),

  startListeningModel() {
    let { model, events } = this.getProperties('model', 'events');
    events.forEach(( [ name, fn ]) => model.on(name, this, fn));
  },

  stopListeningModel() {
    let { model, events } = this.getProperties('model', 'events');
    events.forEach(( [ name, fn ]) => model.off(name, this, fn));
  },

  willDestroy() {
    this._super(...arguments);
    this.stopListeningModel();
    console.log('willDestroy', this+'');
  }

});
