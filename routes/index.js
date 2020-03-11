const express = require("express"),
  router = express.Router(),
  drinkModel = require("../models/drinkModel");


/* GET home page. */
router.get("/", async (req, res) => {
  res.render("template", {
    locals: {
      title: "HOME",
      sessionData: req.session
    },
    partials: {
      partial: "partial-index"
    }
  });
});



router.get("/search/:cocktailName?", async (req, res) => {
  const {
    cocktailName
  } = req.params;
  const drinkData = await drinkModel.searchCocktails(cocktailName);
  console.log('DRINK DATA =', drinkData)

  res.render("template", {
    locals: {
      title: "Results Page",
      drinkData: drinkData
    },
    partials: {
      partial: "partial-result"
    }
  })
});

/* GET drink page. */
router.get("/drink", async (req, res) => {
  let drinkData = await drinkModel.getOneCocktail(),
    ingredientData = [],
    measureData = [];

  drinkData = drinkData.drinks[0];
  for (let [key, value] of Object.entries(drinkData)) {
    if (key.toString().substring(0, 13) === "strIngredient") {
      ingredientData.push(value);
    }
    if (key.toString().substring(0, 10) === "strMeasure") {
      measureData.push(value);
    }
  }

  res.render("template", {
    locals: {
      title: "DRINK",
      sessionData: req.session,
      drinkData: drinkData,
      ingredientData: ingredientData,
      measureData: measureData
    },
    partials: {
      partial: "partial-drink"
    }
  });
});




router.post('/search', async (req, res) => {
  const {
    cocktailName
  } = req.body;
  console.log('POST DATA =', cocktailName)
  const url = `/search/${cocktailName}`;
  if (!!cocktailName) {
    res.redirect(url);
  } else {
    res.redirect('/');
  }
})

module.exports = router;