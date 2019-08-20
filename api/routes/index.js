module.exports = function(app) {
  const users = require('../controller');
  const channel = require('../controller/channel');

  app.route('/users')
    .get(users.get_all_users)
    .post(users.new_user);

  app.route('/user/:userName')
    .get(users.get_by_username);

  app.route('/user/authenticate')
    .post(users.auth_user);

  // Channel Routes
  app.route('/channel')
    .post(channel.new_channel);

  app.route('/channel/member/new')
    .post(channel.new_channel_member);

  app.route('/channel/:channelId')
    .get(channel.get_channel_data);

  app.route('/channel/:channelId/members')
    .get(channel.get_channel_members);

  app.route('/channel/:memberId/member')
    .get(channel.get_channel_members_data);
  
  app.route('/channels/user/:memberId')
    .get(channel.get_user_channels);
}