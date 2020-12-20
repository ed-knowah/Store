const user = require("../models/users");
require("dotenv").config();
const validator = require("../models/validator");

module.exports = {
  suggestItem: async (req, res) => {
    const { error } = validator.validateSuggestion.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const suggest = new user.suggestModel();
    const suggestedCategory = req.body.category.toLowerCase();
    suggest.itemName = req.body.name;
    suggest.itemDescription = req.body.description;
    suggest.reasonForSuggestion = req.body.reason;
    suggest.itemCategory = suggestedCategory;

    suggest.save((err, savedSuggestion) => {
      if (err) {
        res.status(500).send();
        console.log(err);
      } else {
        res.send(savedSuggestion);
      }
    });
  },

  suggested: async (req, res) => {
    const category = req.params.category;
    console.log(category);
    try {
      const findSuggest = await user.suggestModel.find({
        itemCategory: category,
      });
      //console.log(findSuggest);
      res.send(findSuggest);
    } catch (error) {
      console.log(error);
    }
  },

  allSuggested: async (req, res) => {
    const allSuggestion = await user.suggestModel.find();
    res.send(allSuggestion);
  },
};
