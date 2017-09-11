export default {
  name: 'rsyncy-app:injections',
  initialize(app) {
    app.inject('route', 'store', 'service:store');
    app.inject('view-model', 'store', 'service:store');
  }
};
