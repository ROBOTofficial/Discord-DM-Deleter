import { Client } from "discord.js-selfbot-v13";

const client = new Client();

client.on("ready", async c => {
    const channel = c.channels.cache.get(process.env.TARGET_CHANNEL_ID ?? "");
    let before: string | undefined = undefined;

    if (!channel) {
        console.log("チャンネルが見つかりませんでした。")
        process.exit(0);
    }
    if (channel.type !== "DM") {
        console.log("DMチャンネルを指定してください")
        process.exit(0);
    }
    for (;;) {
        const messages = (await channel.messages.fetch({ limit: 100, before })).values().toArray();
        if (!messages.length) {
            break
        }
        for (const message of messages) {
            if (message.author.id === c.user.id) {
                try {
                    await message.delete();
                    console.log(`DELETED: ${message.id}`);
                } catch {}
            }
            before = message.id;
        }
    }
    console.log("COMPLETED");
    process.exit(0);
});

client.login(process.env.TOKEN);
