import env from '../config/environment';

const {
  environment
} = env;

const isDevelopment = environment === 'development';

export default {
  name: 'rsyncy-app:development',
  initialize(app) {
    if(!isDevelopment) {
      return;
    }

    window.store = app.lookup('service:store');
  }
};
