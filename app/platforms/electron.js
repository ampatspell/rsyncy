import Ember from 'ember';
import Platform from './-base';

const {
  on
} = Ember;

let Rsyncy;

export default Platform.extend({

  _requireNode: on('init', function() {
    Rsyncy = requireNode('rsyncy');
    
    // let rsyncy = new Rsyncy({
    //   source: '/Users/ampatspell/src/rsyncy-app',
    //   target: 'ampatspell@server:/home/ampatspell/test/rsyncy-app',
    //   exclude: [
    //     'node_modules',
    //     'electron-out',
    //     'tmp',
    //     'dist',
    //     '.git',
    //     '.gitignore'
    //   ],
    //   config: {
    //     once: true
    //   }
    // });
    // rsyncy.start();
  })

});
