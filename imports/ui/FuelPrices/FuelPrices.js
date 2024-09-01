import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './FuelPrices.html';
import './FuelPrices.css';

Template.Prices.onCreated(function () {
    this.activeTab = new ReactiveVar('state');
});

Template.Prices.helpers({
    isStateTab() {
        return Template.instance().activeTab.get() === 'state';
    },
    prices() {
        return [
            { state: 'Alaska', regular: '$3.217', midGrade: '$3.422', premium: '$3.575', diesel: '$3.284', code: 'AK' },
            { state: 'Alabama', regular: '$2.417', midGrade: '$4.122', premium: '$2.575', diesel: '$1.284', code: 'AL' },
            { state: 'Arkansas', regular: '$1.217', midGrade: '$1.422', premium: '$4.575', diesel: '$2.284', code: 'AR' },
        ];
    },
    cityPrices() {
        return [
            { city: 'Anchorage', regular: '$3.217', midGrade: '$3.422', premium: '$3.575', diesel: '$3.284', code: 'AK' },
            { city: 'Fairbanks', regular: '$2.417', midGrade: '$4.122', premium: '$2.575', diesel: '$1.284', code: 'AL' },
            { city: 'Juneau', regular: '$1.217', midGrade: '$1.422', premium: '$4.575', diesel: '$2.284', code: 'JU' },
        ];
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
    }
});