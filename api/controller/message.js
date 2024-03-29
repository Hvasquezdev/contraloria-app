const { Message } = require('../model/message');

exports.get_all_by_channel = function(req, res) {
  const { channelId, page } = req.params;

  if (!channelId) {
    res.status(400).send({ error: true, message: 'Please provide the channel id' });
  } else {
    Message.getAllByChannel({ channelId, page }, function(err, messageData) {
      if(err) {
        res.send(err);
      } else {
        res.json(messageData);
      }
    });
  }
};

exports.get_media_by_channel_message = function(req, res) {
  const { channelMessageId } = req.params;

  if(!channelMessageId) {
    res.status(400).send({ error: true, message: 'Please provide the channel message id' });
  } else {
    Message.getMediaDataByChannelMessage(channelMessageId, function(err, messageMedia) {
      if(err) {
        res.send(err);
      } else {
        res.json(messageMedia);
      }
    });
  }
}

exports.get_media_by_direct_message = function(req, res) {
  const { messageContentId } = req.params;

  if(!messageContentId) {
    res.status(400).send({ error: true, message: 'Please provide the message content id' });
  } else {
    Message.getDirectMessageMedia(messageContentId, function(err, messageMedia) {
      if(err) {
        res.send(err);
      } else {
        res.json(messageMedia);
      }
    });
  }
}

exports.get_direct_message_data = function(req, res) {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({ error: true, message: 'Please provide the inbox id' });
  } else {
    Message.getDirectMessagesData({ id }, function(err, message) {
      if(err) {
        res.send(err);
      } else {
        res.json(message);
      }
    });
  }
};

exports.get_user_messages = function(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send({ error: true, message: 'Please provide the user id' });
  } else {
    Message.getUserDirectMessages(userId, function(err, messages) {
      if(err) {
        res.send(err);
      } else {
        console.log(messages)
        res.json(messages);
      }
    });
  }
};

exports.send_message_to_channel = function(req, res, io) {
  const newMessage = req.body;
  console.log('Controller sending message');

  if(!newMessage.userId || !newMessage.destinationId) {
    res.status(400).send({ error: true, message: 'Please provide the complete message data' });
  } else {

    Message.sendMessageToChannel(newMessage, function(err, message) {
      if(err) {
        res.send(err);
      } else {
        const messageToEmit = {
          ...newMessage,
          insertId: message.insertId
        }
        if(!newMessage.hasMedia) {
          io.sockets.emit('sentMessageToChannel', messageToEmit);
        } else {
          io.sockets.emit('sentMessageToChannelWithMedia', messageToEmit);
        }
        res.status(200).send({ error: false, message: 'Message sent correctly', message });
      }
    });
  }
};

exports.send_message_media_to_channel = function(req, res, io) {
  const mediaData = { ...req.file, ...req.body };
  console.log('Controller sending message media');

  if(!mediaData.filename) {
    res.status(400).send({ error: true, message: 'Please provide the file' });
  } else {

    Message.sendMessageMediaToChannel(mediaData, function(err, message) {
      if(err) {
        res.send(err);
      } else {
        io.sockets.emit('sentMessageToChannelMedia', mediaData);
        res.status(200).send({ error: false, message: 'Message media saved correctly', message });
      }
    });
  }
};

exports.send_direct_message_media = function(req, res, io) {
  const mediaData = { ...req.file, ...req.body };
  console.log('Controller sending direct message media');

  if(!mediaData.filename) {
    res.status(400).send({ error: true, message: 'Please provide the file' });
  } else {

    Message.sendDirectMessageMedia(mediaData, function(err, message) {
      if(err) {
        res.send(err);
      } else {
        io.sockets.emit('sentDirectMessageMedia', mediaData);
        res.status(200).send({ error: false, message: 'Direct message media saved correctly', message });
      }
    });
  }
};

exports.send_direct_message = function(req, res, io) {
  const newMessage = req.body;
  console.log('Controller sending direct message');

  if(!newMessage.userId || !newMessage.destinationId) {
    res.status(400).send({ error: true, message: 'Please provide the complete message data' });
  } else {

    Message.sendDirectMessage(newMessage, function(err, message) {
      if(err) {
        res.send(err);
      } else {
        const messageToEmit = {
          ...newMessage,
          insertId: message.insertId
        }
        console.log(messageToEmit)
        if(!newMessage.hasMedia) {
          io.sockets.emit('sentDirectMessage', messageToEmit);
        } else {
          io.sockets.emit('sentDirectMessageWithMedia', messageToEmit);
        }
        res.status(200).send({ error: false, message: 'Message sent correctly', message });
      }
    });
  }
}

exports.start_direct_message = function(req, res, io) {
  const data = {
    author: req.body.author.id,
    destinationId: req.body.destination.id,
    message: req.body.message,
    name: req.body.destination.name,
    lastName: req.body.destination.lastName,
    userName: req.body.destination.userName
  };
  const completeData = req.body;

  console.log('Controller starting direct message', data);

  if(!data.author || !data.destinationId) {
    res.status(400).send({ error: true, message: 'Please provide the author and destination id' });
  } else {

    Message.startDirectMessage(data, function(err, response) {
      if(err) {
        res.send(err);
      } else {
        io.sockets.emit('startedInbox', { ...completeData, id: response.insertId });
        res.status(200).send({ error: false, message: 'Message started correctly', response });
      }
    });
  }
}