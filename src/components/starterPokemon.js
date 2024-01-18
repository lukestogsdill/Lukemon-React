const starterPoke = [{
    'damage': 100,
    'crit': 50,
    'accuracy': 60,
    'poke_hash_id': 1,
    'shiny': false,
    'poke_hash': {
        'poke_name': 'bulbasaur',
        'poke_type': ['grass','poison'],
        'sprite_url': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
        'shiny_url': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/1.gif',
        'value': 4,
        'hp':78,
        'att':114,
        'defe': 114,
        'speed': 45,
    }
},
{
    'damage': 100,
    'crit': 50,
    'accuracy': 60,
    'poke_hash_id': 4,
    'shiny': false,
    'poke_hash': {
        'poke_name': 'charmander',
        'poke_type': ['fire'],
        'sprite_url': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif',
        'shiny_url': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/4.gif',
        'value': 4,
        'hp':68,
        'att':112,
        'defe':93,
        'speed':65,
    }
},
{
    'damage': 100,
    'crit': 50,
    'accuracy': 60,
    'poke_hash_id': 7,
    'shiny': false,
    'poke_hash': {
        'poke_name': 'squirtle',
        'poke_type': ['water'],
        'sprite_url': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif',
        'shiny_url': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/7.gif',
        'value': 4,
        'hp':77,
        'att':98,
        'defe': 129,
        'speed': 43,
    }
}]

export function starterPokemon() {
    return starterPoke
}
