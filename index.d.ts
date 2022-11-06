declare module 'node-ncore-parser' {
    enum Sort {
        name = 'name',
        createdAt = 'fid',
        size = 'size',
        timesCompleted = 'times_completed',
        seeders = 'seeders',
        leechers = 'leechers',
    }

    enum Order {
        desc = 'DESC',
        asc = 'ASC',
    }

    type TorrentParams = {
        sortBy?: Sort;
        order?: Order;
        type?: string;
        types?: string[];
        page?: number;
        searchText?: string;
    };

    type Torrent = {
        title: string;
        id: string;
        peers: number;
        createdAt: Date;
    }

    type DownloadTorrentParams = {
        key: string,
        torrentId: string
    };

    /**
     * Logs in by credentials and gets session id, which should be used in further communications
     * @param credentials 
     * @returns `sessionId`
     */
    function login(credentials: { username: string, password: string }): Promise<string>;

    /**
     * Logs out for the given sessionId
     * @param sessionId 
     * @returns `ok` true if login was successful
     */
    function logout(sessionId: string): Promise<boolean>;

    /**
     * Gets the parsed torrent list
     * @param sessionId The session id received after login
     * @param params The query params to filter torrents
     */
    function getTorrents(sessionId: string, params?: TorrentParams): Promise<{ key: string, torrents: Torrent[] }>;


    /**
     * Downloads the torrent file to the given location
     * @param sessionId The session id received after login
     * @param params The query params with the torrent identifiers
     * @param path Download path as string
     */
    function downloadTorrent(sessionId: string, params: DownloadTorrentParams, path: string): Promise<void>;
}