export class View {
  customElement(elementName, className, elementRoot) {
    const newElement = document.createElement(elementName);
    newElement.classList.add(className);
    elementRoot.appendChild(newElement);
    return newElement;
  }

  customPic(html, source, alt) {
    html.src = source;
    html.alt = alt;

    return html;
  }

  removeTags(tagElt, tagContent) {
    tagContent.removeChild(tagElt);
  }

  createTags(event, tagContent) {
    const tag = this.customElement('span', 'tagcontent--recipes', tagContent);

    tag.innerText = event.target.value;
    tag.id = event.target.value;
    tag.classList.add('margin');
    const cross = this.customElement('img', 'cross', tag);
    this.customPic(cross, 'cross.svg', 'icone de croix');
    cross.classList.add('ingredients');

    return event.target.value;
  }

  renderRecipes(recipeslist) {
    const idSection = document.getElementById('sectionrecipes');
    idSection.innerHTML = '';

    if (recipeslist) {
      recipeslist.forEach((recipe) => {
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
        this.customPic(
          pic,
          'recipe.jpg',
          'photo générique de la recette finit'
        );

        const div = this.customElement(
          'div',
          'contentreceipts__titleandtime',
          article
        );

        const h2 = this.customElement(
          'h2',
          'contentreceipts__titleandtime--title',
          div
        );
        h2.innerText = `${recipe.name}`;

        const div2 = this.customElement(
          'div',
          'contentreceipts__timeprep',
          div
        );

        const picTimer = this.customElement(
          'img',
          'contentreceipts__titleandtime--time',
          div2
        );
        this.customPic(picTimer, 'timer.svg', 'image dun chronomètre');

        const span = this.customElement('span', 'span', div2);
        span.innerText = `${recipe.time}min`;

        const div3 = this.customElement('div', 'cardsrecipe__recipes', article);
        const div4 = this.customElement('div', 'cardsrecipe__components', div3);

        recipe.ingredients.forEach((ingredient) => {
          const pRecipe = this.customElement(
            'p',
            'cardsrecipe__recipes--text',
            div4
          );
          const spanRecipe = this.customElement(
            'span',
            'cardsrecipe__recipes--name',
            pRecipe
          );

          spanRecipe.innerText = `${ingredient.ingredient} : `;

          if (ingredient.quantity) {
            pRecipe.innerText += ` ${ingredient.quantity}`;
          }
          if (ingredient.unit) {
            pRecipe.innerText += ` ${ingredient.unit}`;
          }
        });

        const div5 = this.customElement('div', 'cardsrecipe__explain', div3);
        const p = this.customElement('p', 'cardsrecipe_recipes--text', div5);
        p.innerText = `${recipe.description}`;
      });
    }
  }

  displayComponents(type, arrayCompo) {
    const filtered = Array.from(new Set(arrayCompo));
    filtered.sort();
    type.innerHTML = '';

    filtered.forEach((comp) => {
      const options = document.createElement('option');
      type.appendChild(options);
      options.value = `${comp}`;
      options.innerText = `${comp}`;
    });
  }
}
export default View;
