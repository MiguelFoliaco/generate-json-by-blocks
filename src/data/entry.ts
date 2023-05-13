import { IRootJSONEntry } from "types-render-json";

export const jsonFake: IRootJSONEntry = {
    root: {
        version: "0.0.1",
        name: "HooksTest",
        variables: [],
        // hooks: [
        //     {
        //         name: "useAllPokemon",
        //         __type: "REST",
        //         parse: {
        //             pokemons: "results"
        //         },
        //         options: {
        //             method: "GET",
        //         },
        //         target: "hook-query",
        //         uri: "https://pokeapi.co/api/v2/pokemon/",
        //         event: "start",
        //         store: 'pokemonsSearch'
        //     },
        //     {
        //         name: "searchPokemnonByName",
        //         __type: "REST",
        //         parse: {
        //             id: 'id',
        //             weight: 'weight',
        //             name: "name",
        //             img: "sprites.front_default"
        //         },
        //         options: {
        //             params: ['pokeSearchname']
        //         },
        //         target: "hook-query",
        //         uri: "https://pokeapi.co/api/v2/pokemon/",
        //         event: "start",
        //         store: 'pokemonById'
        //     },
        //     {
        //         name: "getDataPokeApi",
        //         __type: "REST",
        //         parse: {
        //             id: 'id',
        //             weight: 'weight',
        //             name: "name",
        //             type: "types[0].type.name",
        //             urlType: "types[0].type.url",
        //         },
        //         target: "hook-query",
        //         uri: "https://pokeapi.co/api/v2/pokemon/ditto",
        //         event: "start",
        //     },
        //     //TODO Rick and Morty
        //     {
        //         name: "useAllRickAndMory",
        //         __type: "REST",
        //         parse: {
        //             characters: "results"
        //         },
        //         options: {
        //             method: "GET",
        //         },
        //         target: "hook-query",
        //         uri: "https://rickandmortyapi.com/api/character",
        //         event: "start",
        //         store: 'pokemonsSearch'
        //     },
        // ],
        // context: {
        //     pokemon: undefined,
        //     user: {
        //         name: '',
        //         password: ''
        //     },
        //     peopels: undefined,
        //     pokemonById: undefined,
        //     pokemonsSearch: undefined
        // },
        types: [],
        contents: [],
        theme: {},
        blocks: [],
        nodes: [
            {
                target: "page",
                name: "Home",
                path: "/",
                __type: "Page",
                nodes: [
                    {
                        target: "h1",
                        text: "Pagina de prubeas Hooks",
                        name: "title_1",
                    },
                    {
                        target: "flex",
                        //   hook: "getDataPokeApi",
                        // context: ['pokemon'],
                        name: "containt-flex",
                        style: {
                            borderWidth: 2,
                            borderColor: "#F66666",
                            borderStyle: 'double',
                            minHeight: 200,
                            minWidth: 200
                        },
                        nodes: [
                            // {
                            //   context: ['pokemon'],
                            //   target: 'p',
                            //   markdown: true,
                            //   text: "Hola soy un ${pokemon.name} este es mi peso ${pokemon.weight}kg soy de tipo ${pokemon.type}, para ver mas de mi tipo mira en [aqui](${pokemon.urlType})"
                            // }
                        ],
                    },
                    // {
                    //     target: "form",
                    //     name: "first-form",
                    //     schema: [{
                    //         name: 'pokeSearchname',
                    //         typeValue: 'text',
                    //         value: '',
                    //         placeHolder: 'Nombre del pokemon',
                    //     }
                    //     ],
                    //     style: {
                    //         container: {
                    //             padding: '20px'
                    //         }
                    //     },
                    //     hook: 'searchPokemnonByName',
                    //     nodes: [],
                    //     __type: "Form",
                    //     event: 'onSubmit',
                    //     store: 'pokemonById'
                    // },
                    // {
                    //     target: "If",
                    //     condition: 'isExist',
                    //     context: ['pokemonById'],
                    //     name: "if-list-pokemon",
                    //     True: [
                    //         {
                    //             context: ['pokemonById'],
                    //             target: "p",
                    //             markdown: true,
                    //             text: "Pokemon llamado ${pokemonById.name} que pesa: ${pokemonById.weight}"
                    //         },
                    //         {
                    //             target: "img",
                    //             context: ['pokemonById'],
                    //             url: "${pokemonById.img}",
                    //             alt: "pokemon ${pokemonById.img}",
                    //             style: {
                    //                 width: 200,
                    //                 height: 200,
                    //                 objectFit: 'cover'
                    //             }
                    //         },
                    //     ],
                    //     False: [
                    //         {
                    //             target: 'p',
                    //             text: 'No se ha encotrado ningun pokemon'
                    //         }
                    //     ]
                    // },
                    // {
                    //     target: "list",
                    //     __type: "Complex",
                    //     hook: 'useAllPokemon',
                    //     context: ["pokemonsSearch"],
                    //     name: "first-list",
                    //     props: {
                    //         pathArray: 'pokemons',
                    //         nodes: [
                    //             {
                    //                 availableParams: true,
                    //                 target: 'p',
                    //                 text: 'Pokemon is ${name}'
                    //             }
                    //         ]
                    //     },
                    // },
                    // {
                    //     target: "list",
                    //     __type: "Complex",
                    //     hook: 'useAllRickAndMory',
                    //     context: ["peopels"],
                    //     name: "second-list",
                    //     style: {
                    //         container: {
                    //             borderTopColor: 'red',
                    //             borderWidth: 3,
                    //             borderStyle: 'solid',
                    //             marginTop: "30px",
                    //         }
                    //     },
                    //     props: {
                    //         pathArray: 'characters',
                    //         nodes: [
                    //             {
                    //                 availableParams: true,
                    //                 target: 'p',
                    //                 name: "personajes",
                    //                 text: 'Pesonaje: ${name} '
                    //             },
                    //             {
                    //                 target: 'link',
                    //                 href: '',
                    //                 text: '',
                    //                 variant: 'outlined',
                    //                 color: 'secondary',
                    //                 style: {
                    //                     alignSelf: 'flex-end'
                    //                 }
                    //             },
                    //             {
                    //                 target: "img",
                    //                 url: "${image}",
                    //                 alt: "personaje ${image}",
                    //                 availableParams: true,
                    //                 style: {
                    //                     width: 80,
                    //                     height: 80,
                    //                     objectFit: 'cover'
                    //                 }
                    //             },
                    //         ]
                    //     },
                    // }
                ],
            }
        ],
    },
};