const Category = require("../model/category");

const categorycreate = async (req, res) => {
  const { Categoryicone, Categoryimage } = req.files;
  // console.log("Saved Categoryicone path:", Categoryicone[0].path);
  // console.log("Saved Categoryimage path:", Categoryimage[0].path);
  try {
    await Category.create({
      ...req.body,
      Categoryimage: Categoryimage[0].path,
      Categoryicone: Categoryicone[0].path,
    });
    return res
      .status(201)
      .json({ success: true, message: "Category created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
async function categoryupdate(req, res) {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.files?.Categoryimage?.[0]) {
      updateData.Categoryimage = req.files.Categoryimage[0].path;
    }

    if (req.files?.Categoryicone?.[0]) {
      updateData.Categoryicone = req.files.Categoryicone[0].path;
    }

    await Category.updateOne({ _id: req.params._id }, updateData);

    return res.status(200).json({ success: true, message: "category update successfuly..." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function categorygetall(req, res) {

    try {
        const category = await Category.find();

        return res.status(200).json({ success: true, data: category, message: "category update successfuly..." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
async function categoryget(req, res) {

    try {
        const category = await Category.findOne({ _id: req.params._id });

        return res.status(200).json({ success: true, data: category, message: "category update successfuly..." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
async function categorydelete(req, res) {

    try {
        const category = await Category.deleteOne({ _id: req.params._id });

        return res.status(200).json({ success: true, data: category, message: "category update successfuly..." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


module.exports = {
    categorycreate,categoryupdate,categorygetall,categoryget,categorydelete
}