const { models } = require("..");

async function findVideo(video_id) {
    // First try to find the record
    const videoData = await models.video
        .findOne({ where: { video_id: video_id } })
        .then()
        .catch((e) => {
            console.log(e);
        });
    if (videoData) {
        return { found: true, videoData };
    } else {
        return { found: false };
    }
}

async function updateOrCreate(video_id, newItem) {
    // First try to find the record
    const foundItem = await models.video
        .findOne({ where:{video_id: video_id }})
        .then()
        .catch((e) => {
            console.log(e);
        });
    if (!foundItem) {
        // Item not found, create a new one
        const item = await models.video.create(newItem).catch((e) => {
            console.log(e);
        });
        return { item, created: true };
    }
    // Found an item, update it
    const item = await models.video
        .update(newItem, { where: { video_id: video_id } })
        .then()
        .catch((e) => {
            console.log(e);
        });
    return { item, created: false };
}

module.exports = { findVideo, updateOrCreate };
