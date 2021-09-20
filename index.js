'use strict';

const Discord = require('discord-rpc');
const EventEmitter = require('events');

const browser = typeof window !== 'undefined';

function makeClient(clientId) {
  const rpc = new Discord.Client({ transport: browser ? 'websocket' : 'ipc' });

  let connected = false;
  let activityCache = null;

  const instance = new class RP extends EventEmitter {
    updatePresence(d) {
      if (connected) {
        rpc.setActivity(d).catch((e) => this.emit('error', e));
      } else {
        activityCache = d;
      }
    }

    reply(user, response) {
      const handle = (e) => this.emit('error', e);
      switch (response) {
        case 'YES':
          rpc.sendJoinInvite(user).catch(handle);
          break;
        case 'NO':
        case 'IGNORE':
          rpc.closeJoinRequest(user).catch(handle);
          break;
        default:
          throw new RangeError('unknown response');
      }
    }

    disconnect() {
      rpc.destroy().catch((e) => this.emit('error', e));
    }
  }();

  rpc.on('error', (e) => instance.emit('error', e));

  rpc.login({ clientId })
    .then(() => {
      instance.emit('connected');
      connected = true;

      rpc.subscribe('ACTIVITY_JOIN', ({ secret }) => {
        instance.emit('join', secret);
      });
      rpc.subscribe('ACTIVITY_SPECTATE', ({ secret }) => {
        instance.emit('spectate', secret);
      });
      rpc.subscribe('ACTIVITY_JOIN_REQUEST', (user) => {
        instance.emit('joinRequest', user);
      });

      if (activityCache) {
        rpc.setActivity(activityCache).catch((e) => instance.emit('error', e));
        activityCache = null;
      }
    })
    .catch((e) => instance.emit('error', e));

  return instance;
}

module.exports = makeClient;

// ----------------------------------------------------------------

const client = require('.')('180984871685062656');

client.on('join', (secret) => {
  console.log('we should join with', secret);
});

client.on('spectate', (secret) => {
  console.log('we should spectate with', secret);
});

client.on('joinRequest', (user) => {
  if (user.discriminator === '1337') {
    client.reply(user, 'YES');
  } else {
    client.reply(user, 'IGNORE');
  }
});

client.on('connected', () => {
  console.log('connected!');

  client.updatePresence({
    state: 'slithering',
    details: '🐍',
    startTimestamp: new Date(),
    largeImageKey: 'snek_large',
    smallImageKey: 'snek_small',
    partyId: 'snek_party',
    partySize: 1,
    partyMax: 1,
    matchSecret: 'slithers',
    joinSecret: 'boop',
    spectateSecret: 'sniff',
  });
});

process.on('unhandledRejection', console.error);
