//When someone uses the Hello Command

exports.run = (client, message, args) => {

    //Sends the message to the channel where it was executed
    message.channel.send("Hello World!");
}