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

exports.get_user_channels = function(req, res) {
  const { memberId } = req.params;

  if (!memberId) {
    res.status(400).send({ error: true, message: 'Please provide the memberId' });
  } else {
    Channel.getUserChannels(memberId, function(err, channel) {
      if(err) {
        res.send(err);
      } else {
        res.json(channel);
      }
    });
  }
}

exports.get_channel_data = function(req, res) {
  const { channelId } = req.params;

  if(!channelId) {
    res.status(400).send({ error: true, message: 'Please provide the channelId' });
  } else {
    Channel.getChannelData(channelId, function(err, channel) {
      if(err) {
        res.send(err);
      } else {
        res.json(channel);
      }
    });
  }
}

exports.get_channel_members = function(req, res) {
  const { channelId } = req.params;

  if(!channelId) {
    res.status(400).send({ error: true, message: 'Please provide the channelId' });
  } else {
    Channel.getChannelMembers(channelId, function(err, channelMembers) {
      if(err) {
        res.send(err);
      } else {
        res.json(channelMembers);
      }
    });
  }
}

exports.get_channel_members_data = function(req, res) {
  const { memberId } = req.params;

  if(!memberId) {
    res.status(400).send({ error: true, message: 'Please provide the memberId' });
  } else {
    Channel.getMemberData(memberId, function(err, member) {
      if(err) {
        res.send(err);
      } else {
        res.json(member);
      }
    });
  }
}

exports.new_channel_member = function(req, res, io) {
  const { memberId, channelId } = req.body;
  console.log('Controller adding member to channel');

  if(!memberId || !channelId) {
    res.status(400).send({ error: true, message: 'Please provide the member and channel id' });
  } else {

    // Checking if the user isn't in the channel
    Channel.checkUserInChannel({ memberId, channelId }, function(err, response) {
      if(err) {
        res.send(err);
      } else {
        if(response.length >= 1) return res.status(400).send({ error: true, message: 'The user is already in the channel', status: 400 });
        
        // If user is not in the channel
        Channel.newMember({ memberId, channelId }, function(err, response) {
          if(err) {
            res.send(err);
          } else {
            io.sockets.emit('addedMemberToChannel', req.body);
            io.sockets.emit('reloadSidebar', req.body);
            res.status(200).send({ error: false, message: 'Member added correctly', response, status: 200 });
          }
        });
      }
    });
  }
};

exports.get_by_name = function(req, res) {
  const { channelName } = req.params;

  if (!channelName) {
    res.status(400).send({ error: true, message: 'Please provide the channel name' });
  } else {
    Channel.getByName(channelName, function(err, user) {
      if(err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }
}