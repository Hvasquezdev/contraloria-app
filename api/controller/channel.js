const { Channel } = require('../model/channel');

exports.new_channel = function(req, res) {
  const newChannel = new Channel(req.body);
  console.log('Controller creating channel');

  if(!newChannel.name || !newChannel.type) {
    res.status(400).send({ error: true, message: 'Please provide the complete channel data' });
  } else {

    // Checking if the channel name isn't taken
    Channel.checkChannelName(newChannel.name, function(err, channel) {
      if(err) {
        res.send(err);
      } else {
        if(channel.length >= 1) return res.status(400).send({ error: true, message: 'Channel name is already registered' });
        
        // If channel name is not taken then save the channel
        Channel.newChannel(newChannel, function(err, channel) {
          if(err) {
            res.send(err);
          } else {
            res.status(200).send({ error: false, message: 'Channel registered correctly', channel });
          }
        });
      }
    });

  }
};