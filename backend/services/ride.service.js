const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require('crypto');
const userModel = require("../models/user.model"); // Add this line to import the user model

// First, define helper functions
function getOtp(num) {
    function generateOtp(num) {
        return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    }
    return generateOtp(num);
}

// Define and immediately export getFare function
const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('pickup and destination are required');
    }

    const distanceTime = await mapService.getDistance(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    return {
        auto: Math.round(baseFare.auto + (perKmRate.auto * distanceTime.distance.value / 1000) + (perMinuteRate.auto * distanceTime.duration.value / 60)),
        car: Math.round(baseFare.car + (perKmRate.car * distanceTime.distance.value / 1000) + (perMinuteRate.car * distanceTime.duration.value / 60)),
        moto: Math.round(baseFare.moto + (perKmRate.moto * distanceTime.distance.value / 1000) + (perMinuteRate.moto * distanceTime.duration.value / 60))
    };
};

// Export getFare before it's used
module.exports.getFare = getFare;

// Then define and export createRide
module.exports.createRide = async ({ user, pickup, destination, vehicle }) => {
    if (!user || !pickup || !destination || !vehicle) {
        throw new Error('All fields are required');
    }

    try {
        const latestUser = await userModel.findById(user._id); // Fetch the latest user data
        const fares = await getFare(pickup, destination);
        const ride = new rideModel({
            user: latestUser,
            pickup: pickup,
            destination: destination,
            otp: getOtp(6),
            fare: fares[vehicle],
            vehicle: vehicle
        });

        await ride.save();
        return ride;
    } catch (error) {
        console.error('Error creating ride:', error);
        throw new Error('Failed to create ride: ' + error.message);
    }
};

module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    });

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');
    //console.log("Ride id of new ride is ", rideId);

    if (!ride) {
        throw new Error('Ride not found');
    }

    // Fetch the latest user data
    const latestUser = await userModel.findById(ride.user._id);
    ride.user = latestUser;

    // Emit the ride-confirmed event to the user
    // sendMessageToSocketId(ride.user.socketId, 'ride-confirmed', ride);

    return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    // Fetch the latest user data
    const latestUser = await userModel.findById(ride.user._id);
    ride.user = latestUser;

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    });

    return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    // Fetch the latest user data
    const latestUser = await userModel.findById(ride.user._id);
    ride.user = latestUser;

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    });

    return ride;
};