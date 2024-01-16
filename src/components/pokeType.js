const typeChart = {
    'normal': {
        'strong': [],
        'weak': ['fighting']
    },
    'fighting': {
        'strong': ['normal', 'rock', 'steel', 'ice', 'dark'],
        'weak': ['flying', 'poison', 'psychic', 'bug', 'fairy']
    },
    'flying': {
        'strong': ['fighting', 'bug', 'grass'],
        'weak': ['rock', 'electric', 'ice']
    },
    'poison': {
        'strong': ['grass', 'fairy'],
        'weak': ['ground', 'psychic']
    },
    'ground': {
        'strong': ['poison', 'rock', 'steel', 'fire', 'electric'],
        'weak': ['water', 'grass', 'ice']
    },
    'rock': {
        'strong': ['flying', 'bug', 'fire', 'ice'],
        'weak': ['fighting', 'ground', 'steel', 'water', 'grass']
    },
    'bug': {
        'strong': ['grass', 'psychic', 'dark'],
        'weak': ['flying', 'rock', 'fire']
    },
    'ghost': {
        'strong': ['ghost', 'psychic'],
        'weak': ['dark']
    },
    'steel': {
        'strong': ['rock', 'ice', 'fairy'],
        'weak': ['fighting', 'ground', 'fire']
    },
    'fire': {
        'strong': ['bug', 'steel', 'grass', 'ice'],
        'weak': ['ground', 'rock', 'water']
    },
    'water': {
        'strong': ['ground', 'rock', 'fire'],
        'weak': ['electric', 'grass']
    },
    'grass': {
        'strong': ['ground', 'rock', 'water'],
        'weak': ['flying', 'poison', 'bug', 'fire', 'ice']
    },
    'electric': {
        'strong': ['water', 'flying'],
        'weak': ['ground']
    },
    'psychic': {
        'strong': ['fighting', 'poison'],
        'weak': ['bug', 'ghost', 'dark']
    },
    'ice': {
        'strong': ['flying', 'ground', 'grass', 'dragon'],
        'weak': ['fighting', 'fire', 'rock', 'steel']
    },
    'dragon': {
        'strong': ['dragon'],
        'weak': ['ice', 'dragon', 'fairy']
    },
    'dark': {
        'strong': ['ghost', 'psychic'],
        'weak': ['fighting', 'bug', 'fairy']
    },
    'fairy': {
        'strong': ['fighting', 'dragon', 'dark'],
        'weak': ['poison', 'steel']
    }
}

export default function pokeType(types1, types2) {
    // Initialize effectiveness to 1 (neutral)
    let effectiveness = 1;

    // Loop through each type in the first array
    for (const type1 of types1) {
        const type1Data = typeChart[type1] || { strong: [], weak: [] };

        // Loop through each type in the second array
        for (const type2 of types2) {
            const type2Data = typeChart[type2] || { strong: [], weak: [] };

            // Update effectiveness based on the interaction between the two types
            if (type1Data.weak.includes(type2)) {
                effectiveness = 0.5;
            }
            if (type1Data.strong.includes(type2)) {
                effectiveness = 1.5;
            }
        }
    }

    return effectiveness;
}
