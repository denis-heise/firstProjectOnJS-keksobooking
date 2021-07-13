const NUMBER_ADS_FILTERED = 10;
const VALUE_DEFAULT = 'any';
const PriceFilterValues = {
  LOW: {
    START: 0,
    END: 10000,
  },
  MIDDLE: {
    START: 10000,
    END: 50000,
  },
  HIGH: {
    START: 50000,
    END: 1000000,
  },
};
const filtersNodes = Array.from(document.querySelector('.map__filters').children);
const RulesFiltration = {
  'housing-type': (data, filter) => filter.value === data.offer.type,
  'housing-rooms': (data, filter) => filter.value === data.offer.rooms.toString(),
  'housing-guests': (data, filter) => filter.value === data.offer.guests.toString(),
  'housing-price': (data, filter) => {
    const selectedPrice = PriceFilterValues[filter.value.toUpperCase()];
    return data.offer.price >= selectedPrice.START && data.offer.price < selectedPrice.END;
  },
  'housing-features': (data, filter) => {
    const checkedListNodes = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));
    return checkedListNodes.every((checkbox) => data.offer.features && data.offer.features.some((feature) => feature === checkbox.value));
  },
};

const getFilteredData = (data) => {
  const offers = new Array();
  data.every((item) => {
    const result = filtersNodes.every((filter) => filter.value === VALUE_DEFAULT ? true : RulesFiltration[filter.id](item, filter));
    if (result) {
      offers.push(item);
    }
    return offers.length < NUMBER_ADS_FILTERED;
  });
  return offers;
};

export {getFilteredData};
