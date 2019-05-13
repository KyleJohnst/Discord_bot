var Discord = require('discord.io');
var logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: process.env.BOT_TOKEN
});
bot.on('ready', function (evt) {
    logger.info('Logged in as: MR ROBOTO');
    logger.info('BOT is now running');

});

const choices = [
    {
        name: "rock",
        defeats: ["scissors", "lizard"]
    },
    {
        name: "paper",
        defeats: ["rock", "spock"]
    },
    {
        name: "scissors",
        defeats: ["paper", "lizard"]
    },
    {
        name: "lizard",
        defeats: ["paper", "spock"]
    },
    {
        name: "spock",
        defeats: ["scissors", "rock"]
    }
]

// Checks who the winner is
function playGame(hand){
    let compHand = randomHand();
        if (hand === compHand.name) {
            return `Draw! Your choice of ${hand} and MR ROBOTO's ${compHand.name} drew`;
        } else if (compHand.defeats.includes(hand)) {
            return `LOSE! MR ROBOTO's ${compHand.name} beats your ${hand}`;
        } else {
            return `WIN! Your ${hand} beats MR ROBOTO's ${compHand.name}`
        }
};

// Gives MR ROBOTO a hand at random
function randomHand(){
    const i = Math.floor(Math.random() * 5);
    let compHand = choices[i];
    return compHand;
}


bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it must execute a command
    // It will listen for messages that start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !hi
            case 'hi':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hello mortal...'
                });
                break;
            // !shutup
            case 'shutup':
                bot.sendMessage({
                    to: channelID,
                    message: 'Shut Up!!!'
                });
                break;
            // !rules returns the rules for the game.
                case 'rules':
                bot.sendMessage({
                    to: channelID,
                    message: "The Rules to the game are as follows: Scissors cuts Paper, Paper covers Rock, Rock crushes Lizard, Lizard poisons Spock, Spock smashes Scissors, Scissors decapitates Lizard, Lizard eats Paper, Paper disproves Spock, Spock vaporizes Rock, (and as it always has) Rock crushes Scissors"
                });
                break;
            // !choices returns your hand choices
                case 'choices':
                bot.sendMessage({
                    to: channelID,
                    message: "These are the choices: !rock, !scissors, !paper, !lizard, !spock"
                });
                break;
            // Choices for the RPSLS game
                case `rock`:
                bot.sendMessage({
                    to: channelID,
                    message: playGame("rock")
                });
                break;

                case `paper`:             
                bot.sendMessage({
                    to: channelID,
                    message: playGame("paper")
                });
                break;

                case `scissors`:
                bot.sendMessage({
                    to: channelID,
                    message: playGame("scissors")
                });
                break;

                case `lizard`:
                bot.sendMessage({
                    to: channelID,
                    message: playGame("lizard")
                });
                break;

                case `spock`:
                bot.sendMessage({
                    to: channelID,
                    message: playGame("spock")
                });
                break;
        }
    }
});