
export class Config {

    public static get API_END_POINT(): string { return 'http://localhost:9090/'; }

    public static CONFIG_IDENTIFIER = {
        FETCH_LIST: Config.API_END_POINT + 'fetchList',
        INSERT_ITEM: Config.API_END_POINT + 'insertItem',
        DELETE_ITEM: Config.API_END_POINT + 'deleteItem',
        DELETE_ALL: Config.API_END_POINT + 'deleteAll'
    };
}
