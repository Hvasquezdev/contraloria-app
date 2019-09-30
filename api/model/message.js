const mysqlConnection = require('../database');

const Message = function(message) {
  this.userId = message.userId;
  this.destinationId = message.destinationId;
  this.hasMedia = message.hasMedia;
  this.hasText = message.hasText;
};

Message.getAllByChannel = function(data, result) {
  const { channelId, page } = data;
  console.log(page)
  const query = `SELECT name, lastName, userName, hasText, hasMedia, content, date_message, T1.id FROM CHANNEL_message T1 INNER JOIN channel_message_text T2 ON T1.id = T2.channel_message_id INNER JOIN users T3 ON T3.id = T1.userId WHERE T1.destinationId = ? ORDER BY date_message DESC LIMIT ${page},10`;
  mysqlConnection.query(query, [channelId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Message.getMediaDataByChannelMessage = function(channelMessageId, result) {
  mysqlConnection.query("SELECT filename, originalname, path, size, mimetype FROM channel_message_media WHERE channel_message_id = ?", [channelMessageId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

Message.getDirectMessageMedia = function(messageContentId, result) {
  mysqlConnection.query("SELECT filename, originalname, path, size, mimetype FROM message_media WHERE messageContentId = ?", [messageContentId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

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
  mysqlConnection.query("SELECT T2.id, name, lastName, userName, content, date_message, hasMedia, hasText FROM message T1 INNER JOIN message_content T2 ON T2.messageId = T1.id INNER JOIN message_text T3 ON T3.messageContentId = T2.id INNER JOIN users T4 ON T4.id = T2.authorId WHERE T1.userId = ? OR T1.destinationId = ?", [message.userId, message.destinationId], function(err, res) {
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
      const mainResponse = res;

      mysqlConnection.query("INSERT INTO channel_message_text set ?", messageTextData, function(err, res) {
        if(err) {
          result(err, null);
        } else {
          result(null, mainResponse);
        }
      });
    }
  });
};

Message.sendMessageMediaToChannel = function(message, result) {
  const mediaData = {
    mimetype: message.mimetype, 
    filename: message.filename, 
    path: message.path, 
    size: message.size, 
    channel_message_id: parseInt(message.channel_message_id),
    originalname: message.originalname
  }
  mysqlConnection.query("INSERT INTO channel_message_media set ?", mediaData, function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

Message.sendDirectMessageMedia = function(message, result) {
  const mediaData = {
    mimetype: message.mimetype, 
    filename: message.filename, 
    path: message.path, 
    size: message.size, 
    messageContentId: parseInt(message.messageContentId),
    originalname: message.originalname
  }
  mysqlConnection.query("INSERT INTO message_media set ?", mediaData, function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

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
      const mainResponse = res;
    
      mysqlConnection.query("INSERT INTO message_text set ?", messageTextData, function(err, res) {
        if(err) {
          result(err, null);
        } else {
          result(null, mainResponse);
        }
      });
    }
  });
};

module.exports = {
  Message
};