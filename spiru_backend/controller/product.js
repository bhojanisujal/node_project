const fs = require("fs");
const path = require("path");
const Product = require("../model/product");

const createProduct = async (req, res) => {
  try {
    const {
      productName,
      slug,
      sku,
      stock,
      type,
      isfeatured,
      isActive,
      category,
      benefits,
      certifications,
      variants,
    } = req.body;

    // Log uploaded files for debugging
    console.log("Uploaded files:", req.files.map(f => ({ fieldname: f.fieldname, filename: f.filename })));

    // Parse & validate benefits
    const parsedBenefits = benefits ? JSON.parse(benefits) : [];
    const validatedBenefits = parsedBenefits.map((benefit, index) => {
      const iconFile = req.files.find((file) => file.fieldname === `benefit_icon_${index}`);
      return {
        icon: iconFile ? `public/product/${iconFile.filename}` : benefit.icon || "",
        description: benefit.description || "",
      };
    });

    // Parse certifications & variants
    const parsedCertifications = certifications ? JSON.parse(certifications) : {};
    const parsedVariants = variants ? JSON.parse(variants) : [];

    // Validate variants
    const validatedVariants = parsedVariants.map((variant, index) => {
      if (!variant.originalPrice || isNaN(variant.originalPrice)) {
        console.warn(`Variant ${index} missing or invalid originalPrice, setting to 0`);
        variant.originalPrice = 0;
      }
      if (variant.discountPrice && isNaN(variant.discountPrice)) {
        console.warn(`Variant ${index} invalid discountPrice, setting to null`);
        variant.discountPrice = null;
      }
      return {
        ...variant,
        originalPrice: Number(variant.originalPrice),
        discountPrice: variant.discountPrice ? Number(variant.discountPrice) : null,
        discountPercent: variant.discountPercent ? Number(variant.discountPercent) : 0,
      };
    });

    // Handle file uploads
    const variantImagesMap = {};
    const productVideoFiles = [];

    (req.files || []).forEach((file) => {
      if (file.fieldname.startsWith("variant_image_")) {
        const [_, index, i] = file.fieldname.match(/variant_image_(\d+)_(\d+)/) || [];
        if (index) {
          if (!variantImagesMap[index]) variantImagesMap[index] = [];
          variantImagesMap[index].push(`public/product/${file.filename}`);
        }
      } else if (file.fieldname === "productVideo") {
        productVideoFiles.push(`public/product/${file.filename}`);
      }
    });

    // Attach images to variants
    validatedVariants.forEach((variant, index) => {
      variant.productImage = variantImagesMap[index] || variant.productImage || [];
    });

    // Ensure `type` is valid ("Weight" or "Quantity")
    const validatedType = type === "weight" ? "Weight" : type === "quantity" ? "Quantity" : type;

    // Create product with validated data
    const product = await Product.create({
      productName,
      slug,
      sku,
      stock,
      type: validatedType,
      isfeatured,
      isActive,
      category,
      benefits: validatedBenefits,
      certifications: parsedCertifications,
      variants: validatedVariants,
      productVideo: productVideoFiles,
    });

    // Log created product
    console.log("Created product:", {
      _id: product._id,
      productName: product.productName,
      variants: product.variants.map(v => ({
        productImage: v.productImage,
        originalPrice: v.originalPrice,
        discountPrice: v.discountPrice,
        discountPercent: v.discountPercent,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Product Creation Failed",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    const {
      productName,
      category,
      slug,
      type,
      sku,
      stock,
      benefits,
      variants,
      certifications,
      isActive,
    } = req.body;

    // Parse & validate benefits
    const parsedBenefits = Array.isArray(benefits) ? benefits : JSON.parse(benefits || "[]");
    const validatedBenefits = parsedBenefits.map((benefit, index) => {
      const iconFile = req.files.find((file) => file.fieldname === `benefit_icon_${index}`);
      return {
        icon: iconFile ? `public/product/${iconFile.filename}` : benefit.icon || "",
        description: benefit.description || "",
      };
    });

    // Parse & validate variants
    const parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants || [];
    const validatedVariants = parsedVariants.map((variant, index) => {
      if (!variant.originalPrice || isNaN(variant.originalPrice)) {
        console.warn(`Variant ${index} missing or invalid originalPrice, setting to 0`);
        variant.originalPrice = 0;
      }
      if (variant.discountPrice && isNaN(variant.discountPrice)) {
        console.warn(`Variant ${index} invalid discountPrice, setting to null`);
        variant.discountPrice = null;
      }
      return {
        ...variant,
        originalPrice: Number(variant.originalPrice),
        discountPrice: variant.discountPrice ? Number(variant.discountPrice) : null,
        discountPercent: variant.discountPercent ? Number(variant.discountPercent) : 0,
      };
    });

    // Handle file uploads
    const variantImagesMap = {};
    const productVideoFiles = [];

    (req.files || []).forEach((file) => {
      if (file.fieldname.startsWith("variant_image_")) {
        const [_, index, i] = file.fieldname.match(/variant_image_(\d+)_(\d+)/) || [];
        if (index) {
          if (!variantImagesMap[index]) variantImagesMap[index] = [];
          variantImagesMap[index].push(`public/product/${file.filename}`);
        }
      } else if (file.fieldname === "productVideo") {
        productVideoFiles.push(`public/product/${file.filename}`);
      }
    });

    // Attach images to variants
    const finalVariants = validatedVariants.map((variant, index) => ({
      ...variant,
      productImage: [
        ...(variant.productImage || []).filter((img) => typeof img === "string"),
        ...(variantImagesMap[index] || []),
      ],
    }));

    // Delete unused files
    existingProduct.benefits.forEach((benefit) => {
      if (benefit.icon && !validatedBenefits.some((b) => b.icon === benefit.icon)) {
        const iconPath = path.join(__dirname, "..", benefit.icon);
        if (fs.existsSync(iconPath)) fs.unlinkSync(iconPath);
      }
    });

    existingProduct.variants.forEach((variant) => {
      variant.productImage.forEach((img) => {
        if (img && !finalVariants.some((v) => v.productImage.includes(img))) {
          const imagePath = path.join(__dirname, "..", img);
          if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
      });
    });

    if (productVideoFiles.length && existingProduct.productVideo) {
      const productVideos = Array.isArray(existingProduct.productVideo)
        ? existingProduct.productVideo
        : [existingProduct.productVideo];
      productVideos.forEach((video) => {
        if (video) {
          const videoPath = path.join(__dirname, "..", video);
          if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
        }
      });
    }

    const payload = {
      productName,
      category,
      slug,
      type: type === "weight" ? "Weight" : type === "quantity" ? "Quantity" : type,
      sku,
      stock,
      benefits: validatedBenefits,
      variants: finalVariants,
      productVideo: productVideoFiles.length ? productVideoFiles : existingProduct.productVideo,
      certifications: certifications ? JSON.parse(certifications) : existingProduct.certifications,
      isActive: isActive !== undefined ? isActive : existingProduct.isActive,
    };

    // Log payload for debugging
    console.log("Update payload:", {
      productName,
      variants: finalVariants.map(v => ({
        productImage: v.productImage,
        originalPrice: v.originalPrice,
        discountPrice: v.discountPrice,
        discountPercent: v.discountPercent,
      })),
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: payload },
      { new: true }
    );

    // Log updated product
    console.log("Updated product:", {
      _id: updatedProduct._id,
      productName: updatedProduct.productName,
      variants: updatedProduct.variants.map(v => ({
        productImage: v.productImage,
        originalPrice: v.originalPrice,
        discountPrice: v.discountPrice,
        discountPercent: v.discountPercent,
      })),
    });

    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully!",
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find().populate("category");
    
    // Return raw paths (frontend will handle URL construction)
    const transformedProducts = allProducts.map(product => ({
      ...product._doc,
      benefits: product.benefits.map(benefit => ({
        ...benefit,
        icon: benefit.icon || "",
      })),
      variants: product.variants.map(variant => ({
        ...variant,
        productImage: variant.productImage || [],
        originalPrice: Number(variant.originalPrice) || 0,
        discountPrice: variant.discountPrice ? Number(variant.discountPrice) : null,
        discountPercent: Number(variant.discountPercent) || 0,
      })),
      productVideo: product.productVideo || [],
    }));

    // Log transformed products
    console.log("Transformed products:", transformedProducts.map(p => ({
      _id: p._id,
      productName: p.productName,
      variants: p.variants.map(v => ({
        productImage: v.productImage,
        originalPrice: v.originalPrice,
        discountPrice: v.discountPrice,
        discountPercent: v.discountPercent,
      })),
    })));

    return res.status(200).json({
      success: true,
      data: transformedProducts,
      message: "All products retrieved successfully!",
    });
  } catch (error) {
    console.error("Get All Products Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    // Return raw paths
    const transformedProduct = {
      ...product._doc,
      benefits: product.benefits.map(benefit => ({
        ...benefit,
        icon: benefit.icon || "",
      })),
      variants: product.variants.map(variant => ({
        ...variant,
        productImage: variant.productImage || [],
        originalPrice: Number(variant.originalPrice) || 0,
        discountPrice: variant.discountPrice ? Number(variant.discountPrice) : null,
        discountPercent: Number(variant.discountPercent) || 0,
      })),
      productVideo: product.productVideo || [],
    };

    // Log transformed product
    console.log("Transformed product:", {
      _id: transformedProduct._id,
      productName: transformedProduct.productName,
      variants: transformedProduct.variants.map(v => ({
        productImage: v.productImage,
        originalPrice: v.originalPrice,
        discountPrice: v.discountPrice,
        discountPercent: v.discountPercent,
      })),
    });

    return res.status(200).json({
      success: true,
      data: transformedProduct,
      message: "Product retrieved successfully!",
    });
  } catch (error) {
    console.error("Get Product Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    existingProduct.benefits.forEach((benefit) => {
      if (benefit.icon) {
        const iconPath = path.join(__dirname, "..", benefit.icon);
        if (fs.existsSync(iconPath)) fs.unlinkSync(iconPath);
      }
    });

    existingProduct.variants.forEach((variant) => {
      variant.productImage.forEach((img) => {
        if (img) {
          const imagePath = path.join(__dirname, "..", img);
          if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
      });
    });

    const productVideos = Array.isArray(existingProduct.productVideo)
      ? existingProduct.productVideo
      : [existingProduct.productVideo];

    productVideos.forEach((video) => {
      if (video) {
        const videoPath = path.join(__dirname, "..", video);
        if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
      }
    });

    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};


// Massage Cream