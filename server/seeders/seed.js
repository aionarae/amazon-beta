const db = require ('../config/connection');
const { User, Category, Product, Order, Review } = require ('../models');
const cleanDb = require ('../config/cleanDB');

db.once ('open', async () => {
    await cleanDb ('User', 'users');
    await cleanDb ('Category', 'categories');
    await cleanDb ('Product', 'products');
    await cleanDb ('Order', 'orders');
    await cleanDb ('Review', 'reviews');

    const users = await User.insertMany ([
      {
        name: 'Test User',
        username: 'testUser',
        email: 'test@test.com',
        password: 'password1234',
        role: 'admin',
        status: 'active',
        created_at: Date.now ()
      },
      {
        name: 'Test User 2',
        username: 'testUser2',
        email: 'test@test.com',
        password: 'password1234',
        role: 'user',
        status: 'active',
        created_at: Date.now ()
      }
    ]);

    console.log ('Users seeded');

    const categories = await Category.insertMany ([
      {
        name: 'Category 1', 
        description: 'Category 1 descriptionn',
        image: 'category1.jpg',
        status: 'active',
        created_at: Date.now ()
      },
      {
        name: 'Category 2',
        description: 'Category 2 description',
        image: 'category2.jpg',
        status: 'active',
        created_at: Date.now ()
      }
    ]);

    console.log ('Categories seeded');

    const products = await Product.insertMany ([
      {
        name: 'Product 1',
        description: 'Product 1 description',
        image: 'product1.jpg',
        price: 9.99,
        quantity: 10,
        category: categories[0]._id,
        status: 'active',
        created_at: Date.now ()
      },
      {
        name: 'Product 2',
        description: 'Product 2 description',
        price: 19.99,
        quantity: 20,
        category: categories[1]._id,
        status: 'active',
        created_at: Date.now ()
      }
    ]);

    console.log ('Products seeded');

    const orders = await Order.insertMany ([
      {
        user: users[0]._id,
        products: [
          {
            product: products[0]._id,
            quantity: 2
          },
          {
            product: products[1]._id,
            quantity: 1
          }
        ],
        total: 39.97,
        status: 'complete',
        created_at: Date.now ()
      },
      {
        user: users[1]._id,
        products: [
          {
            product: products[1]._id,
            quantity: 3
          }
        ],
        total: 59.97,
        status: 'pending',
        created_at: Date.now ()
      }
    ]);

    console.log ('Orders seeded');

    const reviews = await Review.insertMany ([
      {
        review: 'Review 1',
        rating: 5,
        user: users[0]._id,
        product: products[0]._id,
        created_at: Date.now ()
      },
      {
        review: 'Review 2',
        rating: 4,
        user: users[1]._id,
        product: products[1]._id,
        created_at: Date.now ()
      }
    ]);

    console.log ('Reviews seeded');

    process.exit ();
});

