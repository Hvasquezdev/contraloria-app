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

module.exports = {
  Channel
};