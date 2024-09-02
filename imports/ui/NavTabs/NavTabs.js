import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import { getStateName } from '../../utils/stateUtils';
import './NavTabs.html';
import './NavTabs.css';

Template.NavTabs.onCreated(function () {
    this.activeTab = new ReactiveVar('state');
    this.stateOptions = new ReactiveVar(getStateName());
    this.selectedState = new ReactiveVar('');
});

Template.NavTabs.helpers({
    isActiveTab(tab) {
        const instance = Template.instance();
        return instance.activeTab.get() === tab ? 'active' : '';
    },
    isCityTab() {
        return Template.instance().activeTab.get() === 'city';
    },
    stateOptions() {
        return Template.instance().stateOptions.get();
    },
});

Template.NavTabs.events({
    'click #stateTab'(event, instance) {
        event.preventDefault();
        instance.activeTab.set('state');
    },
    'click #cityTab'(event, instance) {
        event.preventDefault();
        instance.activeTab.set('city');
    },
    'change #stateSelect'(event, instance) {
        const selectedState = event.target.value;
        instance.selectedState.set(selectedState);

        // Directly access the FuelPrices template instance.
        const fuelPriceInstance = Template.instance().view.parentView.templateInstance();
        if (fuelPriceInstance) {
            fuelPriceInstance.selectedState.set(selectedState);
            console.log(`Selected state: ${selectedState}`);
        } else {
            console.error("FuelPrices instance not found!");
        }
    }
});
