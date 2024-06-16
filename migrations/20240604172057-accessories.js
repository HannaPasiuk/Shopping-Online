// eslint-disable-next-line
// @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')
const { count } = require('console')


module.exports = {
  async up(db) {
    return db.collection('accessories').insertMany(
      [
          {
          category: 'glasses',
          price: '170€',
          name: 'FENDI',
          isHits: true,
          description: `These FENDI squared mask pilot shape sunglasses are designed with 
          a matte injected and FF pattern mirror technology lenses. Their fit are wide with high bridge. `,
          images: '/img/accessories/glasses-black.jpeg',
        },
        {
          category: 'glasses',
          price: '200€',
          name: 'GIUSEPPE DI MORABITO',
          isHits: false,
          description: `GIUSEPPE DI MORABITO sunglasses, 
          in plastic, lime color. Made in Italy.Case included.`,
          images: '/img/accessories/glasses-green.jpeg',
        },
        {
          category: 'glasses',
          price: '278€',
          name: 'PRADA',
          isHits: false,
          description: 'PRADA rectangular sunglasses in white.',
          images: '/img/accessories/glasses-white.jpeg'
        }
      ]
      )
    
  },

  async down(db) {
    return db.collection('accessories').updateMany([])
  },
}