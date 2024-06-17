module.exports = {
  async up(db) {
   db.createCollection('favorites')
  },

  async down(db, client) {
    db.collection('favorites').drop()
  }
};
