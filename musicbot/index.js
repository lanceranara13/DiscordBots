const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require("./config.json")
const fs = require('fs');
const ytdl = require('ytdl-core');

let musicqueue = {};
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("ready")
    client.user.setActivity('!play', {type: "STREAMING"})
});

client.on('message', async (message) => {
    if(message.content.indexOf(prefix) !== 0 || message.author.bot) return;

    const args = message.content.substring(prefix.length).split(" ");
    const command = message.content.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();

    if(command == "play") {
        client.commands.get('play').execute(message, args, musicqueue);
    }
    else if(command == "skip") {
        client.commands.get('skip').execute(message, args, musicqueue);
    }
    else if(command == "stop") {
        client.commands.get('stop').execute(message, args, musicqueue);
    }
})



client.login(token)