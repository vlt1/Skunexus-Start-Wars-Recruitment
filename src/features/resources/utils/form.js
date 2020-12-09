export const defaultFormDescriptions = {
  planets: {
    name: {
      type: 'text',
      required: true
    },
    rotation_period: {
      type: 'number',
      required: true
    },
    orbital_period: {
      type: 'number',
      required: true
    },
    diameter: {
      type: 'number',
      required: true
    },
    climate: {
      type: 'text',
      required: true
    },
    gravity: {
      type: 'text',
      required: true
    },
    terrain: {
      type: 'select',
      required: true,
      options: [
        'acid pools',
        'airless asteroid',
        'ash',
        'barren',
        'bogs',
        'canyons',
        'caves',
        'cities',
        'cityscape',
        'cliffs',
        'desert',
        'deserts',
        'fields',
        'forests',
        'fungus forests',
        'gas giant',
        'glaciers',
        'grass',
        'grasslands',
        'grassy hills',
        'hills',
        'ice canyons',
        'ice caves',
        'islands',
        'jungle',
        'jungles',
        'lakes',
        'lava rivers',
        'mesas',
        'mountain',
        'mountain ranges',
        'mountains',
        'ocean',
        'oceans',
        'plains',
        'plateaus',
        'rainforests',
        'reefs',
        'rivers',
        'rock',
        'rock arches',
        'rocky',
        'rocky canyons',
        'rocky deserts',
        'rocky islands',
        'savanna',
        'savannahs',
        'savannas',
        'scrublands',
        'seas',
        'sinkholes',
        'swamp',
        'swamps',
        'toxic cloudsea',
        'tundra',
        'unknown',
        'urban',
        'valleys',
        'verdant',
        'vines',
        'volcanoes'
      ],
      toOptions: (data) => {
        if (data.length > 0) {
          return data.replace(/,\s*/g, ',').split(',');
        }
        return [];
      },
      fromOptions: (options = []) => options.join(', ')
    },
    surface_water: {
      type: 'number',
      required: true
    }
  }
};
