// eslint-disable-next-line
// @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')
const { count } = require('console')


module.exports = {
  async up(db) {
    return db.collection('cloth').insertMany(
      [
         {
          category: 'cloth',
          type: 'dresses',
          price: '160€',
          name: 'DOLCE & GABBANA',
          color: 'black',
          isHits: true,
          description: `A haute couture mini black tulle dress from DOLCE & GABBANA,
           covered throughout in black sequins, this dress-cum-cape has a dramatic sense.`,
          images: ['/img/clothes/black-dress.jpeg'],
        },
        {
          category: 'cloth',
          type: 'sweaters',
          price: '320€',
          name: 'VETEMENTS',
          color: 'pink',
          isHits: true,
          description: `VETEMENTS’ pink alpaca wool-blend
           cardigan is decorated with vintage-inspired crystal
            and faux pearl buttons and shaped to a relaxed fit`,
          images: ['/img/clothes/pink-sweater.jpeg'],
        },
        {
          category: 'cloth',
          type: 'dresses',
          price: '160€',
          name: 'DOLCE & GABBANA',
          color: 'pink',
          isHits: false,
          description: `A haute couture mini black tulle dress from DOLCE & GABBANA,
           covered throughout in black sequins, this dress-cum-cape has a dramatic sense.`,
          images: ['/img/clothes/pink-pants.jpeg'],
        },
        {
          category: 'cloth',
          type: 'pants',
          price: '240€',
          name: 'TOM FORD',
          color: 'black',
          isHits: true,
          description: `For an elevated casual look like relaxed pajama-style,
          turn to these black pants from TOM FORD made by stretch-silk satin
          weave contrasting trim seam with a logo-tipped waistband in luxurious velvet.`,
          images: ['/img/clothes/black-pants.jpeg'],
        },
        {
          category: 'cloth',
          type: 'shorts',
          price: '80€',
          name: 'TOM FORD',
          color: 'green',
          isHits: false,
          description: `Elasticated high-rise waistband by FRAME in khaki-green shorts will bring a 1980s
           sensibility to warm-weather edits. They’re made from cotton-blend denim that includes
            elements of recycled cotton and polyester, featuring with belt loops and multipockets. `,
          images: ['/img/clothes/green-shorts.jpg'],
        },
        {
          category: 'cloth',
          type: 'sweaters',
          price: '175€',
          name: 'ZADIG & VOLTAIRE',
          color: 'black',
          isHits: false,
          description: `Long sleeve v-neck jumper detailed with tiny holes.
          This item belongs to Lifestylepop and is shipped from Cyprus..`,
          images: ['/img/clothes/black-sweater.jpeg'],
        },
        {
          category: 'cloth',
          type: 'shorts',
          price: '80€',
          name: 'TOTEME',
          color: 'white',
          isHits: false,
          description: `TOTEME white silk shorts with black crochet
           knit topstitching throughout and two side pockets.`,
          images: ['/img/clothes/white-shorts.jpeg'],
        },
        {
          category: 'cloth',
          type: 'shirts',
          price: '50€',
          name: 'MADEWELL',
          color: 'jeans',
          isHits: false,
          description: `Denim shirt with a pocket on the left side and closes with black buttons.`,
          images: ['/img/clothes/jeans-shirts.jpeg'],
        },
        {
          category: 'cloth',
          type: 'shirts',
          price: '510€',
          name: 'BOTTEGA VENETA',
          color: 'blue',
          isHits: false,
          description: `Mirror sequin shirt with long sleeves featuring 
          a collar style, a front buttons fastening and a relaxed fit.
          Made in Italy.`,
          images: ['/img/clothes/blue-shirts.jpg'],
        },
        {
          category: 'cloth',
          type: 'blouse',
          price: '170€',
          name: 'MIU MIU',
          color: 'pink',
          isHits: false,
          description: `Crystal-embellished Pintucked Silk-organza Blouse.`,
          images: ['/img/clothes/pink-blouse.jpeg'],
        }
      ]
      )
     
    
  },

  async down(db) {
    return db.collection('cloth').updateMany([])
  },
}

