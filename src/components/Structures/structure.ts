export interface IStructure {
    name: string;
    blueprints: IBlueprints[]
}

export interface IBlueprints {
    id: string;
    x: number[];
    y: number[];
    children?: IBlueprints[];
}

export const structures: IStructure[] = [
    {
        name: 'basic',
        blueprints: [
            {
                id: 'header',
                x: [0, 12],
                y: [0, 1],
                children: [
                    {
                        id: 'icon-left',
                        x: [0, 2],
                        y: [0, 12]
                    },
                    {
                        id: 'menu',
                        x: [7, 12],
                        y: [0, 12]
                    }
                ]
            },
            {
                id: 'left-main',
                x: [0, 5],
                y: [1, 4]
            },
            {
                id: 'right-main',
                x: [5, 12],
                y: [1, 4]
            }
        ],
    },
    {
        name: 'blog',
        blueprints: [
            {
                id: 'header',
                x: [0, 12],
                y: [0, 1]
            },
            {
                id: 'content',
                x: [0, 8],
                y: [1, 4]
            },
            {
                id: 'anuncios',
                x: [8, 12],
                y: [1, 4]
            }
        ]
    },
]