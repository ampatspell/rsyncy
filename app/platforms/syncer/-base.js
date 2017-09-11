import Ember from 'ember';
import { array } from 'rsyncy-app/util/computed';

const {
  RSVP: { resolve, reject },
  Logger: { info }
} = Ember;

export const task = fn => {
  return function(...args) {
    return this.task(() => fn.call(this, ...args));
  }
}

export const error = fn => {
  return function(...args) {
    return resolve(fn.call(this, ...args)).catch(err => this._onError(err));
  }
}

export default Ember.Object.extend({

  platform: null,
  project: null,

  isSyncing: false,
  isWatching: false,
  isStopped: false,
  error: null,

  queue: array(),
  promise: resolve(),

  task(fn) {
    let queue = this.get('queue');
    queue.addObject(fn);
    let next = () => {
      if(this.get('isStopped')) {
        return;
      }
      return queue.shiftObject()();
    };
    return this.set('promise', this.get('promise').then(next, next));
  },

  _onError(err) {
    info(this+'', err);
    this.set('error', err);
    return reject(err);
  },

  _syncAllTask: task(function() {
    return resolve()
      .then(() => this.set('isSyncing', true))
      .then(() => this.__syncAll())
      .finally(() => this.set('isSyncing', false));
  }),

  _syncChangesTask: task(function(changes) {
    return resolve()
      .then(() => this.set('isSyncing', true))
      .then(() => this.__syncChanges(changes))
      .finally(() => this.set('isSyncing', false));
  }),

  _watchTask: task(function() {
    let watch = this.get('project.watch');
    if(!watch) {
      return;
    }
    return resolve()
      .then(() => this.__watch())
      .then(() => this.set('isWatching', true));
  }),

  _unwatchTask: task(function() {
    if(!this.get('isWatching')) {
      return;
    }
    return resolve()
      .then(() => this.__unwatch())
      .then(() => this.set('isWatching', false));
  }),

  _onChange(changes) {
    return this._syncChangesTask(changes);
  },

  // public

  start: error(function() {
    return resolve()
      .then(() => this._syncAllTask())
      .then(() => this._watchTask())
      .then(() => this);
  }),

  sync: error(function() {
    return resolve()
      .then(() => this._syncAllTask())
      .then(() => this);
  }),

  restart: error(function() {
    return resolve()
      .then(() => this._unwatchTask())
      .then(() => this._syncAllTask())
      .then(() => this._watchTask())
      .then(() => this);
  }),

  stop: error(function() {
    return resolve()
      .then(() => this._unwatchTask())
      .then(() => this.destroy())
      .then(() => undefined);
  })

});
