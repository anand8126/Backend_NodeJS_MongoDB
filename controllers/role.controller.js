import Role from "../models/Role.js";

export const createRole = async (req, res, next) => {
  try {
    if (req.body.role && req.body.role !== "") {
      const newRole = new Role(req.body);
      await newRole.save();
      return res.send("Role Created!");
    } else {
      return res.status(400).send("Its bad request!");
    }
  } catch (error) {
    return res.status(500).send("internal Server Error!");
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findById({ _id: req.params.id });

    if (role) {
      const newData = await Role.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).send("Role is updated!");
    } else {
      res.status(404).send("Role not found! ");
    }
  } catch (error) {
    res.status(500).send("Internal Server error");
  }
};

export const getRole = async (req, res, next) => {
  try {
    const roles = await Role.find({});

    return res.status(200).send(roles);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
};

export const deleteRole=async(req, res, next) =>{
    try{
        const roleId=req.params.id;

        const role=await Role.findById({_id:roleId});


        if(role){
            await Role.findByIdAndDelete(roleId);
            res.status(200).send("Role Deleted!")
        }
        else{
            res.status(404).send("Role not Found!");
        }
    }
    catch(error){
        res.status(500).send("Internal Server Error!")
    }
}
