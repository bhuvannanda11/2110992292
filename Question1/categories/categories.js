//Acquiring router

const router = require("express").Router();

// Define the products data 

const products = [  

  { id: 1, name: 'Product 1', category: 'Electronics', rating: 4.5, price: 10.99, company: 'Company A', discount: 0 },  

  { id: 2, name: 'Product 2', category: 'Furniture', rating: 3.8, price: 9.99, company: 'Company B', discount: 0.1 },  

  { id: 3, name: 'Product 3', category: 'Electronics', rating: 4.2, price: 12.99, company: 'Company C', discount: 0 },  

  { id: 4, name: 'Product 4', category: 'Furniture', rating: 4.7, price: 15.99, company: 'Company A', discount: 0.05 },  

];  

// GET /categories/:categoryname/products?n=:n&page=:page&sort=:sort

router.get('/categories/:categoryname/products', (req, res) => {  

  const category = req.params.categoryname;  //URL parameter for category name

  const n = parseInt(req.query.n) || 10;  

  const page = parseInt(req.query.page) || 1;  

  const sort = req.query.sort || 'rating'; // Default sort by rating in ascending order  

  // Filter products by category  

  let filteredProducts = products.filter((product) => {  

    return product.category.toLowerCase() === category.toLowerCase();  

  });  

  // Sort products based on the provided sort parameter  

  filteredProducts.sort((a, b) => {  

    let sortValueA, sortValueB;  

    switch (sort.toLowerCase()) {  

      case 'rating':  

        sortValueA = a.rating;  

        sortValueB = b.rating;  

        break;  

      case 'price':  

        sortValueA = a.price;  

        sortValueB = b.price;  

        break;  

      case 'company':  

        sortValueA = a.company;  

        sortValueB = b.company;  

        break;  

      case 'discount':  

        sortValueA = a.discount;  

        sortValueB = b.discount;  

        break;  

      default:  

        sortValueA = a.rating;  

        sortValueB = b.rating;  

        break;  

    }  

    return sortValueA - sortValueB;  

  });  

  // Calculate pagination values  

  const totalProducts = filteredProducts.length;  

  const totalPages = Math.ceil(totalProducts / n);  

  // Paginate the products based on the page number and number of products per page  

  const startIndex = (page - 1) * n;  

  const endIndex = startIndex + n;  

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);  

  // Return the paginated and sorted results  

  res.json({  

    products: paginatedProducts,  

    pagination: {  

      totalProducts,  

      totalPages,  

      currentPage: page,  

    },  

  });  

});  

router.get('/categories/:categoryName/products/:productId', (req, res) => {  

  const { categoryName, productId } = req.params;  

  // Find the product with the matching ID and category  
  const parsedProduct_id = parseInt(productId);

  const product = products.find(  

    (p) => p.id === parsedProduct_id && p.category.toLowerCase() === categoryName.toLowerCase()  

  );  

  if (!product) {  

    return res.status(404).json({ error: 'Product not found' });  

  }  

  res.json(product);  

});  

module.exports = router;  //Export the router