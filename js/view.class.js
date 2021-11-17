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

  renderRecipes(recipeslist) {
    const idSection = document.getElementById('sectionrecipes');

    if (recipeslist.recipes) {
      recipeslist.recipes.forEach(() => {
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
      });

      const articleRoot = document.querySelectorAll(
        '.contentreceipts__cardsrecipe'
      );

      articleRoot.forEach((a) => {
        this.customElement('div', 'contentreceipts__titleandtime', a);
      });

      const div = document.querySelectorAll('.contentreceipts__titleandtime');
      div.forEach((d) => {
        this.customElement('h2', 'contentreceipts__titleandtime--title', d);
      });

      const wholeTitle = document.querySelectorAll(
        '.contentreceipts__titleandtime--title'
      );

      wholeTitle.forEach((t) => {
        t.innerText = `${recipeslist.recipes[0].name}`;
      });

      // const divRoot = document.querySelectorAll(
      //   '.contentreceipts__titleandtime'
      // );

      // divRoot.forEach((d) => {
      //   const h2 = this.customElement(
      //     'h2',
      //     'contentreceipts__titleandtime--title',
      //     d
      //   );
      // });
    }
  }
}
export default View;
