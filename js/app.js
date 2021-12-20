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
    const tagcontent = document.querySelector('.tagcontent');
    const removeTags = document.querySelector('.tagcontent');

    tagRecipes.addEventListener('change', (e) => {
      if (e.target.nodeName === 'SELECT') {
        const tag = this.view.customElement(
          'span',
          'tagcontent--recipes',
          tagcontent
        );
        tag.innerText = e.target.value;
        tag.id = e.target.value;
        tag.classList.add('margin');
        const cross = this.view.customElement('img', 'cross', tag);
        this.view.customPic(cross, 'cross.svg', 'icone de croix');
        cross.classList.add('ingredients');
        //     const i = sortedComponents.indexOf(e.target.value);
        //     arrayTags.splice(i, 1);
        //     // selectRecipes.innerHTML = `
        //     //                 <option value ="Ingrédients">Ingrédients</option>
        //     //             `;
        //     this.view.displayComponents(selectRecipes, arrayTags);
        //     if (e.target.className.includes('filteroptions--recipes')) {
        //       const section = document.getElementById('sectionrecipes');
        //       section.innerHTML = '';
        this.filterIngredients.push(tag.innerText.toLowerCase());
        this.show();
        //     }
      }
    });

    removeTags.addEventListener('click', (e) => {
      if (e.target.className === 'cross ingredients') {
        const id = document.getElementById(e.path[1].innerText);
        removeTags.removeChild(id);
        //     arrayTags.push(e.path[1].innerText);
        //     selectRecipes.innerHTML = '';
        //     selectRecipes.innerHTML = `
        //                     <option value ="Ingrédients">Ingrédients</option>
        //                 `;
        //     this.view.displayComponents(selectRecipes, arrayTags);
      }
    });
  }

  devicesListener() {
    const tagRecipes = document.querySelector('.filteroptions--recipes');
    const tagcontent = document.querySelector('.tagcontent');
    const removeTags = document.querySelector('.tagcontent');

    tagRecipes.addEventListener('change', (e) => {
      if (e.target.nodeName === 'SELECT') {
        const tag = this.view.customElement(
          'span',
          'tagcontent--recipes',
          tagcontent
        );
        tag.innerText = e.target.value;
        tag.id = e.target.value;
        tag.classList.add('margin');
        const cross = this.view.customElement('img', 'cross', tag);
        this.view.customPic(cross, 'cross.svg', 'icone de croix');
        cross.classList.add('ingredients');
        //     const i = sortedComponents.indexOf(e.target.value);
        //     arrayTags.splice(i, 1);
        //     // selectRecipes.innerHTML = `
        //     //                 <option value ="Ingrédients">Ingrédients</option>
        //     //             `;
        //     this.view.displayComponents(selectRecipes, arrayTags);
        //     if (e.target.className.includes('filteroptions--recipes')) {
        //       const section = document.getElementById('sectionrecipes');
        //       section.innerHTML = '';
        this.filterDevices.push(tag.innerText.toLowerCase());
        console.log(this.filterDevices);
        this.show();
        //     }
      }
    });

    removeTags.addEventListener('click', (e) => {
      if (e.target.className === 'cross ingredients') {
        const id = document.getElementById(e.path[1].innerText);
        removeTags.removeChild(id);
        //     arrayTags.push(e.path[1].innerText);
        //     selectRecipes.innerHTML = '';
        //     selectRecipes.innerHTML = `
        //                     <option value ="Ingrédients">Ingrédients</option>
        //                 `;
        //     this.view.displayComponents(selectRecipes, arrayTags);
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
    const tagDevices = document.querySelector('.filteroptions--device');
    const tagcontent = document.querySelector('.tagcontent');

    this.recipes.forEach((devices) => {
      wholeDevices.push(devices.appliance);
    });

    const sortedDevices = [...new Set(wholeDevices)];
    const arrayTags = sortedDevices;
    this.view.displayComponents(selectDevices, sortedDevices);

    tagDevices.addEventListener('change', (e) => {
      if (e.target.nodeName === 'SELECT') {
        const tag = this.view.customElement(
          'span',
          'tagcontent--devices',
          tagcontent
        );
        tag.innerText = e.target.value;
        tag.id = e.target.value;
        tag.classList.add('margin');

        const cross = this.view.customElement('img', 'cross', tag);
        this.view.customPic(cross, 'cross.svg', 'icone de croix');
        cross.classList.add('ingredients');

        const i = sortedDevices.indexOf(e.target.value);
        arrayTags.splice(i, 1);

        selectDevices.innerHTML = `
                        <option value ="Appareil">Appareil</option>
                    `;
        if (e.target.className.includes('filteroptions--device')) {
          this.filterDevices.push(tag.innerText.toLowerCase());
        }
        this.view.displayComponents(selectDevices, arrayTags);
      }
    });

    const removeTags = document.querySelector('.tagcontent');

    removeTags.addEventListener('click', (e) => {
      if (e.target.className === 'cross ingredients') {
        arrayTags.push(e.path[1].innerText);
        selectDevices.innerHTML = '';
        selectDevices.innerHTML = `
                        <option value ="Appareil">Appareil</option>
                    `;
        this.view.displayComponents(selectDevices, arrayTags);
      }
    });
  }

  getUstensils() {
    const selectUstensils = document.querySelector(
      '.filteroptions--ustensils '
    );
    const tagUstensils = document.querySelector('.filteroptions--ustensils');
    const tagcontent = document.querySelector('.tagcontent');

    const wholeUstensils = [];

    this.recipes.forEach((ustensils) => {
      ustensils.ustensils.forEach((ust) => {
        wholeUstensils.push(ust);
      });
    });

    const sortedUstensils = [...new Set(wholeUstensils)];
    const arrayTags = sortedUstensils;
    this.view.displayComponents(selectUstensils, sortedUstensils);

    tagUstensils.addEventListener('change', (e) => {
      if (e.target.nodeName === 'SELECT') {
        const tag = this.view.customElement(
          'span',
          'tagcontent--ustensils',
          tagcontent
        );
        tag.innerText = e.target.value;
        tag.id = e.target.value;
        tag.classList.add('margin');

        const cross = this.view.customElement('img', 'cross', tag);
        this.view.customPic(cross, 'cross.svg', 'icone de croix');
        cross.classList.add('ingredients');

        const i = sortedUstensils.indexOf(e.target.value);
        arrayTags.splice(i, 1);

        selectUstensils.innerHTML = `
                        <option value ="Appareil">Appareil</option>
                    `;
        if (e.target.className.includes('filteroptions--ustensils')) {
          this.filterUstensils.push(tag.innerText.toLowerCase());
          console.log(this.filterUstensils);
        }
        this.view.displayComponents(selectUstensils, arrayTags);
      }
    });

    const removeTags = document.querySelector('.tagcontent');

    removeTags.addEventListener('click', (e) => {
      if (e.target.className === 'cross ingredients') {
        arrayTags.push(e.path[1].innerText);
        selectUstensils.innerHTML = '';
        selectUstensils.innerHTML = `
                        <option value ="Ustensiles">Ustensiles</option>
                    `;
        this.view.displayComponents(selectUstensils, arrayTags);
      }
    });
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
