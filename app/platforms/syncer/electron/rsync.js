import Ember from 'ember';

const {
  Evented,
  computed: { reads }
} = Ember;

export default Ember.Object.extend(Evented, {

  syncer: null,
  project: reads('syncer.project'),

  _sync(additionalArgs=[]) {
    let start = new Date();
    let { source, target, exclude } = this.get('project').getProperties('source', 'target', 'exclude');
    let excludes = exclude.map(name => `--exclude="${name}"`);

    let args = [
      'rsync',
      '-az',
      '-e "ssh -o \'BatchMode yes\'"',
      '--no-times',
      '--no-perms',
      '--no-owner',
      '--no-group',
      '--delete',
      ...additionalArgs,
      ...excludes,
      `${source}/`,
      `${target}/`
    ];

    return new Promise((resolve, reject) => {
      let spawn = requireNode('child_process').spawn;

      let child = spawn('/bin/sh', [ '-c', args.join(' ') ], {
        detached: false
      });

      let output = '';
      let log = () => data => {
        if(data instanceof Buffer) {
          data = data.toString('utf8');
        }
        output += data;
      };

      let done = code => {
        let end = new Date();
        if(code > 0) {
          reject(new Ember.Error(output));
        } else {
          this.trigger('done', end - start);
          resolve();
        }
      };

      child.stderr.on('data', log());
      child.stdout.on('data', log());

      child.on('exit', done);
      child.on('error', err => reject(err));
    });
  },

  all() {
    return this._sync();
  },

  _changes(files) {
    let includes = [];
    files.map(path => {
      let components = path.split('/');
      for(let i = 0; i < components.length; i++) {
        includes.push(components.slice(0, i + 1).join('/'));
      }
    });
    let include = includes.map(file => `--include="${file}"`);
    let args = [ ...include, '--exclude="*"' ];
    return this._sync(args);
  },

  changes(files) {
    if(files.length > 25) {
      return this.all();
    }
    return this._changes(files);
  },

  stop() {
    console.log(this+' stop');
  }

});
