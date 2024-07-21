
export const sample_foods: any[] = [
  {
    
    name: 'Pizza Pepperoni',
	tags: ['FastFood', 'Pizza', 'Lunch'],
    price: 10,
    favorite: false,
    stars: 4.5,
    imageUrl: 'assets/food-1.jpg',
	origins: ['italy'],
    cookTime: '10-20'
  },
  {
    
    name: 'Meatball',
    price: 20,
    tags: ['SlowFood', 'Lunch'],
    favorite: true,
    stars: 4.7,
    imageUrl: 'assets/food-2.jpg',
    origins: ['persia', 'middle east', 'china'],
	cookTime: '20-30'
  },
  {
    
    name: 'Hamburger',
    price: 5,
    cookTime: '10-15',
    favorite: false,
    origins: ['germany', 'us'],
    stars: 3.5,
    imageUrl: 'assets/food-3.jpg',
    tags: ['FastFood', 'Hamburger'],
  },
  {
   
    name: 'Fried Potatoes',
    price: 2,
	tags: ['FastFood', 'Fry'],
    favorite: true,
    stars: 3.3,
    imageUrl: 'assets/food-4.jpg',
	origins: ['belgium', 'france'],
    cookTime: '15-20'
  },
  {
    
    name: 'Chicken Soup',
    price: 11,
	tags: ['SlowFood', 'Soup'],
    favorite: false,
    stars: 3.0,
    imageUrl: 'assets/food-5.jpg',
	origins: ['india', 'asia'],
    cookTime: '40-50'
  },
  {
    
    name: 'Vegetables Pizza',
    price: 9,
	tags: ['FastFood', 'Pizza', 'Lunch'],
    favorite: false,
    stars: 4.0,
    imageUrl: 'assets/food-6.jpg',
	origins: ['italy'],
    cookTime: '40-50'
  },
  {
  
    name: 'Spicy Cheese Burger',
    price: 12,
    tags: ['FastFood', 'Burger', 'Lunch'],
    favorite: false,
	stars: 4.0,
    imageUrl: 'assets/food-7.jpg',
	origins: ['Indian'],
	cookTime: '20-30'
    
  },
  {
   
    name: 'Vegetables Magento Pizza',
    price: 9,
    tags: ['FastFood', 'Pizza', 'Lunch'],
    favorite: false,
    stars: 4.0,
    imageUrl: 'assets/food-8.jpg',
	origins: ['indian'],
	cookTime: '45-50'
  }
]

export const sample_tags:any[] = [
  { name: 'All', count: 6 },
  { name: 'FastFood', count: 4 },
  { name: 'Pizza', count: 2 },
  { name: 'Lunch', count: 3 },
  { name: 'SlowFood', count: 2 },
  { name: 'Hamburger', count: 1 },
  { name: 'Fry', count: 1 },
  { name: 'Soup', count: 1 },
]

export const sample_users: any[] = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: "12345",
    address: "Toronto On",
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "Jane@gmail.com",
    password: "12345",
    address: "Shanghai",
    isAdmin: false,
  },
];