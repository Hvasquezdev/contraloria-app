module.exports = function(app) {
  const users = require('../controller');
  const channel = require('../controller/channel');

  app.route('/users')
    .get(users.get_all_users)
    .post(users.new_user);

  app.route('/user/authenticate')
    .post(users.auth_user);

  // Channel Routes
  app.route('/channel')
    .post(channel.new_channel);

  app.route('/channel/:channelId')
    .get(channel.get_channel_data);
  
  app.route('/channels/user/:memberId')
    .get(channel.get_user_channels);
}