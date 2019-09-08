const mysqlConnection = require('../database');

const Message = function(message) {
  this.userId = message.userId;
  this.destinationId = message.destinationId;
  this.hasMedia = message.hasMedia;
  this.hasText = message.hasText;
};

Message.getAllByChannel = function(channelId, result) {
  mysqlConnection.query("SELECT name, lastName, userName, content, date_message FROM CHANNEL_message T1 INNER JOIN channel_message_text T2 ON T1.id = T2.channel_message_id INNER JOIN users T3 ON T3.id = T1.userId WHERE T1.destinationId = ?", [channelId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Message.getUserDirectMessages = function(userId, result) {
  mysqlConnection.query("SELECT T1.id, name, lastName, userId, destinationId FROM message T1 INNER JOIN users T2 ON T2.id = T1.destinationId WHERE T1.userId = ? OR T1.destinationId = ?", [userId, userId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Message.getDirectMessagesData = function(message, result) {
  mysqlConnection.query("SELECT name, lastName, userName, content, date_message FROM message T1 INNER JOIN message_content T2 ON T2.messageId = T1.id INNER JOIN message_text T3 ON T3.messageContentId = T2.id INNER JOIN users T4 ON T4.id = T2.authorId WHERE T1.userId = ? OR T1.destinationId = ?", [message.userId, message.destinationId], function(err, res) {
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
};

Message.sendDirectMessage = function(message, result) {
  const messageData = {
    authorId: message.userId,
    messageId: message.destinationId,
    hasMedia: message.hasMedia,
    hasText: message.hasText
  };

  mysqlConnection.query("INSERT INTO message_content set ?", messageData, function(err, res) {
    if(err) {
      result(err, null);
    } else {
      const messageTextData = {
        content: message.text.content || null,
        messageContentId: res.insertId
      };
    
      // const messageMediaData = {
      //   content: message.media.content || null,
      //   type: message.media.type || null,
      //   channel_message_id: res.insertId
      // };

      if(messageData.hasText && messageData.hasMedia) {

        mysqlConnection.query("INSERT INTO channel_message_text set ?", messageTextData, function(err, res) {
          if(err) {
            result(err, null);
          } else {
            // mysqlConnection.query("INSERT INTO channel_message_media set ?", messageMediaData, function(err, res) {
            //   if(err) {
            //     result(err, null);
            //   } else {
            //     result(null, res);
            //   }
            // });
          }
        });

      } else if(messageData.hasText && !messageData.hasMedia) {

        mysqlConnection.query("INSERT INTO message_text set ?", messageTextData, function(err, res) {
          if(err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });

      } else {

        // mysqlConnection.query("INSERT INTO channel_message_media set ?", messageMediaData, function(err, res) {
        //   if(err) {
        //     result(err, null);
        //   } else {
        //     result(null, res);
        //   }
        // });

      }
    }
  });
};

module.exports = {
  Message
};