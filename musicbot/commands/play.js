const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
module.exports = {
    name: 'play',
    description: "Play YouTube command",
    execute(message, args, musicqueue){
        function play(connection, message){
            var link = musicqueue[message.guild.id];
            console.log(link);
            link.dispatcher = connection.play(ytdl(link.musicqueue[0], {filter: "audioonly"}));
            link.musicqueue.shift();
            console.log(link);

            link.dispatcher.on("end", function(){
                if(link.musicqueue[0]){
                    play(connection, message);
                }
                else{
                    connection.disconnect;
                }
            });

            link.dispatcher.on("finish", () =>{
                if(link.musicqueue[0]){
                    play(connection, message);
                }else{
                    connection.disconnect();
                }
            });
        }
        if(!args[1]){
            message.channel.send("You need to provide a valid YT link!");
            return;
        }

        if(!message.member.voice.channel){
            message.channel.send("You must be in a voice channel!");
            return;
        }

        if(!musicqueue[message.guild.id]) musicqueue[message.guild.id] = {
            musicqueue: []
        }

        var link = musicqueue[message.guild.id];

        link.musicqueue.push(args[1]);

        if(!message.member.voice.connection){
            message.member.voice.channel.join().then(function(connection){
                play(connection, message);
            })
        }


    }
}

