const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
module.exports = {
    name: 'stop',
    description: 'Stop the playing the song',
    execute(message, args, musicqueue){
        var link = musicqueue[message.guild.id];
        if(message.member.voice.connection){
            for(var i = link.musicqueue.length -1; i >= 0; i--){
                server.musicqueue.splice(i, 1);
            }
            server.dispatcher.end();
            console.log("end queue");
        }

        if(!message.member.connection) message.member.voice.channel.disconnect();

    }
}