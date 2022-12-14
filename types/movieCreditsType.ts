export type MovieCreditsCast = {
    cast_id: number,
    character: string,
    credit_id: string,
    id: number,
    name: string,
    original_name: string;
    profile_path: string,
}

export type MovieCreditsCrew = {
    credit_id: string,
    department: string,
    id: number,
    job: string,
    name: string,
    profile_path: string,
}

export type MovieCreditsType = {
    cast: MovieCreditsCast[],
    crew: MovieCreditsCrew[],
    id: number,
} 