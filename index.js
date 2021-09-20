const RPC = require("discord-rpc");
const rpc = new RPC.Client({
    transport: "ipc"
})

rpc.on("ready", () => {
    rpc.setActivity({//Actual activity status
        state: "E3 難易度：丙",
        details: "Clearing Spring 2021 KC Event",
        startTimestamp: Date.now(),
        endTimestamp: 1633117826000,
        largeImageKey: "kuma",
        largeImageText: "球磨改二",
        smallImageKey: "patriotcircle",
        smallImageText: "RSWIB",
        partyId: "ae488379-351d-4a4f-ad32-2b9b01c91657",
        partySize: 2,
        partyMax: 4,
        joinSecret: "MTI4NzM0OjFpMmhuZToxMjMxMjM= ",
    })

    console.log("RPC active");
})

rpc.login({
    clientId: "889601466631868436" // Application ID under https://discord.com/developers/applications/889601466631868436/information
})