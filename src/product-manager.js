const fs = require('fs')

class ProductManager {

    constructor(path) {
        this.path = path
    }

    writeFile = async (title, description, price, thumbnail, code, stock) => {

        const newProduct = {
            id: 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        await fs.promises.writeFile(this.path, JSON.stringify([newProduct], null, 2))
    }

    getProducts = async (limit) => {

        if (fs.existsSync(this.path)) {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(content)

            if (!content){
                return console.log('No hay productos'); 
            } 
            console.log('Prductos:', products);

            return products.slice(0,limit)
        } else {
            console.log('El archivo no existe');
        }
    }

    getProductById = async (id) => {

        const content = await fs.promises.readFile(this.path, 'utf-8');
        
        if (!content) {
            return console.log('no hay productos');
        }

        const products = JSON.parse(content);

        const idCheck = products.find(el => el.id == id);

        if (idCheck) {
            console.log(`This is the object with id ${id}`, idCheck)
            return idCheck
        } else {
            console.log(`El id: ${id} no existe`);
            return `El id: ${id} no existe`
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log('Todos los campos son obligatorios');
        }

        if (fs.existsSync(this.path)) {

            const content = await fs.promises.readFile(this.path, 'utf-8');

            if (!content) {
                this.writeFile(title, description, price, thumbnail, code, stock)
                return
            }

            const products = JSON.parse(content);

            const codeCheck = products.find(el => el.code == code);
            if (codeCheck) return console.log(`El codigo: ${code} cob nombre ${title} ya existe, cambiarlo por uno no existente`);

            products.push({
                id: products[products.length - 1].id + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            });

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

            console.log('Se ha agregado el siguiente producto a la lista: ', products[products.length - 1] );

        } else {
            this.writeFile(title, description, price, thumbnail, code, stock);
        }
    }

    updateProduct = async (id, updateValues) => {

        const content = await fs.promises.readFile(this.path, 'utf-8');
        
        if (!content) {
            return console.log('no hay productos');
        }

        const products = JSON.parse(content);

        const changingObj = products.find(el => el.id == id)

        if (changingObj) {
            const updatedObj = {...changingObj, ...updateValues}
            products.splice(id - 1,1,updatedObj);
            console.log(`El producto con id ${id} ha cambiado`);
        } else {
            console.log(`El id: ${id} no existe`);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
    }

    deleteProduct = async (id) => {

        const content = await fs.promises.readFile(this.path, 'utf-8');
        
        if (!content) {
            return console.log('no hay productos');
        }

        const products = JSON.parse(content);

        const deletedObj = products.find(el => el.id == id)

        if (deletedObj) {
            products.splice(id - 1,1);
            console.log(`El producto con id: ${id} se ha eliminado`);
        } else {
            console.log(`El id: ${id} no existe`);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
    }

}

module.exports = ProductManager