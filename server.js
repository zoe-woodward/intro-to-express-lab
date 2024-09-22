
const express = require('express')

const app = express()

/*Exercise 1 */

app.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.send(`<h1>Hello ${name}!</h1>`);
  })

/*Exercise 2*/

app.get('/roll/:number', (req, res) => {
    const numberParam = req.params.number;
    const maxNumber = parseInt(numberParam, 10);
  
    if (isNaN(maxNumber)) {
      res.send('You must specify a number.');
    } else {
      const randomRoll = Math.floor(Math.random() * (maxNumber + 1));
      res.send(`You rolled a ${randomRoll}.`);
    }
  });

/* Exercise 3 */

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {
    const indexParam = req.params.index;
    const index = parseInt(indexParam, 10);
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
      res.send('This item is not yet in stock. Check back soon!');
    } else {
      const item = collectibles[index];
      res.send(`So, you want the ${item.name}? For £${item.price}, it can be yours!`);
    }
  });


  /* Exercise 4  */

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


/* Query Parameters:

min-price: Excludes shoes below this price.
max-price: Excludes shoes above this price.
type: Shows only shoes of the specified type.
No parameters: Responds with the full list of shoes. */

app.get('/shoes', (req, res) => {
    let { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

    minPrice = minPrice ? parseFloat(minPrice) : null;
    maxPrice = maxPrice ? parseFloat(maxPrice) : null;

    let filteredShoes = shoes;
    if (minPrice !== null) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
    if (maxPrice !== null) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
    }
    res.json(filteredShoes);
});




app.listen(3000, () => {
    console.log('Listening on port 3000')
  })