export default {
  name: 'rsyncy-app:injections',
  initialize(app) {
    app.inject('view-model', 'store', 'service:store');
  }
};
