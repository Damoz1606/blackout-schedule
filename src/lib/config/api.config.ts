interface ApiConfig {
    uri: string;
};

const api: ApiConfig = {
    uri: process.env.NEXT_CNEL || ''
}

export default Object.freeze(api);