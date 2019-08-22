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
}

exports.get_channel_message_text = function(req, res) {
  const { messageId } = req.params;

  if (!messageId) {
    res.status(400).send({ error: true, message: 'Please provide the channel id' });
  } else {
    Message.getMessageTextByChannel(messageId, function(err, messageTextContent) {
      if(err) {
        res.send(err);
      } else {
        res.json(messageTextContent);
      }
    });
  }
}

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
        io.sockets.emit('sentMessageToChannel', newMessage);
        res.status(200).send({ error: false, message: 'Message sent correctly', message });
      }
    });
  }
};