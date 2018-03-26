export default{
    hashString(str){
        let hash = 0,
            len = str.length,
            _char;

        for (let i = 0; i < len; i++) {
            _char = str.charCodeAt( i );
            hash = _char + (hash << 6) + (hash << 16) - hash;
        }

        return hash;
    }
};
