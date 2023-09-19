export default class {
    static setApiURL (data) {
        this.apiURL = data;
        console.log(this.apiURL);
    }
    
    static async findAll(){
        const response = await fetch(this.apiURL + '/todos');
        return await response.json();
    }
}