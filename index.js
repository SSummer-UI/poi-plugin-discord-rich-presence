const RPC = require("discord-rpc");
const rpc = new RPC.Client({
    transport: "ipc"
})

rpc.on("ready", () => {
    rpc.setActivity({//Actual activity status
        state: "E1 難易度：甲",
        details: "艦隊これくしょん 2021年 夏イベ攻略中",
        startTimestamp: Date.now(),
        endTimestamp: 1633117826000,
        largeImageKey: "kuma",
        largeImageText: "球磨改二",
        smallImageKey: "poi",
        smallImageText: "poi",
        partyId: "ae488379-351d-4a4f-ad32-2b9b01c91657",
        partySize: 1,
        partyMax: 3,
        joinSecret: "MTI4NzM0OjFpMmhuZToxMjMxMjM= ",// Placeholder provided by sample code
    })

    console.log("RPC active");
})

rpc.login({
    clientId: "889613541357781002" // Application ID under https://discord.com/developers/applications/889613541357781002/information
})