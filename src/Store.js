import MicroEvent from './helpers/microevent';

/* Interface for local storage*/
class Store {

    static get KEY() {
        return "todo";
    }

    constructor() {
        if (typeof window["localStorage"] === "undefined") {
            throw new Error("No local storage found in current browser!");
        }
        MicroEvent.mixin(this);
    }

    /**
     * @returns {string}
     */
    getId() {
        return Math.random().toString(36).substring(2);
    }

    /**
     * @returns {{id: string, title: string, description: string, priority: string}}
     */
    getEmptyItem() {
        return {
            id: this.getId(),
            title: "",
            description: "",
            priority: "regular",
        }
    }

    /**
     * @returns {Array}
     */
    getItems() {
        let items;
        try {
            items = JSON.parse(window.localStorage.getItem(Store.KEY));
        } catch (e) {
            items = null;
        }

        if (!items) {
            items = [];
        }

        // need to convert string to date
        items.map((element) => {
            if (typeof element['dueDate'] !== 'undefined' && element.dueDate) {
                element.dueDate = new Date(element.dueDate);
            }
            if (typeof element['completeDate'] !== 'undefined' && element.completeDate) {
                element.completeDate = new Date(element.completeDate);
            }
            return element;
        });
        return items;
    }

    /**
     * @param {Array} items
     */
    setItems(items) {
        if (!Array.isArray(items)) {
            throw new Error("Parameter should be an array!");
        }
        window.localStorage.setItem(Store.KEY, JSON.stringify(items));
        this.trigger('storeUpdate');
    }

    /**
     * @param {Number} id
     * @returns {Object}
     */
    getItem(id) {
        return this.getItems().find((element) => element.id === id);
    }

    /**
     * @param {Object} item
     */
    setItem(item) {
        const items = this.getItems();
        let foundIndex;

        for (const [index, element] of items.entries()) {
            if (element.id === item.id) {
                foundIndex = index;
                break;
            }
        }

        if (typeof foundIndex !== "undefined") {
            items[foundIndex] = item;
        } else {
            items.push(item);
        }
        this.setItems(items);
    }

    deleteItem(id) {
        this.setItems(
            this.getItems().filter((element) => element.id !== id)
        );
    }
}

const store = new Store();

export {store};