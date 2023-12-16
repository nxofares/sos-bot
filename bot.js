const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
    if (message.author.bot) return; // Ignore messages from other bots

    // Check if the message starts with the command !bang
    if (message.content.toLowerCase() === '!bang') {
        // Respond with a message and a fire emoji
        message.reply('Burn bang! 🔥');
    }

    // Check if the message starts with the command !ting
    if (message.content.toLowerCase() === '!ting') {
        // Respond with a message and a banana emoji
        message.reply('Banana ting! 🍌');
    }

    // Check if the message starts with the command !split
    if (message.content.toLowerCase() === '!split') {
        // Ask the user for the rally leader
        await message.reply('Who is the rally leader?');

        // Await a response from the same user within 60 seconds
        const filter = (response) => response.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 60000 });

        // Collect the rally leader's name
        let rallyLeader;
        collector.on('collect', (response) => {
            rallyLeader = response.content;
            collector.stop(); // Stop collecting after getting the rally leader's name
        });

        collector.on('end', (collected) => {
            if (collected.size === 0) {
                message.reply('No response received. Command canceled.');
            } else {
                // Split the provided names into two groups
                const names = collected.first().content.split(' ');
                const group1 = names.slice(0, Math.ceil(names.length / 2)).join(', ');
                const group2 = names.slice(Math.ceil(names.length / 2)).join(', ');

                // Respond with the split groups
                message.reply(`Rally leader: ${rallyLeader}\nGroup 1: ${group1}\nGroup 2: ${group2}`);
            }
        });
    }
});

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
client.login('MTE4NTU2MDMzNDI0NTgzNDc4Mg.GerxhT.0FcV0FN-PCduFnwMLeECG32MG1blpKx1bjuMmQ');
