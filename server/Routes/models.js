const express = require("express");
const router = express.Router();
const multer = require("multer");
const Model = require("../models/Model");
const path = require("path");
const fs = require("fs");
const sequelize = require("../sequelize");

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /obj|stl|jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    // Known MIME types for .stl files
    const knownStlMimeTypes = [
      "application/sla",
      "model/stl",
      "application/vnd.ms-pki.stl",
      "application/octet-stream",
    ];

    const mimetypes = [
      ...knownStlMimeTypes,
      "text/plain", // .obj files
      "image/jpeg",
      "image/png",
    ];

    const mimetype = mimetypes.includes(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(
        new Error("Only .obj, .stl, .jpeg, .jpg, and .png files are allowed!")
      );
    }
  },
});

// Define the uploads directory
const uploadsDir = path.join(__dirname, "..", "uploads", "models");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

router.post(
  "/uploadModel",
  upload.fields([
    { name: "modelFile", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { category_id, designer_id, name, description, price, is_free, tags } =
        req.body;
      let tagsArray;
      if (Array.isArray(tags)) {
        tagsArray = tags;
      } else {
        try {
          tagsArray = JSON.parse(tags);
        } catch (e) {
          tagsArray = tags.split(",").map((tag) => tag.trim());
        }
      }
      console.log(tags)
      // Save model file and image locally
      const modelFilePath = saveFileLocally(
        req.files["modelFile"][0].buffer,
        `${name}_model_${Date.now()}.${path.extname(
          req.files["modelFile"][0].originalname
        )}`
      );
      const imagePath = saveFileLocally(
        req.files["image"][0].buffer,
        `${name}_image_${Date.now()}.${path.extname(
          req.files["image"][0].originalname
        )}`
      );

      const newModel = await Model.create({
        category_id,
        designer_id,
        name,
        description,
        price,
        is_free,
        tags: tagsArray,
        model_file: modelFilePath,
        image: imagePath,
        likes_count: 0,
        download_count: 0,
      });

      res.status(201).json(newModel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload model" });
    }
  }
);

const saveFileLocally = (buffer, filename) => {
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};



router.put(
  "/updateModel/:modelId",
  upload.fields([
    // ... same upload configuration as before
    { name: "modelFile", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { modelId } = req.params;
      const {
        category_id,
        designer_id,
        name,
        description,
        price,
        is_free,
        tags,
      } = req.body;
      let tagsArray;

      if (Array.isArray(tags)) {
        tagsArray = tags;
      } else {
        try {
          tagsArray = JSON.parse(tags);
        } catch (e) {
          tagsArray = tags.split(",").map((tag) => tag.trim());
        }
      }

      // Find the model to be updated
      const modelToUpdate = await Model.findByPk(modelId);
      if (!modelToUpdate) {
        return res.status(404).json({ error: "Model not found" });
      }

      // Update model data (including tags)
      modelToUpdate.category_id = category_id;
      modelToUpdate.designer_id = designer_id; // Assuming designer cannot change this
      modelToUpdate.name = name;
      modelToUpdate.description = description;
      modelToUpdate.price = price;
      modelToUpdate.is_free = is_free;
      modelToUpdate.tags = tagsArray;

      // Handle file updates (optional)
      if (req.files["modelFile"]) {
        // Delete existing model file if present
        const existingFilePath = modelToUpdate.model_file;
        if (existingFilePath) {
          fs.unlinkSync(existingFilePath);
        }
        // Save the new model file
        const newModelFilePath = saveFileLocally(
          req.files["modelFile"][0].buffer,
          `${name}_model_${Date.now()}.${path.extname(
            req.files["modelFile"][0].originalname
          )}`
        );
        modelToUpdate.model_file = newModelFilePath;
      }

      if (req.files["image"]) {
        // Delete existing image file if present
        const existingImagePath = modelToUpdate.image;
        if (existingImagePath) {
          fs.unlinkSync(existingImagePath);
        }
        // Save the new image file
        const newImagePath = saveFileLocally(
          req.files["image"][0].buffer,
          `${name}_image_${Date.now()}.${path.extname(
            req.files["image"][0].originalname
          )}`
        );
        modelToUpdate.image = newImagePath;
      }

      // Save the updated model
      await modelToUpdate.save();

      res.status(200).json(modelToUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update model" });
    }
  }
);


router.delete("/deleteModel/:modelId", async (req, res) => {
  const { modelId } = req.params;

  try {

    const modelToDelete = await Model.findByPk(modelId);
    if (!modelToDelete) {
      return res.status(404).json({ error: "Model not found" });
    }


    if (modelToDelete.model_file) {
      fs.unlinkSync(modelToDelete.model_file);
    }
    if (modelToDelete.image) {
      fs.unlinkSync(modelToDelete.image);
    }


    await modelToDelete.destroy();

    res.status(200).json({ message: "Model deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete model" });
  }
});



router.get("/models", async (req, res) => {
  try {
    // Query all models from the database
    const allModels = await Model.findAll();

    // Check if any models were found
    if (allModels.length === 0) {
      return res.status(404).json({ message: "No models found" });
    }

    // If models were found, return them in the response
    res.status(200).json(allModels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});


router.get("/models/:designerId", async (req, res) => {
  const { designerId } = req.params;
  console.log("swsw", designerId)

  try {
    const models = await Model.findAll({
      where: { designer_id: designerId },
    });

    res.json(models);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/model/:modelId", async (req, res) => {
  const { modelId } = req.params;

  try {
    const model = await Model.findByPk(modelId);
    if (!model) {
      return res.status(404).json({ error: "Model not found" });
    }
    res.json(model);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/modelDetail/:modelId", async (req, res) => {
  const { modelId } = req.params;

  try {
    const [results] = await sequelize.query(
      `
      SELECT 
        "Users".name AS user_name,
        "Users".location AS user_location,
        "Users".profile_pic AS profile_pic,
        "Models".name As model_name,
        "Models".description,
        "Models".price,
        "Models".is_Free,
        "Models".tags,
        "Models".image
      FROM 
        "Models"
      JOIN 
        "Designers" ON "Models".designer_id = "Designers".designer_id
      JOIN 
        "Users" ON "Designers".user_id = "Users".user_id
      WHERE 
        "Models".model_id = :modelId
      `,
      {
        replacements: { modelId },
      }
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Model not found" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
