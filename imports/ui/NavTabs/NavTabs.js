import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import './NavTabs.html';
import './NavTabs.css';

Template.NavTabs.onCreated(function () {
    this.activeTab = new ReactiveVar('state');
});

Template.NavTabs.helpers({
    isActiveTab(tab) {
        const instance = Template.instance();
        if (instance && instance.activeTab) {
            return instance.activeTab.get() === tab ? 'active' : '';
        }
        return '';
    }
});

Template.NavTabs.events({
    'click #stateTab'(event, instance) {
        event.preventDefault();
        instance.activeTab.set('state');
    },
    'click #cityTab'(event, instance) {
        event.preventDefault();
        instance.activeTab.set('city');
    }
});
