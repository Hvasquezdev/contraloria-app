module.exports = function(app, io, upload, dirPath) {
  const users = require('../controller');
  const channel = require('../controller/channel');
  const message = require('../controller/message');

  app.route('/users')
    .get(users.get_all_users)
    .post(users.new_user);

  app.route('/user/:userName')
    .get(users.get_by_username)
    .put(users.edit_user);

  app.route('/user/authenticate')
    .post(users.auth_user);

  app.route('/user/rol/status')
    .put(users.change_status);

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

  app.route('/channel/leave')
    .delete(function(req, res) {
      return channel.leave_channel(req, res, io);
    });

  app.route('/channel/delete')
    .delete(function(req, res) {
      return channel.delete_channel(req, res, io);
    });

  // Messages Routes
  app.route('/messages/:channelId/:page')
    .get(message.get_all_by_channel);

  app.route('/inbox')
    .post(function(req, res) {
      return message.send_direct_message(req, res, io);
    });

  app.route('/inbox/new')
    .post(function(req, res) {
      return message.start_direct_message(req, res, io);
    });

  app.route('/inbox/:userId')
    .get(message.get_user_messages);

  app.route('/inbox/content/:id')
    .get(message.get_direct_message_data);

  app.route('/inbox/media')
    .post(upload.single('file'), function(req, res) {
      console.log(`Storage location is ${req.file.path}`);
      return message.send_direct_message_media(req, res, io);
    });

  app.route('/inbox/files/media/:messageContentId')
    .get(message.get_media_by_direct_message);

  app.route('/message')
    .post(function(req, res) {
      return message.send_message_to_channel(req, res, io);
    });

  app.route('/message/media')
    .post(upload.single('file'), function(req, res) {
      console.log(`Storage location is ${req.file.path}`);
      return message.send_message_media_to_channel(req, res, io);
    });

  app.route('/message/media/:channelMessageId')
    .get(message.get_media_by_channel_message);

  app.route('/downloadFile/:filename')
    .get(function(req, res) {
      const { filename } = req.params;
      const fullPath = `${dirPath}/api/uploaded/${filename}`;
      res.download(fullPath, filename);
    });
}