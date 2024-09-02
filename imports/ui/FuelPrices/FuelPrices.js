import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './FuelPrices.html';
import './FuelPrices.css';

Template.Prices.onCreated(function () {
    this.activeTab = new ReactiveVar('state');
    this.statePrices = new ReactiveVar([]);
    this.cityPrices = new ReactiveVar([]);
    this.selectedState = new ReactiveVar('AK'); // Default state

    // Fetch initial state prices
    Meteor.call('fetchAllUsaPriceData', (error, result) => {
        if (error) {
            console.error('Error fetching state prices:', error);
        } else {
            this.statePrices.set(result);
        }
    });

    // Fetch city prices when the selected state changes
    this.autorun(() => {
        if (this.activeTab.get() === 'city') {
            Meteor.call('fetchStateUsaPriceData', this.selectedState.get(), (error, result) => {
                if (error) {
                    console.error('Error fetching city prices:', error);
                } else {
                    this.cityPrices.set(result);
                }
            });
        }
    });
});


Template.Prices.helpers({
    isStateTab() {
        return Template.instance().activeTab.get() === 'state';
    },
    prices() {
        return Template.instance().statePrices.get();
    },
    cityPrices() {
        return Template.instance().cityPrices.get();
    }
});

Template.Prices.events({
    'click #stateTab'(event, instance) {
        event.preventDefault();
        instance.activeTab.set('state');
    },
    'click #cityTab'(event, instance) {
        event.preventDefault();
        instance.activeTab.set('city');
    },
    'change .state-select'(event, instance) {
        instance.selectedState.set(event.target.value);
    }
});