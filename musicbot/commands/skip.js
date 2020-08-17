const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
module.exports = {
    name: 'skip',
    description: 'Skip the current song',
    execute(message, args, musicqueque){
        var link = musicqueque[message.guild.id];
        if(server.dispatcher) server.dispatcher.end();

        message.channel.send("Skipping song!");
    }
}