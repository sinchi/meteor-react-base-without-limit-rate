module.exports = {
  servers: {
    one: {
      host: '52.25.61.35',
      username: 'ubuntu',
      pem: '/home/ayoub/Téléchargements/sinchi.pem'
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'annoncio',
    path: '/home/ayoub/meteor_react_base_v4-1/base',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
    //  ROOT_URL: 'annoncio.onmodulus.net',
    //  MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
