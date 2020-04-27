//Imports Discord.js and Neccessary Packages
const { Client, Collection } = require(`discord.js`);
const Enmap = require("enmap");
const fs = require("fs");

//Imports the token and prefix from the Config File
const { token } = require(`./config.json`)

//Makes the Client
const client = new Client({
    //Client Options Goes here
    //Client Options can be found here https://discord.js.org/#/docs/main/12.2.0/typedef/ClientOptions 
})

client.commands = new Collection;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Detects each file ( The Commands ) in the Command Folder 
//reads each file in the Directory and check for errors
fs.readdir('./commands/', async (err, files) => {
//If Errors are Present it'll make an console.log an error
  if (err) return console.error;
  //for each file
  files.forEach(file => {
    //any files that dosen't end with js, ignore that file
    if (!file.endsWith('.js')) return;
    //Require the commands
    let props = require(`./commands/${file}`);
    //make a variable with the removed .js
    let cmdName = file.split('.')[0];
    //Console.log the variable once loaded
    console.log(`Loaded command '${cmdName}'`);
    client.commands.set(cmdName, props);
  });
});


fs.readdir('./events/', (err, files) => {

  if (err) return console.error;
  files.forEach(file => {
    //any files that dosen't end with js, ignore that file
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    //make a variable with the removed .js
    let evtName = file.split('.')[0];
    //Console.log the variable once loaded
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});


client.login(token)

