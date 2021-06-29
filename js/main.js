import {createOffers} from './util.js';
import {addItemToMap} from './template-card.js';
import {togglePageStatus} from './form.js';

const OFFER_FOR_POPUP_IDX = 0;

const offers = createOffers(10);
const offerForPopup = offers[OFFER_FOR_POPUP_IDX];

addItemToMap(offerForPopup);

const flag = true;
togglePageStatus(flag);
