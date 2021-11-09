import { Ajax } from './ajax.class.js';
import { View } from './view.class.js';

class IndexPage {
  constructor(view, ajax) {
    this.view = view;
    this.ajax = ajax;
  }

  run() {
    this.getRecipes();
    this.getDevices();
    this.getUstensils();
    // this.displayTags();
    this.showRecipes();
  }

  showRecipes() {
    const datas = this.ajax.fetchData();
    datas.then((data) => {
      this.view.renderRecipes(data);
    });
  }

  getRecipes() {
    const datas = this.ajax.fetchData();
    const selectRecipes = document.querySelector('.filteroptions--recipes');
    const tagRecipes = document.querySelector('.filteroptions--recipes');
    const tagcontent = document.querySelector('.tagcontent');

    datas.then((data) => {
      const wholeComponents = [];

      data.recipes.forEach((recettes) => {
        recettes.ingredients.forEach((ingredient) => {
          wholeComponents.push(ingredient.ingredient);
        });
      });

      const sortedComponents = [...new Set(wholeComponents)];
      const arrayTags = sortedComponents;
      this.displayComponents(selectRecipes, sortedComponents);

      tagRecipes.addEventListener('change', (e) => {
        if (e.target.nodeName === 'SELECT') {
          const tag = document.createElement('span');
          const cross = document.createElement('img');
          tagcontent.appendChild(tag);
          tag.innerText = e.target.value;
          tag.id = e.target.value;
          tag.classList.add('tagcontent--recipes');
          tag.classList.add('margin');
          tag.appendChild(cross);
          cross.src = 'cross.svg';
          cross.classList.add('cross');
          cross.classList.add('ingredients');

          const i = sortedComponents.indexOf(e.target.value);
          arrayTags.splice(i, 1);

          selectRecipes.innerHTML = `
                        <option value ="Ingrédients">Ingrédients</option>
                    `;
          this.displayComponents(selectRecipes, arrayTags);
        }
      });

      const removeTags = document.querySelector('.tagcontent');

      removeTags.addEventListener('click', (e) => {
        if (e.target.className === 'cross ingredients') {
          const id = document.getElementById(e.path[1].innerText);
          removeTags.removeChild(id);
          arrayTags.push(e.path[1].innerText);
          selectRecipes.innerHTML = '';
          selectRecipes.innerHTML = `
                        <option value ="Ingrédients">Ingrédients</option>
                    `;
          this.displayComponents(selectRecipes, arrayTags);
        }
      });
    });
  }

  getDevices() {
    const datas = this.ajax.fetchData();
    const selectDevices = document.querySelector('.filteroptions--device ');
    const tagDevices = document.querySelector('.filteroptions--device');
    const tagcontent = document.querySelector('.tagcontent');

    datas.then((data) => {
      const wholeDevices = [];

      data.recipes.forEach((devices) => {
        wholeDevices.push(devices.appliance);
      });

      const sortedDevices = [...new Set(wholeDevices)];
      const arrayTags = sortedDevices;
      this.displayComponents(selectDevices, sortedDevices);

      tagDevices.addEventListener('change', (e) => {
        if (e.target.nodeName === 'SELECT') {
          const tag = document.createElement('span');
          const cross = document.createElement('img');
          tagcontent.appendChild(tag);
          tag.innerText = e.target.value;
          tag.id = e.target.value;
          tag.classList.add('tagcontent--devices');
          tag.classList.add('margin');
          tag.appendChild(cross);
          cross.src = 'cross.svg';
          cross.classList.add('cross');
          cross.classList.add('ingredients');

          const i = sortedDevices.indexOf(e.target.value);
          arrayTags.splice(i, 1);

          selectDevices.innerHTML = `
                        <option value ="Appareil">Appareil</option>
                    `;
          this.displayComponents(selectDevices, arrayTags);
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
          this.displayComponents(selectDevices, arrayTags);
        }
      });
    });
  }

  getUstensils() {
    const datas = this.ajax.fetchData();
    const selectUstensils = document.querySelector(
      '.filteroptions--ustensils '
    );
    const tagUstensils = document.querySelector('.filteroptions--ustensils');
    const tagcontent = document.querySelector('.tagcontent');

    datas.then((data) => {
      const wholeUstensils = [];

      data.recipes.forEach((ustensils) => {
        ustensils.ustensils.forEach((ust) => {
          wholeUstensils.push(ust);
        });
      });

      const sortedUstensils = [...new Set(wholeUstensils)];
      const arrayTags = sortedUstensils;
      this.displayComponents(selectUstensils, sortedUstensils);

      tagUstensils.addEventListener('change', (e) => {
        if (e.target.nodeName === 'SELECT') {
          const tag = document.createElement('span');
          const cross = document.createElement('img');
          tagcontent.appendChild(tag);
          tag.innerText = e.target.value;
          tag.id = e.target.value;
          tag.classList.add('tagcontent--ustensils');
          tag.classList.add('margin');
          tag.appendChild(cross);
          cross.src = 'cross.svg';
          cross.classList.add('cross');
          cross.classList.add('ingredients');

          const i = sortedUstensils.indexOf(e.target.value);
          arrayTags.splice(i, 1);

          selectUstensils.innerHTML = `
                        <option value ="Appareil">Appareil</option>
                    `;
          this.displayComponents(selectUstensils, arrayTags);
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
          this.displayComponents(selectUstensils, arrayTags);
        }
      });
    });
  }

  displayComponents(type, arrayCompo) {
    arrayCompo.forEach((comp) => {
      const options = document.createElement('option');
      type.appendChild(options);
      options.value = `${comp}`;
      options.innerText = `${comp}`;
    });
  }

  // displayTags() {
  //     const tagRecipes = document.querySelector(".filteroptions--recipes");
  //     const tagDevices = document.querySelector(".filteroptions--device");
  //     const tagUstensils = document.querySelector(".filteroptions--ustensils");
  //     const tagcontent = document.querySelector(".tagcontent");

  //     tagRecipes.addEventListener('change', (e) => {
  //         if(e.target.nodeName === 'SELECT') {
  //             const tag = document.createElement("span");
  //             const cross = document.createElement("img");
  //             tagcontent.appendChild(tag);
  //             tag.innerText = e.target.value;
  //             tag.classList.add("tagcontent--recipes");
  //             tag.classList.add("margin");
  //             tag.appendChild(cross);
  //             cross.src = "cross.svg";
  //             console.log(tagRecipes);
  //         }
  //     })

  //     tagDevices.addEventListener('change', (e) => {
  //         if(e.target.nodeName === 'SELECT') {
  //             const tag = document.createElement("span");
  //             const cross = document.createElement("img");
  //             tagcontent.appendChild(tag);
  //             tag.innerText = e.target.value;
  //             tag.classList.add("tagcontent--devices");
  //             tag.classList.add("margin");
  //             tag.appendChild(cross);
  //             cross.src = "cross.svg";
  //         }
  //     })

  //     tagUstensils.addEventListener('change', (e) => {
  //         if(e.target.nodeName === 'SELECT') {
  //             const tag = document.createElement("span");
  //             const cross = document.createElement("img");
  //             tagcontent.appendChild(tag);
  //             tag.innerText = e.target.value;
  //             tag.classList.add("tagcontent--ustensils");
  //             tag.classList.add("margin");
  //             tag.appendChild(cross);
  //             cross.src = "cross.svg";
  //         }
  //     })
  // }
}

const indexPage = new IndexPage(new View(), new Ajax('./data/recipes.json'));
indexPage.run();
