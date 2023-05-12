export interface IStructure {
    name: string;
    blueprints: IBlueprints[]
}

export interface IBlueprints {
    x: number[];
    y: number[];
    children?: IBlueprints[];
}

export const structures: IStructure[] = [
    {
        name: 'basic',
        blueprints: [
            {
                x: [0, 12],
                y: [0, 1],
                children: [
                    {
                        x: [0, 6],
                        y: [0, 12]
                    }
                ]
            },
            {
                x: [0, 5],
                y: [1, 4]
            },
            {
                x: [5, 12],
                y: [1, 4]
            }
        ],
    },
    {
        name: 'blog',
        blueprints: [
            {
                x: [0, 12],
                y: [0, 1]
            },
            {
                x: [0, 8],
                y: [1, 4]
            },
            {
                x: [8, 12],
                y: [1, 4]
            }
        ]
    },
]