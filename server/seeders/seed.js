const db = require ('../config/connection');
const { User, Category, Product, Order, Review } = require ('../models');
const cleanDb = require ('../config/cleanDB');
// faker is alibrary that generates fake data
const { faker } = require('@faker-js/faker');

function createArray(length, funct, ...args){
  let i = 0;
  let arr = [];
  
  while (i < length) {
   arr.push(funct(...args));
    i++;
  }
  console.log(arr);
  return arr;
}

function createRandomUser () {
  return {
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'user',
    status: 'active',
  };
  
}

function createRandomCategory () {
  return {
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    status: 'active',
  };
}

function createRandomProduct (categories) {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    price: faker.commerce.price(),
    quantity: faker.number.int({max: 100}),
    category: faker.helpers.arrayElement(categories)._id,
    status: 'active',
  };
}

function createRandomOrder (users,products) {
  return {
    user: faker.helpers.arrayElement(users)._id,
    products: [
      {
        product: faker.helpers.arrayElement(products)._id,
        quantity: faker.number.int({max: 100}),
      },
      {
        product: faker.helpers.arrayElement(products)._id,
        quantity: faker.number.int({max: 100}),
      },
    ],
    total: faker.commerce.price(),
    status: faker.helpers.arrayElement(['complete', 'pending']),
  };
}

function createRandomReview (users, products) {
  return {
    review: faker.lorem.paragraph(),
    rating: faker.number.int( { min: 0, max: 5 }),
    user: faker.helpers.arrayElement(users)._id,
    product: faker.helpers.arrayElement(products)._id,
  };
}


db.on ('error', console.error.bind (console, 'MongoDB connection error:'));

db.once ('open', async () => {
  try { 
    await cleanDb ('User', 'users');
    await cleanDb ('Category', 'categories');
    await cleanDb ('Product', 'products');
    await cleanDb ('Order', 'orders');
    await cleanDb ('Review', 'reviews');

    const adminUser = {
      name: 'Admin User',
      username: 'adminUser',
      email: 'admin@admin.com',
      password: 'adminpassword1234',
      role: 'admin',
      status: 'active',
    };
    
    const users = await User.insertMany(
      createArray(5, createRandomUser)
    );  

    console.log ('Users seeded', users);

    const categories = await Category.insertMany (
      createArray(5, createRandomCategory)
    )

    console.log ('Categories seeded: ', categories);

    const products = await Product.insertMany (
      createArray(5, createRandomProduct, categories)
    );

    console.log ('Products seeded');

    const orders = await Order.insertMany (
      createArray(5, createRandomOrder, users, products)
    );

    console.log ('Orders seeded:', orders);

    const reviews = await Review.insertMany (
      createArray(5, createRandomReview, users,  products)
    );

    console.log ('Reviews seeded', reviews);

    process.exit ();

  } catch (error) {
    console.error ("Error seeding data:", error);
    process.exit (1);
  }
});
