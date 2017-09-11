import Ember from 'ember';

/* global requireNode */

const {
  Evented,
  computed,
  computed: { reads },
  RSVP: { Promise, resolve }
} = Ember;

export default Ember.Object.extend(Evented, {

  syncer: null,
  project: reads('syncer.project'),

  __watch: null,
  __since: null,

  _subscription: computed(function() {
    return `syncy-${~~(Math.random() * 1000)}`;
  }).readOnly(),

  _client: computed(function() {
    let watchman = requireNode('fb-watchman');
    return new watchman.Client();
  }).readOnly(),

  _capabilities() {
    return new Promise((resolve, reject) => {
      let client = this.get('_client');
      client.capabilityCheck({ optional: [], required: [ 'relative_root' ] }, (error, resp) => {
          if(error) {
            client.end();
            return reject(error);
          }
          resolve(resp);
        });
    });
  },

  _watch() {
    return new Promise((resolve, reject) => {
      let client = this.get('_client');
      let source = this.get('project.source');
      client.command([ 'watch-project', source ], (error, resp) => {
        if(error) {
          return reject(error);
        }

        if('warning' in resp) {
          this.trigger('warning', resp.warning);
        }

        this.set('__watch', resp.watch);

        resolve(resp);
      });
    });
  },

  _clock() {
    return new Promise((resolve, reject) => {
      let watch = this.get('__watch');
      let client = this.get('_client');
      client.command([ 'clock', watch ], (error, resp) => {
        if(error) {
          return reject(error);
        }
        this.set('__since', resp.clock);
        resolve(resp);
      });
    });
  },

  _subscribe() {
    let watch = this.get('__watch');
    let since = this.get('__since');
    let excludes = this.get('project.excludes');
    let subscription = this.get('_subscription')

    let expression = [ 'allof', [ 'type', 'f' ] ];
    for(let path of excludes) {
      expression.push([
        'not', [
          'anyof',
          [ 'match', path, 'basename' ],
          [ 'match', `${path}/**/*`, 'wholename', { includedotfiles: true } ],
          [ 'match', `*/${path}/**/*`, 'wholename', { includedotfiles: true } ],
        ]
      ]);
    }

    let opts = {
      expression,
      fields: [ 'name', 'exists' ],
      since
    };

    return new Promise((resolve, reject) => {
      let client = this.get('_client');
      client.command([ 'subscribe', watch, subscription, opts ], (error, resp) => {
        if(error) {
          return reject(error);
        }
        client.on('subscription', info => this._onChange(info));
        resolve(resp);
      });
    });
  },

  _unsubscribe() {
    let watch = this.get('__watch');
    let subscription = this.get('_subscription')

    return new Promise((resolve, reject) => {
      let client = this.get('_client');
      client.command([ 'unsubscribe', watch, subscription ], (error, resp) => {
        if(error) {
          return reject(error);
        }
        resolve(resp);
      });
    });
  },

  _endClient() {
    let client = this.get('_client');
    client.removeAllListeners('subscription');
    client.end();
  },

  _onChange(info) {
    if(info.subscription !== this.get('_subscription')) {
      return;
    }

    let path = requireNode('path');
    let source = this.get('project.source');
    let base = `${path.basename(source)}/`;

    let files = info.files.map(file => {
      let name = file.name;
      if(name.startsWith(base)) {
        file.name = name.substring(base.length);
      }
      return file;
    });

    this.trigger('change', files);
  },

  start() {
    window.w = this;
    return resolve()
      .then(() => this._capabilities())
      .then(() => this._watch())
      .then(() => this._clock())
      .then(() => this._subscribe());
  },

  stop() {
    let client = this.cacheFor('_client');
    if(!client) {
      return;
    }
    return resolve()
      .then(() => this._unsubscribe())
      .then(() => this._endClient());
  }

});
