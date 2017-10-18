# MATRIX Discord Bot
<img src='https://thumbs.gfycat.com/PoisedJadedBillygoat-size_restricted.gif'/>

# Overview
This MOS app allows you to control your MATRIX Creator through a Discord bot. The
<a href="https://github.com/Hermitter/MATRIX-Discord-Bot/blob/master/app.js">app.js</a> 
file includes prebuilt commands for you to use as an example for making your own. Each command added is assigned to a command group object that's stored in the commandGroups variable. For example, commands assigned to the 'matrix' group are now able to be used by typing '/matrix your-command' in the Discord chat.

```
Current Commands:

/matrix led - Change Color of MATRIX LEDs
/matrix join - MATRIX Joins Your Voice Channel
/matrix leave - MATRIX Leaves Current Voice Channel
/matrix docs - Link To MATRIX Documentation
/basic ping - Reply To User Ping
```
# Adding Commands
This example will show you how to add a hello World command to the /matrix command group
```js
//addGroupCommand(group, commandName, Description, functionToRun)
addGroupCommand('matrix', 'hello', 'Link To MATRIX Documentation', function(userArgs, message){
    message.reply('helloWorld');
});
```
<img src="https://i.imgur.com/6CWJYtc.png"/>

# Raspberry Pi Dependencies
- Discord Audio Streaming
    - Libav ```sudo apt-get install libav-tools```
- MATRIX Creator Mics
    - ALSA Tools ```sudo apt-get install alsa-base alsa-utils```

# Notes
- Invite Link: https://discordapp.com/oauth2/authorize?client_id=XXXXXXXXXXXXXXX&scope=bot&permissions=1
- When joining a voice channel, the bot's mic audio will be delayed for a few seconds. This delay should naturally fix in a few minutes. If the bot switches from a voice channel, it will not have to go through the process again.
- Typing a group command by itself will list all known commands in that group
    - <img style="width:100px" src="https://i.imgur.com/5oKEYVt.png"/>
