export class Course {
    constructor(id, name, body) {
        this.id = id;
        this.name = name;
        this.body = body;
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('content-mid-wrapper');

        const title = document.createElement('h3');
        title.textContent = this.name;

        const body = document.createElement('p');
        body.textContent = this.body;

        container.appendChild(title);
        container.appendChild(body);
        return container;
    }
}