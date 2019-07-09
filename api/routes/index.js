module.exports = function(app) {
  const users = require('../controller');

  app.route('/users')
    .get(users.get_all_users)
    .post(users.new_user);

  app.route('/user/authenticate')
    .post(users.auth_user);
}