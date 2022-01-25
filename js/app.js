import { View } from './view.class.js';
import { recipes } from '../data/recipes.js';

class IndexPage {
  constructor(view) {
    this.view = view;
    this.recipes = null; // passer à la classe view
    this.recipesLoaded = recipes; // never bouger
    this.filterIngredients = [];
    this.filterDevices = [];
    this.filterUstensils = [];
  }

  run() {
    this.show();
    this.ingredientsListener();
    this.devicesListener();
    this.ustensilsListener();
  }

  show() {
    this.filter();
    this.getIngredients();
    this.getDevices();
    this.getUstensils();
    this.showRecipes();
  }

  ingredientsListener() {
    const tagRecipes = document.querySelector('.filteroptions--recipes');
    const tagContent = document.querySelector('.tagcontent');
    const className = 'tagcontent--recipes';

    tagRecipes.addEventListener('change', (e) => {
      if (e.target.nodeName === 'SELECT') {
        const tagValue = this.view.createTags(e, className, tagContent);

        this.filterIngredients.push(tagValue.toLowerCase());
        this.show();
      }
    });

    tagContent.addEventListener('click', (e) => {
      const tagElt = e.target.parentNode;
      const tagEltClassName = tagElt.className;
      if (
        e.target.className === 'cross ingredients' &&
        tagEltClassName.includes(className)
      ) {
        this.filterIngredients = this.filterIngredients.filter(
          (ingredient) => ingredient !== tagElt.id
        );

        this.view.removeTags(tagElt, tagContent);
        this.show();
      }
    });
  }

  tagsListener() {
    const tagContent = document.querySelector('.tagcontent');
    const tagRecipes = document.querySelector('.filteroptions--recipes');
    const recipesName = 'tagcontent--recipes';
    const tagDevices = document.querySelector('.filteroptions--device');
    const devicesName = 'tagcontent--devices';
    const tagUstensils = document.querySelector('.filteroptions--ustensils');
    const ustensilsName = 'tagcontent--ustensils';

    tagContent.addEventListener('change', (e) => {
      const tagElt = e.target.parentNode;
      const tagEltClassName = tagElt.className;

      if(e.target.nodeName === 'SELECT') {
        if(e.target.className)
        const tagValue = this.view.createTags(e, )
      }
    })

    tagContent.addEventListener('click', (e) => {
      const tagElt = e.target.parentNode;
      const tagEltClassName = tagElt.className;

      if(e.target.className === 'cross ingredients' && tagEltClassName.includes(recipesName)) {
        this.filterIngredients = this.filterIngredients.filter((ingredient) => ingredient !== tagElt.id);
        this.view.removeTags(tagElt, tagContent);
        this.show();
      }
      else if (e.target.className === 'cross ingredients' && tagEltClassName.includes(devicesName)) {
        this.filterDevices = this.filterDevices.filter((device) => device !== tagElt.id);
        this.view.removeTags(tagElt, tagContent);
        this.show();
      }
      else(e.target.className === 'cross ingredients' && tagEltClassName.includes(ustensilsName)) {
        this.filterUstensils = this.filterUstensils.filter((ustensils) => ustensils !== tagElt.id);
        this.view.removeTags(tagElt, tagContent);
        this.show();
      }
    })


  }

  devicesListener() {
    const tagDevices = document.querySelector('.filteroptions--device');
    const tagContent = document.querySelector('.tagcontent');
    const className = 'tagcontent--devices';

    // tagDevices.addEventListener('change', (e) => {
    //   if (e.target.nodeName === 'SELECT') {
    //     const tagValue = this.view.createTags(e, className, tagContent);
    //     this.filterDevices.push(tagValue.toLowerCase());
    //     this.show();
    //   }
    // });

    tagContent.addEventListener('click', (e) => {
      const tagElt = e.target.parentNode;
      const tagEltClassName = tagElt.className;
      if (
        e.target.className === 'cross ingredients' &&
        tagEltClassName.includes(className)
      ) {
        this.filterDevices = this.filterDevices.filter(
          (device) => device !== tagElt.id
        );

        this.view.removeTags(tagElt, tagContent);
        this.show();
      }
    });
  }

