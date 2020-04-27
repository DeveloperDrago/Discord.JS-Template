module.exports = (client) => {
  console.log(`Bot Successfully Initallized`);
  //When the bot is online it'll log that it's On
  client.user.setActivity(`The Default Prefix: >`);
  //this will change what game the bot is playing
}