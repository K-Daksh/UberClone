const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinates = async (address) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: process.env.GOOGLE_MAPS_API
            }
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistance = async (origin, destination) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: origin,
                destinations: destination,
                key: process.env.GOOGLE_MAPS_API
            }
        });

        if (response.data.status === 'OK') {
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getSuggestions = async (address) => {
    try {
        const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: address,
                key: process.env.GOOGLE_MAPS_API
            }
        });

        if (data.status === 'OK' && data.predictions) {
            return data.predictions;
        } else {
            // console.warn(`Google Places API returned status: ${data.status} ${data.error_message || ''}`);
            return [];
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });

    return captains;


}