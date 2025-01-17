const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType }) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('Please fill in all fields');
    }
    try {
        const captain = new captainModel({
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });
        await captain.save();
        // console.log("Captain created", captain);
        return captain;
    } catch (error) {
        throw new Error(error);
    }

};