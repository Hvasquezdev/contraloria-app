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