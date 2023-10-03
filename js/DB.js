export default class {

    static setApiURL (data) {
        this.apiURL = data;
    }
    
    static async findAll() {
        const reponse = await fetch(this.apiURL + "/todos");
        return await reponse.json();
    }

    static async addOne (data) {
        const reponse = await fetch(this.apiURL + "/todos", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        return await reponse.json();
    }

    static async updateOneById (id, data) {
        const reponse = await fetch(`${this.apiURL}/todos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
    });
    return await reponse.json();
    }

    static async deleteOneById (id) {
        const reponse = await fetch(`${this.apiURL}/todos/${id}`, {
            method: 'DELETE',
    });
    return await reponse.json();    
    }
}
