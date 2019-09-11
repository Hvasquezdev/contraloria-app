const { Message } = require('../model/message');

exports.get_all_by_channel = function(req, res) {
  const { channelId } = req.params;

  if (!channelId) {
    res.status(400).send({ error: true, message: 'Please provide the channel id' });
  } else {
    Message.getAllByChannel(channelId, function(err, messageData) {
      if(err) {
        res.send(err);
      } else {
        res.json(messageData);
      }
    });
  }
};


exports.get_direct_message_data = function(req, res) {
  const { userId, destinationId } = req.params;

  if (!userId || !destinationId) {
    res.status(400).send({ error: true, message: 'Please provide the user id and destination id' });
  } else {
    Message.getDirectMessagesData({ userId, destinationId }, function(err, message) {
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
        if(!newMessage.hasMedia) {
          io.sockets.emit('sentMessageToChannel', newMessage);
        } else {
          io.sockets.emit('sentMessageToChannelWithMedia', newMessage);
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
        io.sockets.emit('sentDirectMessage', newMessage);
        res.status(200).send({ error: false, message: 'Message sent correctly', message });
      }
    });
  }
}