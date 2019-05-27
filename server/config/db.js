const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const Inventory = require('../model/inventory')
const Cart = require('../model/cart')

const connectDB =  async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('MongoDB Connected ...');   
        cleanupAndPopulateDb();
        // reload DB with test data
    } catch (err) {
        console.log(err.message);
        // Exit process with failure message
        process.exit(1);
    }
}

const cleanupAndPopulateDb = async () => {
    // cleanup DB 
    console.log('Cleaning up MongoDB collections ...');
    await mongoose.connection.db.listCollections({name: Inventory.collection.name})
    .next(function(err, collinfo) {
        if (collinfo) {
            console.log("Cleaning Inventory ...");
            Inventory.collection.drop();
            console.log("Populating Inventory ...");
            populateTestData();
        }
    });
    await mongoose.connection.db.listCollections({name: Cart.collection.name})
    .next(function(err, collinfo) {
        if (collinfo) {
            console.log("Cleaning Cart ...");
            Cart.collection.drop();
        }
    });

}

const populateTestData = async () => {
    // populate test data in DB 
    console.log('Adding test data for MongoDB collections ...');
    for (var key in testData) {
        var obj = testData[key];
        new Inventory({
            name: obj.title,
            description: obj.description,
            thumbnail: obj.thumbnail,
            price: obj.price,
            quantity: 10
        }).save(function(err) {
            if (err) throw err;
            console.log('Inventory saved successfully!');
        });
    }
}

const testData = [
    {
        thumbnail: '/images/amaryllis.jpg',
        price: '10.99',
        title: 'Amaryllis',
        description: 'The amaryllis is a popular bulb plant with large lily-like blooms and long, thick stems. Its fragrant flowers can be found in several colors. It is also known as the belladonna lily',
    },
    {
        thumbnail: '/images/bird_of_paradise.jpg',
        price: '11.05',
        title: 'Bird of Paradise',
        description: 'An exotic flower named for its resemblance to a tropical bird. The bird of paradise has a unique appearance which consists of a colorful “beak” and fanned petals.',
    },
    {
        thumbnail: '/images/campanula.jpg',
        price: '14.05',
        title: 'Campanula',
        description: 'Campanula flowers are known for their small bell-shaped blooms, which can often be found in shades of lavender. They are also known as bellflowers or canterbury bells and are traditionally used as a sign of gratitude.',
    },
    {
        thumbnail: '/images/daisy.jpg',
        price: '09.54',
        title: 'Daisy',
        description: 'Daisies are identified by their disk-shaped, multi-petaled blooms. They most often consist of white or pink petals surrounding a yellow center. See also: Gerbera Daisy',
    },
    {
        thumbnail: '/images/dendrobium_orchid.jpg',
        price: '19.54',
        title: 'Dendrobium Orchid',
        description: 'Dendrobium orchids are distinguished by their long stems with clusters of many small butterfly-shaped blooms. They are often used in cut flower arrangements, and are usually seen in shades of purple or white.',
    },
    {
        thumbnail: '/images/hibiscus.jpg',
        price: '19.99',
        title: 'Hibiscus',
        description: 'A tropical blooming plant with bell-shaped flowers, which can be found in several colors. Hibiscus makes a wonderful potted plant, and is often regarded as a symbol of beauty.',
    },
    {
        thumbnail: '/images/lavender.jpg',
        price: '13.85',
        title: 'Lavender',
        description: 'A silvery, woody shrub that enjoys seaside weather. These fragrant plants bloom in spikes of purple, or sometimes white flowers. Lavender is often associated with love and devotion.',
    }
]

module.exports = connectDB;