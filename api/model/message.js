const mysqlConnection = require('../database');

const Message = function(message) {
  this.userId = message.userId;
  this.destinationId = message.destinationId;
  this.hasMedia = message.hasMedia;
  this.hasText = message.hasText;
};

Message.getAllByChannel = function(channelId, result) {
  mysqlConnection.query("SELECT * FROM channel_message WHERE destinationId = ?", [channelId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Message.getMessageTextByChannel = function(messageId, result) {
  mysqlConnection.query("SELECT * FROM channel_message_text WHERE channel_message_id = ?", [messageId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = {
  Message
};