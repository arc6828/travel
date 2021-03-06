const Position = require('../models/position');
const mongoose = require('mongoose');
const positionCtrl = {};

positionCtrl.getPositions = async (req, res) => {
    const positions = await Position.find()
        .populate({path:'employee',select: 'name'})
        .exec();
    res.json(positions);
};

positionCtrl.createPosition = async (req, res) => {
    const position = new Position({
        _id: new mongoose.Types.ObjectId(),
        address: req.body.address,
        lattitude: req.body.lattitude,
        longtitude: req.body.longtitude,
        employee : req.body.id
    }); 
    await position.save();
    res.json({
       'status' : 'Position Saved'
    });
    
    
};

positionCtrl.getPosition = async (req, res) => {
    const position = await Position.findById(req.params.id)
        .populate({path: 'employee', select: 'name'})
        .exec();
    res.json(position);
};

positionCtrl.getPositionByEmployeeId = async (req, res) => {
    const position = await Position.find({employee : req.params.employee_id})
        .populate({path: 'employee', select: 'name'})
        .exec();
    res.json(position);
};

positionCtrl.editPosition = async (req, res) =>{
    const { id } = req.params;
    const position = {
        address: req.body.address,
        lattitude: req.body.lattitude,
        longtitude: req.body.longtitude
    }
    await Position.findByIdAndUpdate(id, {$set: position},{ new: true });
    res.json({
        status: 'Position Updated'
    });
};
positionCtrl.deletePosition = async (req, res) => {
      await Position.findByIdAndRemove(req.params.id);
      res.json({
          status: 'Position Deleted success'
      });
};
positionCtrl.deletePositionAll = async (req, res) => {
    console.log(req.params.id);
    await Position.remove({employee: {
        _id: req.params.id 
    }});
    res.json({
        status: 'Position All Delete success'
    });
}
module.exports = positionCtrl;