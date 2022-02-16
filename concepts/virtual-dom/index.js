function myDOM() {
    this.elements = [];
    
    function Node(tagName){
        this.tagName = tagName;
        this.chidren = [];
    }

    myDOM.prototype.createElement = (tagName) => {
        this.elements.push(new Node(tagName));
        return new Node(tagName);
    }

    myDOM.prototype.querySelector = (selector) => {
        if(selector.includes('#')){
            const id = selector.split('#')[1];
            return this.elements.find(element => element.id === id);
        }

        else if(selector.includes('.')){
            const className = selector.split('.')[1];
            return this.elements.find(element => element.className === className);
        }
        
        return this.elements.find(element => element.tagName === selector);
    }

    Node.prototype.appendChild = (child) => {
       if(!(child instanceof Node)){
            throw new Error('Child must be an instance of Node');
       }

        this.chidren.push(child);
    }

    Node.prototype.removeChild = (child) => {
        this.chidren = this.chidren.filter(element => element !== child);
    }

    Node.prototype.getElementById = (id) => {
        return this.chidren.find(element => element.id === id);
    }

    Node.prototype.getElementsByTagName = (tagName) => {
        return this.chidren.filter(element => element.tagName === tagName);
    }

    Node.prototype.innerHTML = (html) => {
        this.html = html;
    }
};