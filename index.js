//Imports Discord.js and Neccessary Packages
const { Client } = require(`discord.js`);
const Enmap = require("enmap");
const fs = require("fs");

//Imports the token and prefix from the Config File
const { token, prefix } = require(`./config.json`)

//Makes the Client
const client = new Client({
    //Client Options Goes here
    //Client Options can be found here https://discord.js.org/#/docs/main/12.2.0/typedef/ClientOptions 
})

client.commands = new Enmap();

//Detects each file ( The Commands ) in the Command Folder 

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

//Detects each file ( The Events ) in the Events Folder 

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
  

client.login(token)

