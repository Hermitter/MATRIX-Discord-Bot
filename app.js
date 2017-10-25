var Discord = require('discord.js');//https://discord.js.org
var bot = new Discord.Client();//Discord Bot Object
var token = 'YOUR_BOT_TOKEN_HERE';//Discord Bot Token
var mic = require('mic');//Stream wrapper for arecord
var currentVoiceChannel;//bot's current voice channel

//////////////////////////////////////////////////////////
// Discord Commands
//////////////////////////////////////////////////////////
var commandGroups = {
    'matrix': {command: '/matrix', list:[]},//matrix commands
    'basic' : {command: '/basic', list:[]}//basic chat commands
};

//Command Creator
function addGroupCommand(group, commandName, description, command) {
    //add command to command group
    commandGroups[group].list.push({
        commandName : commandName,//name
        description: description,//desc
        command: command//function to run
    });
}

//Look For & Use Command In Command Group
function commandSearch(group, message){
    var userArgs = message.content.split(' ');//Convert User Arguments Into An Array
    var commandFound = false;//bool on sending help menu
    var commandHelp = commandGroups[group].command+' Commands:\n';//will hold the command group's commands

    //check if command group was called
    if (userArgs[0] === commandGroups[group].command) {
        //Search For Command In Group
        for(i = 0; i < commandGroups[group].list.length; i++){
            //save command and description to help string
            commandHelp += '\n' + commandGroups[group].list[i].commandName +' - '+ commandGroups[group].list[i].description;
            //If command is found
            if( userArgs[1] === commandGroups[group].list[i].commandName){
                //Use command
                commandGroups[group].list[i].command(userArgs, message);
                //Update commandFound
                commandFound = true;
            }
        }
        //If Command Not Found
        if(!commandFound){
            message.reply('```'+commandHelp+'```');//reply with command list
        }
        //command group was found
        return true;
    }
    //command group was not called
    else
        return false;
}

//////////////////////////////////////////
// MATRIX Command Group
// - Change MATRIX LEDs
addGroupCommand('matrix', 'led', 'Change Color of MATRIX LEDs', function(userArgs, message){
    //Look For Color Input
    if (userArgs.length === 3){
        message.reply('```Using: matrix.led(\'' +userArgs[2]+ '\').render()```');
        console.log(userArgs[2]);
        matrix.led(userArgs[2]).render();//change colors
    }
    //Command Had No/Bad Input
    else{
        //reply command usage
        message.reply('```\nCommand Usage:\n\t'+
        '/matrix led purple'+'        //color name\n\t'+
        '/matrix led rgb(255,0,255)'+'//rgb values\n\t'+
        '/matrix led #800080'+'       //css color'+
        '```');
    }
});
// - Listen To MATRIX Mics
addGroupCommand('matrix', 'join', 'MATRIX Joins Your Voice Channel', function(userArgs, message){
    //continue if no args are present
    if(userArgs.length === 2){
        message.reply('Joining Voice Channel');
        //User Must Be In Voice Channel
        if (message.member.voiceChannel) {
            //just move if in voice channel
            if(currentVoiceChannel !== undefined){
                message.member.voiceChannel.join();//join voice channel
                currentVoiceChannel = message.member.voiceChannel;//save joined channel id
            }
            //join and reinitialize mics
            else{
                //join voice channel
                message.member.voiceChannel.join().then(connection => {
                    //save joined channel id
                    currentVoiceChannel = message.member.voiceChannel;
                    //npm mic config
                    var micInstance = mic({
                        rate: 16000,
                        channels: '1',
                        debug: false,
                        exitOnSilence: 0,
                        device : 'mic_channel8'
                    });
                    micInputStream = micInstance.getAudioStream();//mic audio stream
                    //when mics are ready
                    micInputStream.on('startComplete', function(){
                        var dispatcher;//will serve audio
                        dispatcher = connection.playArbitraryInput(micInputStream);//stream mics to Discord
                        console.log('mics ready');
                    });
                    //start mics
                    micInstance.start();
                });
            }
        }
        //User Is Not In Voice Channel
        else{
            message.reply('You need to join a Voice channel first!');
            return;
        }
    }
    //Tell user to use no args
    else
        message.reply('```"/matrix join" has no parameters```');
});
// - MATRIX Leaves Voice Channel
addGroupCommand('matrix', 'leave', 'MATRIX Leaves Current Voice Channel', function(userArgs, message){
    //continue if no args are present
    if(userArgs.length === 2){
        //leave current voice channel
        if(currentVoiceChannel !== undefined){
            message.reply('Leaving Voice Channel');
            currentVoiceChannel.leave();            
            //remove saved voice channel id
            currentVoiceChannel = undefined;
        }
        else
            message.reply('Currently not in a voice channel!');
    }
    //Tell user to use no args
    else
        message.reply('```"/matrix leave" has no parameters```'); 
});
// - MATRIX Documentation Link
addGroupCommand('matrix', 'docs', 'Link To MATRIX Documentation', function(userArgs, message){
    message.reply('https://matrix-io.github.io/matrix-documentation/');
});

//////////////////////////////////////////
// BASIC Command Group
// - A Simple Ping
addGroupCommand('basic', 'ping', 'Reply To User Ping', function(userArgs, message){
    message.reply('pong');
});

//////////////////////////////////////////////////////////
// Discord Events
//////////////////////////////////////////////////////////
//On Discord Message
bot.on('message', function(message){
    //Accept Text Channel & User Messages Only
    if (!message.guild && bot.user.id !== message.author.id){
        message.reply('You need to join a Text channel first!');
        return;
    }

    //Check If User Message
    if (bot.user.id !== message.author.id){
        //Loop through commandGroup groups
        for (var group in commandGroups) {
            //Search for and run command
            if (commandGroups.hasOwnProperty(group) && commandSearch(group, message))
                break;//leave loop
        }
    }
});

//On Discord Bot Login
bot.on('ready', function(){
    console.log('ready');
});

//Start Discord Bot
bot.login(token);