  ustensilsListener() {
    const tagUstensils = document.querySelector('.filteroptions--ustensils');
    const tagContent = document.querySelector('.tagcontent');
    const className = 'tagcontent--ustensils';

    tagUstensils.addEventListener('change', (e) => {
      if (e.target.nodeName === 'SELECT') {
        const tagValue = this.view.createTags(e, className, tagContent);
        this.filterDevices.push(tagValue.toLowerCase());
        this.show();
      }
    });

    tagContent.addEventListener('click', (e) => {
      const tagElt = e.target.parentNode;
      const tagEltClassName = tagElt.className;

      if (
        e.target.className === 'cross ingredients' &&
        tagEltClassName.includes(className)
      ) {
        this.filterUstensils = this.filterUstensils.filter(
          (ustensils) => ustensils !== tagElt.id
        );

        this.view.removeTags(tagElt, tagContent);
        this.show();
      }
    });
  }

  filterByTagIngredients() {
    let copy = [];

    if (this.filterIngredients.length !== 0) {
      this.filterIngredients.forEach((filterIngredient) => {
        copy = [];
        this.recipes.forEach((recette) => {
          recette.ingredients.forEach((ingredient) => {
            const element = ingredient.ingredient.toLowerCase();
            if (element.match(filterIngredient)) {
              copy.push(recette);
            }
          });
        });
        this.recipes = new Set(copy);
      });
    }
  }

  filterByTagDevices() {
    let copy = [];
    if (this.filterDevices.length !== 0) {
      this.filterDevices.forEach((filterDevice) => {
        copy = [];
        this.recipes.forEach((recette) => {
          const element = recette.appliance.toLowerCase();
          if (filterDevice.match(element)) {
            copy.push(recette);
          }
        });

        this.recipes = new Set(copy);
      });
    }
  }

  filterByTagUstensils() {
    let copy = [];

    if (this.filterUstensils.length !== 0) {
      this.filterUstensils.forEach((filterUsensil) => {
        copy = [];

        this.recipes.forEach((recette) => {
          const element = [];

          recette.ustensils.forEach((u) => {
            u.toLowerCase();
            element.push(u);
          });

          if (filterUsensil.match(element)) {
            copy.push(recette);
          }
        });

        this.recipes = new Set(copy);
      });
    }
  }

  filter() {
    this.recipes = this.recipesLoaded;
    this.filterByTagDevices();
    this.filterByTagIngredients();
    this.filterByTagUstensils();
    this.search();
  }

  showRecipes() {
    this.view.renderRecipes(this.recipes);
  }

  getIngredients() {
    let sortedComponents = [];
    const selectRecipes = document.querySelector('.filteroptions--recipes');

    this.recipes.forEach((recettes) => {
      recettes.ingredients.forEach((ingredient) => {
        sortedComponents.push(ingredient.ingredient.toLowerCase());
      });
    });

    sortedComponents = [...new Set(sortedComponents)].sort();
    this.view.displayComponents(selectRecipes, sortedComponents);
  }

  getDevices() {
    const wholeDevices = [];
    const selectDevices = document.querySelector('.filteroptions--device ');

    this.recipes.forEach((devices) => {
      wholeDevices.push(devices.appliance.toLowerCase());
    });

    const sortedDevices = [...new Set(wholeDevices)];
    this.view.displayComponents(selectDevices, sortedDevices);
  }

  getUstensils() {
    const selectUstensils = document.querySelector(
      '.filteroptions--ustensils '
    );

    const wholeUstensils = [];

    this.recipes.forEach((ustensils) => {
      ustensils.ustensils.forEach((ust) => {
        wholeUstensils.push(ust.toLowerCase());
      });
    });

    const sortedUstensils = [...new Set(wholeUstensils)];
    this.view.displayComponents(selectUstensils, sortedUstensils);
  }

  // filter(input) {

  //   datas.then((data) => {
  //     const arrayAllRecipes = [];
  //     data.recipes.filter((d) =>
  //       d.ingredients.forEach((i) => {
  //         if (i.ingredient.toLowerCase().includes(input.toLowerCase())) {
  //           arrayAllRecipes.push(d);
  //           console.log(arrayAllRecipes);
  //           // console.log(i);
  //         }
  //       })
  //     );
  //     const section = document.getElementById('sectionrecipes');
  //     section.innerHTML = ``;
  //     this.view.renderRecipes(arrayAllRecipes);
  //   });
  // }

  search() {
    const research = document.getElementById('searchbar');
    // console.log(research);
    research.addEventListener('input', (e) => {
      if (e.target.value.length === 3 || e.target.value.length > 3) {
        this.filter(e.target.value);
      }
    });
  }
}

const indexPage = new IndexPage(new View());
indexPage.run();
