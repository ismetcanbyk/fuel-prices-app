// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// FontAwesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import './main.html';
import './main.css';
import '../imports/ui/Header/Header.js';
import '../imports/ui/Header/Header.html';
import '../imports/ui/FuelPrices/FuelPrices.js';
import '../imports/ui/FuelPrices/FuelPrices.html';
import '../imports/ui/NavTabs/NavTabs.js';
import '../imports/ui/NavTabs/NavTabs.html';




Template.MainLayout.helpers({
    activeIfTemplateIs(template) {
        return template === FlowRouter.getRouteName() ? 'active' : '';
    }
});

// State Prices template helpers and events
Template.StatePrices.onCreated(function () {
    this.prices = new ReactiveVar([]);
    this.loading = new ReactiveVar(true);

    Meteor.call('fetchAllUsaPriceData', (error, result) => {
        if (error) {
            console.error('API call to first endpoint failed:', error.reason);
        } else {
            this.prices.set(result);
            this.loading.set(false);
        }
    });
});

Template.StatePrices.helpers({
    prices() {
        return Template.instance().prices.get();
    },
    loading() {
        return Template.instance().loading.get();
    }
});

// City Prices template helpers and events
Template.CityPrices.onCreated(function () {
    this.selectedState = new ReactiveVar('Washington');
    this.cityPrices = new ReactiveVar([]);
    // Fetch city prices data here
});

Template.CityPrices.helpers({
    selectedState() {
        return Template.instance().selectedState.get();
    },
    cityPrices() {
        return Template.instance().cityPrices.get();
    }
});

Template.CityPrices.events({
    'change .state-select'(event, instance) {
        instance.selectedState.set(event.target.value);
        // Fetch new city prices based on selected state
    }
});