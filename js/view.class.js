export class View {
  customElement(elementName, className, elementRoot) {
    const newElement = document.createElement(elementName);
    newElement.classList.add(className);
    elementRoot.appendChild(newElement);
    return newElement;
  }

  customPic(source, alt) {
    const pic = this.customElement(
      'img',
      'contentreceipts__picture',
      'article'
    );

    pic.src = source;
    pic.alt = alt;

    return pic;
  }

  renderRecipes(recipeslist) {
    console.log(recipeslist);
    recipeslist.recipes.forEach((recipes) => {
      const idSection = document.getElementById('sectionrecipes');

      const article = this.customElement(
        'article',
        'contentreceipts__cardsrecipe',
        idSection
      );

      const pic = this.customElement(
        'img',
        'contentreceipts__picture',
        article
      );

      // const pic = this.customPic(
      //   'recipe.jpg',
      //   'photo générie de la recette finit'
      // );
      const pic2 = document.createElement('img');
      const div = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      const div4 = document.createElement('div');
      const div5 = document.createElement('div');
      const h2 = document.createElement('h2');
      const span = document.createElement('span');
      const p = document.createElement('p');

      pic.src = 'recipe.jpg';
      pic.alt = 'photo générique de la recette finit';

      article.appendChild(div);
      div.classList.add('contentreceipts__titleandtime');
      div.appendChild(h2);
      h2.classList.add('contentreceipts__titleandtime--title');
      h2.innerText = `${recipes.name}`;

      div.appendChild(div2);
      div2.classList.add('contentreceipts__timeprep');
      div2.appendChild(pic2);
      pic2.src = 'timer.svg';
      pic2.alt = "image d'un chronomètre";
      pic2.classList.add('contentreceipts__titleandtime--time');
      div2.appendChild(span);
      span.innerText = `${recipes.time}min`;

      article.appendChild(div3);
      div3.classList.add('cardsrecipe__recipes');
      div3.appendChild(div4);
      div4.classList.add('cardsrecipe__components');

      recipes.ingredients.forEach((ingredient) => {
        const pRecipe = document.createElement('p');
        const spanRecipe = document.createElement('span');

        div4.appendChild(pRecipe);
        pRecipe.classList.add('cardsrecipe__recipes--text');

        pRecipe.appendChild(spanRecipe);
        spanRecipe.classList.add('cardsrecipe__recipes--name');
        spanRecipe.innerText = `${ingredient.ingredient} : `;

        if (ingredient.quantity) {
          pRecipe.innerText += ` ${ingredient.quantity}`;
        }
        if (ingredient.unit) {
          pRecipe.innerText += ` ${ingredient.unit}`;
        }
      });

      div3.appendChild(div5);
      div5.classList.add('cardsrecipe__explain');

      div5.appendChild(p);
      p.classList.add('cardsrecipe_recipes--text');
      p.innerText = `${recipes.description}`;
    });
  }
}
export default View;
