// import { Ajax } from './ajax.class.js';
class Ajax {
    constructor(url) {
        this.url = url;
    }
    
    async fetchData() {
        const response = await fetch(this.url);
        return await response.json();
    }
}

new Ajax('./data/recipes.js');

const datas = this.ajax.fetchData();

datas.then(data => {
    console.log(data)
})