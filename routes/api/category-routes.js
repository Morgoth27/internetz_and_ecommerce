const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findByPk(req.params.id, {
    include: [{ model: Product}]
  });
 
  if (!category) {
    res
    .status(404)
    .json({message: "No category to be found."});
    return;
  } else {
    res.json(category)
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then((newCategory) => {
    res.json(newCategory)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
   {
     where: {
    id: req.params.id
     }
  }).then((updatedCategory) => {
    res.json(updatedCategory);
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  if (!deletedCategory) {
    res
    .status(404)
    .json({message: "No such category with this ID."});
    return;
  } else {
    res.json({success: true, message: "Category deleted."})
  }
});

module.exports = router;
