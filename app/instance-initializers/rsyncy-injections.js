export default {
  name: 'rsyncy:injections',
  initialize(app) {
    app.inject('route',      'store', 'service:store');
    app.inject('view-model', 'store', 'service:store');
    app.inject('controller', 'store', 'service:store');
    app.inject('component',  'store', 'service:store');
  }
};
