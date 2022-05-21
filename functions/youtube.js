const YouTubeNotifier = require('youtube-notification');
const Discord = require("discord.js");
const videoQuery = require('../sequelize/controllers/video.js');

module.exports = class Youtube {
    constructor(callBackUrl, client) {
        this.notifier = new YouTubeNotifier({
            hubCallback: callBackUrl,
          });
        this.client = client
    }
 
    getNotifier() {
        return this.notifier;
    }

    getListener() {
        return this.notifier.listener()
    }

    registerCallbacks(discord_channel_name) {
        this.notifier.on('subscribe', data => {
            console.log(data);
        });

        this.notifier.on('notified', async (data) => {
            let channel = this.client.channels.cache.find(channel => channel.name === discord_channel_name)
        
            let video_data = {
              video_id: data.video.id,
              video_title: data.video.title,
              channel: data.channel.name,
              link: data.video.link,
              published: data.published
            };
        
            console.log(video_data)
        
            const { item, created } = await videoQuery
            .updateOrCreate(video_data.video_id, video_data)
            .then()
            .catch((e) => {
                console.log(e);
            });
        
            if (created) {
                channel.send(`${data.channel.name} just uploaded a new video titled: ${data.video.title}. watch it at: ${data.video.link}`)
            } else {
                console.log("video updated, not sending discord msg")
            }
        });
    }
 }