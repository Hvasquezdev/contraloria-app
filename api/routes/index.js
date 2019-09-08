module.exports = function(app, io) {
  const users = require('../controller');
  const channel = require('../controller/channel');
  const message = require('../controller/message');

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
    .post(function(req, res) {
      return channel.new_channel_member(req, res, io);
    });

  app.route('/channel/:channelId')
    .get(channel.get_channel_data);

  app.route('/channel/:channelId/members')
    .get(channel.get_channel_members);

  app.route('/channel/:memberId/member')
    .get(channel.get_channel_members_data);
  
  app.route('/channels/user/:memberId')
    .get(channel.get_user_channels);

  app.route('/channel/:channelName/search')
    .get(channel.get_by_name);

  // Messages Routes
  app.route('/messages/:channelId')
    .get(message.get_all_by_channel);

  app.route('/inbox')
    .post(function(req, res) {
      return message.send_direct_message(req, res, io);
    });

  app.route('/inbox/:userId')
    .get(message.get_user_messages);

  app.route('/inbox/:userId/:destinationId')
    .get(message.get_direct_message_data);

  app.route('/message')
    .post(function(req, res) {
      return message.send_message_to_channel(req, res, io);
    });
}