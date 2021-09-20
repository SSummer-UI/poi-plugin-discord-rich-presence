const RPC = require("discord-rpc");
const rpc = new RPC.Client({
    transport: "ipc"
})

rpc.on("ready", () => {
    rpc.setActivity({
        details: "Editing Sequence 2",
        state: "Untitled.vpj",
        largeImageKey: "image",
        largeImageText: "Using Videopad Pro v 8.63",
        state: "Playing Solo",
        details: "Competitive",
        startTimestamp: Date.now(),
        endTimestamp: 1633117826000,
        largeImageText: "Numbani",
        smallImageText: "Rogue - Level 100",
        partyId: "ae488379-351d-4a4f-ad32-2b9b01c91657",
        partySize: 1,
        partyMax: 5,
        joinSecret: "MTI4NzM0OjFpMmhuZToxMjMxMjM= ",
    })

    console.log("RPC active");
})

rpc.login({
    clientId: "776550128071999519"
})