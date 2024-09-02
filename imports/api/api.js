import { Meteor } from 'meteor/meteor';
import { apiRequest } from '../utils/apiUtils';


Meteor.methods({
    async fetchAllUsaPriceData() {
        try {
            return await apiRequest('/allUsaPrice');
        } catch (error) {
            throw new Meteor.Error('fetch-all-USA-data-failed', `Failed to fetch first API data: ${error.message}`);
        }
    },

    async fetchStateUsaPriceData(param) {
        try {
            return await apiRequest(`/stateUsaPrice?state=${param}`, {
                method: 'GET',
            });
        } catch (error) {
            throw new Meteor.Error('fetch-state-USA-data-failed', `Failed to fetch second API data: ${error.message}`);
        }
    }
});
