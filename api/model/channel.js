const mysqlConnection = require('../database');

const Channel = function(channel) {
  this.name = channel.name;
  this.type = channel.type;
};

Channel.newChannel = function(newChannel, result) {
  mysqlConnection.query("INSERT INTO channel set ?", newChannel, function(err, res) {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Channel.checkChannelName = function(channelName, result) {
  mysqlConnection.query("SELECT id FROM channel WHERE name = ?", [channelName], function(err, res) {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

Channel.getUserChannels = function(memberId, result) {
  mysqlConnection.query("SELECT * FROM channel_member WHERE memberId = ?", [memberId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

Channel.getChannelData = function(channelId, result) {
  mysqlConnection.query("SELECT * FROM channel WHERE id = ?", [channelId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

Channel.getChannelMembers = function(channelId, result) {
  mysqlConnection.query("SELECT * FROM channel_member WHERE channelId = ?", [channelId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

Channel.getMemberData = function(memberId, result) {
  mysqlConnection.query("SELECT * FROM users WHERE id = ?", [memberId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

Channel.checkUserInChannel = function(data, result) {
  const { memberId, channelId } = data;

  mysqlConnection.query("SELECT id FROM channel_member WHERE memberId = ? AND channelId = ?", [memberId, channelId], function(err, res) {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

Channel.newMember = function(data, result) {
  mysqlConnection.query("INSERT INTO channel_member set ?", data, function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

Channel.getByName = function(channelName, result) {
  mysqlConnection.query("SELECT id, name, type FROM channel WHERE name = ?", [channelName], function(err, res) {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Channel.leave = function(channelMemberId, result) {
  mysqlConnection.query("DELETE FROM channel_member WHERE id = ?", [channelMemberId], function(err, res) {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

module.exports = {
  Channel
};