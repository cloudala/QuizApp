const express = require('express');
const router = express.Router();
const CategoryModel = require('../../models/Category');
const uuid = require('uuid');
const logToFile = require('../../logger/logger')

// Getting all categories
router.get('/api/categories', async (req, res) => {
    try {
      const categories = await CategoryModel.find({}, { _id: 0, __v: 0 });
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
  
// Creating a new category
router.post('/api/categories', async (req, res) => {
    try {
      const { name } = req.body;
      const generatedUuid = uuid.v4();
      console.log(generatedUuid)
  
      const newCategory = new CategoryModel({
        id: generatedUuid,
        name,
      });
  
      const savedCategory = await newCategory.save();
      const { id, name: categoryName } = savedCategory.toObject();
      res.status(201).json({id, name: categoryName});
    } catch (error) {
      console.error('Error adding category:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
  
// Updating a category
router.patch('/api/categories/:id', async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { name } = req.body;
      const result = await CategoryModel.updateOne({ id: categoryId }, { $set: { name } });
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Category updated successfully' });
      } else {
        res.status(404).json({ error: 'Not Found', message: 'Category not found' });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
  
// Deleting a category
router.delete('/api/categories/:id', async (req, res) => {
    try {
      const categoryId = req.params.id;
      const result = await CategoryModel.deleteOne({ id: categoryId });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ error: 'Not Found', message: 'Category not found' });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

module.exports = router