import { productManager } from "../dao/managersDB/product.managers.js";
import { Router } from "express";

const router = Router();

// Ruta para agregar un producto (POST)
router.post("/admin/add-product", async (req, res) => {
    try {
        // Lógica para agregar un producto a la base de datos
        const { product_name, product_price, product_description } = req.body;

        // Validación de campos obligatorios
        if (!product_name || !product_price || !product_description) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Crear el producto
        const newProduct = await productManager.createOne({
            product_name,
            product_price,
            product_description,
        });

        // Modificación aquí: Renderizar la vista con el mensaje
        return res.render("admin", { Message: 'Producto Agregado', newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno al agregar producto" });
    }
});

// Ruta para actualizar un producto por su ID (PUT)
router.put("/update-product/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const { newProductName, newProductPrice, newProductDescription } = req.body;

        // Validación de ID
        if (!productId || !newProductName) {
            return res.status(400).json({ message: "Se requiere un ID de producto y un nuevo nombre" });
        }

        // Lógica para actualizar un producto por su ID
        const updatedProduct = await productManager.updateProduct(productId, {
            product_name: newProductName,
            product_price: newProductPrice,
            product_description: newProductDescription,
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({ message: "Producto actualizado exitosamente", product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno al actualizar producto" });
    }
});


// Ruta para actualizar un producto por su ID (POST)
router.post("/update-product", async (req, res) => {
    try {
        const { productId, productIdToUpdate, newProductName, newProductPrice, newProductDescription } = req.body;

        // Validación de ID
        if (!productIdToUpdate || !newProductName) {
            return res.status(400).json({ message: "Se requiere un ID de producto a actualizar y un nuevo nombre" });
        }

        // Lógica para actualizar un producto por su ID
        const updatedProduct = await productManager.updateProduct(productIdToUpdate, {
            product_name: newProductName,
            product_price: newProductPrice,
            product_description: newProductDescription,
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({ message: "Producto actualizado exitosamente", product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno al actualizar producto" });
    }
});


// Ruta para eliminar un producto por su ID (POST)
router.post("/delete-product", async (req, res) => {
    try {
        const { productId } = req.body;

        // Validación de ID
        if (!productId) {
            return res.status(400).json({ message: "Se requiere un ID de producto válido" });
        }

        // Lógica para eliminar un producto por su ID
        const deletedProduct = await productManager.deleteProduct(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({ message: "Producto eliminado exitosamente", product: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno al eliminar producto" });
    }
});

export default router;
