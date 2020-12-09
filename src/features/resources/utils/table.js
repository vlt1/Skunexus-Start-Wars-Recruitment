import { mapValues, isObject, uniqWith } from 'lodash';
import { Link } from 'react-router-dom';

import ToolbarButton from '../../../common/components/Toolbar/ToolbarButton';
import { makeResourceDescFromUrl } from './common';

export const normalizeHeaders = (headers) => uniqWith(
  headers.map(header => !isObject(header) ? {name: header} : header),
  (({name: name1}, {name: name2}) => name1 === name2)
);
export const substituteHeaders = (headers, substitutions) => headers.map(header => {
  const name = (isObject(header) ? header.name : header); 
  const substitutionIndex = substitutions.findIndex(substitution => name === substitution.name);

  return substitutionIndex > -1 ? substitutions[substitutionIndex] : header;
});
export const normalizeAllHeaders = (headers) => mapValues(headers, normalizeHeaders);

export const goToActionComponent = ({
  to,
  ...props
}) => (
  <Link to={to}>
    <ToolbarButton {...props}/>
  </Link>
);
export const makeGoToTableWithSourceAction = (label, targetType, targetField) => (data) => {
  const {type, id} = makeResourceDescFromUrl(data.url);
  return goToAction(targetField, label, `/table/${targetType}/source/${type}/${id}/${targetField}`);
};
export const makeGoToDetailsAction = (label) => (data) => {
  const {type, id} = makeResourceDescFromUrl(data.url);
  return goToAction('details', label, `/details/${type}/${id}`);
}
export const goToAction = (actionId, label, to) => ({
  id: `goto-${actionId}`,
  label,
  to,
  component: goToActionComponent
});

export const defaultHeaders = {
  planets: [
    'name', {
      name: 'rotation_period',
      type: 'number'
    }, {
      name: 'orbital_period',
      type: 'number'
    }, {
      name: 'diameter',
      type: 'number'
    },
    'climate', {
      name: 'gravity',
      type: 'number'
    },
    'terrain', {
      name: 'surface_water',
      type: 'number'
    }, {
      name: 'population',
      type: 'number'
    }, {
      name: '@actions',
      type: 'actions',
      actions: [
        makeGoToTableWithSourceAction('Go to Residents', 'people', 'residents'),
        makeGoToTableWithSourceAction('Go to Films', 'films', 'films'),
        makeGoToDetailsAction('Go to Details')
      ]
    }
  ],
  films: [
    'title',
    'episode_id',
    'director',
    'producer',
    'release_date'
  ],
  people: [
    'name',
    'height',
    'mass',
    'hair_color',
    'skin_color',
    'eye_color',
    'birth_year',
    'gender'
  ],
  species: [
    'name',
    'classification',
    'designation',
    'average_height',
    'average_lifespan',
    'language'
  ],
  starships: [
    'name',
    'model',
    'manufacturer',
    'cost_in_credits',
    'crew',
    'passengers',
    'starship_class'
  ],
  vehicles: [
    'name',
    'model',
    'manufacturer',
    'cost_in_credits',
    'max_atmosphering_speed',
    'crew',
    'passengers',
    'vehicle_class'
  ]
};

export const makeTablePageTitle = (type) => `Star Wars ${type[0].toUpperCase()}${type.slice(1)}`;
export const makeTableWithSourcePageTitle = (type, sourceType, sourceName) => {
  if (type === 'films') {
    return `Films ${sourceName} was featured in`;
  }
  if (type === 'people') {
    if (sourceType === 'planets') {
      return `Residents of planet ${sourceName}`
    }
  }
  return `Resources of type '${type}' that belong to '${sourceName}' of type '${sourceType}'`;
};
