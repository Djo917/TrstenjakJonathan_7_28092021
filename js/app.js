import { Ajax } from './ajax.class.js';


class IndexPage {
    constructor(ajax) {
        this.ajax = ajax;
    }

    run() {
        this.getRecipes();
        this.getDevices();
        this.getUstensils();
    }

    getRecipes() {
        const datas = this.ajax.fetchData();
        const selectRecipes = document.querySelector(".filteroptions--recipes");
        
        datas.then(data => {
            let wholeComponents = []
            
            data.recipes.forEach(recettes => {
                recettes.ingredients.forEach(ingredient => {
                    wholeComponents.push(ingredient.ingredient);  
                })
            })

            let sortedComponents = [... new Set(wholeComponents)];

            sortedComponents.forEach(compo => {
                this.displayComponents(selectRecipes, compo);
            })
        })
    }

    getDevices() {
        const datas = this.ajax.fetchData();
        const selectDevices = document.querySelector(".filteroptions--device ");

        datas.then(data => {
            let wholeDevices = [];

            data.recipes.forEach(devices => {
                wholeDevices.push(devices.appliance);  
            })

            let sortedDevices = [...new Set(wholeDevices)];
            
            sortedDevices.forEach(compo => {
                this.displayComponents(selectDevices, compo);
            })
        })
    }

    getUstensils() {
        const datas = this.ajax.fetchData();
        const selectUstensils = document.querySelector(".filteroptions--ustensils ");

        datas.then(data => {
            let wholeUstensils = [];

            data.recipes.forEach(ustensils => {
                ustensils.ustensils.forEach(ust => {
                    wholeUstensils.push(ust);
                })
                
            })

            let sortedUstensils = [...new Set(wholeUstensils)];
            
            sortedUstensils.forEach(compo => {
                this.displayComponents(selectUstensils, compo);
            })
        })
    }

    displayComponents(type, compo) {
        const options = document.createElement("option");

        type.appendChild(options);
        options.value = `${compo}`;
        options.innerText = `${compo}`;
    }
}

const indexPage = new IndexPage(new Ajax('./data/recipes.json'));
indexPage.run();