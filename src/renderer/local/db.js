
const PouchDB = require('pouchdb-browser')

// PouchDB plugins
PouchDB.plugin(require('pouchdb-find'))

// Create or open our local database
export const local_db = new PouchDB('db')

const users = [
  {
    '_id': 'admin',
    token: 'admin',
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    type: 'users'
  },
  {
    '_id': 'editor',
    token: 'editor',
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    type: 'users'
  }
]

function check_db_init() {
  // Create an index on the type field to query all users
  local_db.createIndex({
    index: {
      fields: ['type']
    }
  })

  local_db.find({
    selector: {
      type: 'users'
    }
  }).then((list) => {
    console.log(list.docs)
    if (list.docs.length !== users.length) {
      users.forEach(element => {
        local_db.put(element).catch((err) => console.log(err.message))
      })
    }
  })
}

check_db_init()
