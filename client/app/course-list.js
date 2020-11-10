export class List {
    list = [];
    item = null;
    url = null;

    constructor(item, url) {
        this.item = item;
        this.url = url;
        this.populate()
    }

    async populate() {
        const Item = this.item;
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            console.log('data---', data)
            data.forEach(el => {
                const name = el.name;
                const id = el.id;
                const body = el.body;
                const item = new Item(id, name, body);
                this.list.push(item)

            })
            this.render()

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        this.list.forEach(item => {
            const renderedCourse = item.render();
            document.querySelector('div.content-mid').appendChild(renderedCourse)
        });

    }
}