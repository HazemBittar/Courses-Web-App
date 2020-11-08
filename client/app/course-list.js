export class List {
    list = [];
    Item = null;
    url = null;

    constructor(item, url) {
        this.item = item;
        this.url = url;
    }

    async populate() {
        try {
            const response = await fetch(this.url);
            const data = response.json();
            data.forEach(el => {
                const name = el.name;
                const id = el.id;
                const body = el.body;
                const item = new Item(id, name, body);
                this.list.push(item)
            })

        } catch (err) {
            console.log(err)
        }
    }
}