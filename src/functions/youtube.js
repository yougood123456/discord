const Parser = require('rss-parser');
const parser = new Parser();
const schema = require("../schemas/youtube");

module.exports = (client) => {

    client.checkUpdates = async () => {
        let setups = await schema.find();
        if (!setups) return;
        if (setups.length > 1) {
            Promise.all(setups.map(async data => {
                setTimeout(async () => {
                    try {
                        let videodata = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${data.ID}`);
                        if (!videodata) return;

                        let guild = client.guilds.cache.get(data.Guild);
                        if (!guild) return;

                        let channel = guild.channels.cache.get(`${data.Channel}`);
                        if (!channel) return;

                        let { link, author, title, id } = videodata.items[0];
                        if (data.Latest.includes(id)) return;

                        else {
                             await schema.updateOne({Guild: data.Guild, ID: data.ID}, {$push: {Latest: id}})
                        }

                        let pingrole = data.PingRole;
                        if (pingrole) {
                            if (pingrole === data.Guild) pingrole = "@everyone"
                            else pingrole = '<@&' + data.PingRole + '>'
                        } else {
                            pingrole = "_ _"
                        }

                        if (data.Message) {
                            if (pingrole !== "_ _") {
                                await channel.send({content: `${pingrole}\n${data.Message.replace("{author}", author).replace("{title}", title).replace("{link}", link)}`})
                            } else {
                                await channel.send({content: `**${author}** just uploaded **${title}**\n${link}`})
                            }
                        }

                    } catch {}
                }, 300000) 
            }))
        } else {
            
        }
    }

}