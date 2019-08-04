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
  })
}

module.exports = {
  Channel
};