const Cart = require("../model/addtocart");

const addToCart = async (req, res) => {
    try {
        const { userId, items } = req.body;
        if (
            !userId ||
            !Array.isArray(items) ||
            items.length === 0 ||
            !items[0].productId ||
            !items[0].variantId ||
            typeof items[0].quantity !== "number"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Missing or invalid required fields (userId, productId, variantId, quantity)"
            });
        }

        const productId = items[0].productId;
        const variantId = items[0].variantId;
        const quantity = items[0].quantity;

        const userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            await Cart.create({
                user: userId,
                items: [{
                    product: productId,
                    variant: variantId,
                    quantity
                }]
            });
            return res.status(200).json({
                success: true,
                message: "Your shopping cart has been created with the item",
            });
        }

        const updatedCart = await Cart.findOneAndUpdate({
            user: userId,
            "items.product": productId,
            "items.variant": variantId
        }, { $inc: { "items.$.quantity": quantity } }, { new: true });

        if (!updatedCart) {
            await Cart.findOneAndUpdate({
                user: userId
            }, {
                $push: {
                    items: { product: productId, variant: variantId, quantity }
                }
            }, { new: true });
            return res.status(200).json({ success: true, message: "New item added to your cart" });
        }

        res.status(200).json({
            success: true,
            message: "Item quantity has been updated in your cart"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update cart: " + error.message });
    }
}


const removeFromCart = async (req, res) => {
    try {
        const { userId, productId, variantId } = req.body;
        const userCart = await Cart.findOneAndUpdate({ user: userId }, {
            $pull: {
                items: {
                    product: productId,
                    variant: variantId
                }
            }
        }, { new: true });

        if (!userCart) return res.status(404).json({ success: false, message: "No cart found for this user" });

        if (userCart.items.length === 0) {
            await Cart.deleteOne({ user: userId });
            return res.status(200).json({
                success: true,
                message: "Item removed and your cart is now empty"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Item has been removed from your cart"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to remove item: " + error.message });
    }
}

const updateCartQuantity = async (req, res) => {
    try {
        const { userId, productId, variantId, quantity } = req.body;
        const userCart = await Cart.findOne({ user: userId });
        if (!userCart) return res.status(404).json({ success: false, message: "No cart exists for this user" });

        const cartItem = userCart.items.find((item) =>
            item.product.toString() === productId &&
            item.variant.toString() === variantId
        );

        if (!cartItem) return res.status(404).json({ success: false, message: "The specified item was not found in your cart" });

        const updatedQuantity = cartItem.quantity + quantity;

        await Cart.findOneAndUpdate({
            user: userId,
            "items.product": productId,
            "items.variant": variantId
        }, {
            $set: { "items.$.quantity": updatedQuantity }
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Cart quantity has been updated"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update quantity: " + error.message });
    }
}

const getCart = async (req, res) => {
    try {
        const userCart = await Cart.findOne({ user: req.params.userId })
            .populate('user')
            .populate('items.product', 'productName category sku stock variants');

        if (!userCart) return res.status(404).json({ success: false, message: "You don't have any items in your cart yet" });

        const formattedCart = {
            _id: userCart._id,
            userName: userCart.user.name,
            email: userCart.user.email,
            phone: userCart.user.phone,
            items: userCart.items.map((item) => ({
                productName: item.product.productName,
                category: item.product.category,
                stock: item.product.stock,
                variant: item.product.variants.find((v) => v._id.toString() === item.variant.toString())
            })),
            createdAt: userCart.createdAt,
            updatedAt: userCart.updatedAt
        };

        return res.status(200).json({
            success: true,
            data: formattedCart,
            message: "Your cart details"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to retrieve cart: " + error.message });
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCart
};