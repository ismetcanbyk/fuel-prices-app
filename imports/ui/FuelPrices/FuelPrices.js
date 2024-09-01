import { Template } from 'meteor/templating';
import './FuelPrices.html';
import './FuelPrices.css';


Template.Prices.helpers({
    prices() {
        return [
            { state: 'Alaska', regular: '$3.217', midGrade: '$3.422', premium: '$3.575', diesel: '$3.284', code: 'AK' },
            { state: 'Alabama', regular: '$2.417', midGrade: '$4.122', premium: '$2.575', diesel: '$1.284', code: 'AL' },
            { state: 'Arkansas', regular: '$1.217', midGrade: '$1.422', premium: '$4.575', diesel: '$2.284', code: 'AR' },

        ];
    },
});
