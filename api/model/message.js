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

Message.sendMessageToChannel = function(message, result) {
  const messageData = {
    userId: message.userId,
    destinationId: message.destinationId,
    hasMedia: message.hasMedia,
    hasText: message.hasText
  };

  mysqlConnection.query("INSERT INTO channel_message set ?", messageData, function(err, res) {
    if(err) {
      result(err, null);
    } else {
      const messageTextData = {
        content: message.text.content || null,
        channel_message_id: res.insertId
      };
    
      const messageMediaData = {
        content: message.media.content || null,
        type: message.media.type || null,
        channel_message_id: res.insertId
      };

      if(messageData.hasText && messageData.hasMedia) {

        mysqlConnection.query("INSERT INTO channel_message_text set ?", messageTextData, function(err, res) {
          if(err) {
            result(err, null);
          } else {
            mysqlConnection.query("INSERT INTO channel_message_media set ?", messageMediaData, function(err, res) {
              if(err) {
                result(err, null);
              } else {
                result(null, res);
              }
            });
          }
        });

      } else if(messageData.hasText && !messageData.hasMedia) {

        mysqlConnection.query("INSERT INTO channel_message_text set ?", messageTextData, function(err, res) {
          if(err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });

      } else {

        mysqlConnection.query("INSERT INTO channel_message_media set ?", messageMediaData, function(err, res) {
          if(err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });

      }
    }
  });
}

module.exports = {
  Message
};