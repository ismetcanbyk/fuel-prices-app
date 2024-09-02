import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { getStateCodeByName } from '../../utils/stateUtils.js';
import './FuelPrices.html';
import './FuelPrices.css';

Template.StatePrices.onCreated(function () {
    this.activeTab = new ReactiveVar('state');
    this.statePrices = new ReactiveVar([]);
    this.cityPrices = new ReactiveVar([]);
    this.selectedState = new ReactiveVar('AL'); // Default state
    this.selectedCity = new ReactiveVar('');

    // Fetch all state prices
    Meteor.call('fetchAllUsaPriceData', (error, result) => {
        if (error) {
            console.error('Error fetching state prices:', error);
        } else if (result && result.success) {
            this.statePrices.set(result.result);
        } else {
            console.error('Unexpected API response:', result);
        }
    });

    // Fetch city prices for the selected state
    this.autorun(() => {
        const selectedState = this.selectedState.get();
        console.log(`Selected state inside autorun: ${selectedState}`);
        const stateCode = getStateCodeByName(selectedState);
        if (this.activeTab.get() === 'city' && selectedState) {
            Meteor.call('fetchStateUsaPriceData', stateCode, (error, result) => {
                if (error) {
                    console.error('Error fetching city prices:', error);
                } else if (result && result.success) {
                    this.cityPrices.set(result.result);
                } else {
                    console.error('Unexpected API response:', result);
                }
            });
        }
    });
});

Template.StatePrices.helpers({
    isStateTab() {
        return Template.instance().activeTab.get() === 'state';
    },
    isCityTab() {
        return Template.instance().activeTab.get() === 'city';
    },
    prices() {
        return Template.instance().statePrices.get();
    },
    cityPrices() {
        return Template.instance().cityPrices.get();
    },
    stateCode(name) {
        return getStateCodeByName(name);
    }
});

// Global helper to get the instance of FuelPrices
Template.registerHelper('getFuelPricesInstance', () => {
    return Template.instance();
});

Template.StatePrices.events({
    'click #stateTab'(event, instance) {
        event.preventDefault();
        instance.activeTab.set('state');
    },
    'click #cityTab'(event, instance) {
        event.preventDefault();
        instance.activeTab.set('city');
    },
    'change .state-select'(event, instance) {
        const selectedState = event.target.value;
        instance.selectedState.set(selectedState);
    }
});