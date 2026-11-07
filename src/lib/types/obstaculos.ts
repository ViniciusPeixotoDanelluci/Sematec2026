
export const TipoDeObstaculos = {
    HOLE: 'Buraco',
    LIGHTINING: 'Iluminação',
    GRAFFITI: 'Pichação',
    GARBAGE: 'Lixo',
    SIDEWALK: 'Calçada'
} as const;

export type TipoDeObstaculos = (typeof TipoDeObstaculos)[keyof typeof TipoDeObstaculos];

export const StatusDoAlerta = {
    STANDBY: 'Em Espera',
    FIXING: 'Sendo Resolvido',
    SOLVED: 'Resolvido!'
} as const;

export type StatusDoAlerta = (typeof StatusDoAlerta)[keyof typeof StatusDoAlerta];