export default class {
    // Méthode pour définir l'URL de l'API
    static setApiURL(data) {
        this.apiURL = data;
    }

    // Méthode pour récupérer toutes les données de l'API
    static async findAll() {
        // Effectue une requête GET à l'URL de l'API suivie de "/todos"
        const response = await fetch(this.apiURL + "/todos");

        // Renvoie la réponse au format JSON
        return await response.json();
    }

    // Méthode pour ajouter une nouvelle donnée à l'API
    static async addOne(data) {
        // Effectue une requête POST à l'URL de l'API suivie de "/todos"
        const response = await fetch(this.apiURL + "/todos", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        // Renvoie la réponse au format JSON
        return await response.json();
    }

    // Méthode pour mettre à jour une donnée existante dans l'API en utilisant son ID
    static async updateOneById(id, data) {
        // Effectue une requête PUT à l'URL de l'API suivie de "/todos/{id}"
        const response = await fetch(`${this.apiURL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Renvoie la réponse au format JSON
        return await response.json();
    }

    // Méthode pour supprimer une donnée de l'API en utilisant son ID
    static async deleteOneById(id) {
        // Effectue une requête DELETE à l'URL de l'API suivie de "/todos/{id}"
        const response = await fetch(`${this.apiURL}/todos/${id}`, {
            method: 'DELETE',
        });

        // Renvoie la réponse au format JSON
        return await response.json();
    }
}
