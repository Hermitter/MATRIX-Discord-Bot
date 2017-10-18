# MATRIX Discord Bot
<img src='https://thumbs.gfycat.com/PoisedJadedBillygoat-size_restricted.gif'/>

# Overview
This MOS app allows you to control your MATRIX Creator through a Discord bot. The
<a href="https://github.com/Hermitter/MATRIX-Discord-Bot/blob/master/app.js">app.js</a> 
file includes prebuilt commands for you to use as an example for making your own. Each command added is assigned to a command group object that's stored in the commandGroups variable. For example, commands assigned to the 'matrix group' are now able to be used by typing '/matrix your_command' in the discrod chat.

```
Current Commands:

/matrix led - Change Color of MATRIX LEDs
/matrix join - MATRIX Joins Your Voice Channel
/matrix leave - MATRIX Leaves Current Voice Channel
/matrix docs - Link To MATRIX Documentation
/basic ping - Reply To User Ping
```
# Adding Commands
This example below will show you how to add a hello World command to the /matrix command group
```js
//addGroupCommand(group, commandName, Description, functionToRun)
addGroupCommand('matrix', 'hello', 'Link To MATRIX Documentation', function(userArgs, message){
    message.reply('hellowWorld');
});
```
