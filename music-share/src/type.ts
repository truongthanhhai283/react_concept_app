export type SongType = {
    id: string;
    title: string;
    artist: string;
    thumbnail: string;
    url: string;
    duration: number;
}
export interface ISong {
    song: SongType
    isPlaying: boolean;
}

export type ActionType = { type: string, payload?: any };
