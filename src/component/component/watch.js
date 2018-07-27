export default {
    accept() {
        // pass
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    auto(newVal) {
        // pass
        this.uploader.option('auto', newVal);
    },
    chunked(newVal){
        // pass
        this.uploader.option('chunked', newVal);
    },
    chunkSize(newVal){
        //pass
        this.uploader.option('chunkSize', newVal);
    },
    chunkRetry(newVal){
        // not test
        this.uploader.option('chunkRetry', newVal);
    },
    compress() {
        // pass 使用option会导致不能上传，一直loading
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    /**
     * 监听disabled，便于实时控制组件状态
     * @param newVal
     */
    disabled(newVal){
        if (this.type === 'file'){
            if (newVal) {
                this.disableUploader();
                this.enableTip();
            } else {
                this.enableUploader();
                this.disableTip();
            }
        }
    },
    duplicate(newVal) {
        // pass option对此无效
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    fileList(newVal, oldVal){
        // pass
        if (this.type === 'img' && newVal.length < oldVal.length && (typeof this.fileNumLimit ==='undefined' || oldVal.length === this.fileNumLimit)) {
            this.$nextTick(() => {
                this.uploader.addButton({
                    id: this.$refs.addThumb
                });
            })
        }
    },
    fileNumLimit(){
        // pass
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    files() {
        this.initFileList();
    },
    fileSingleSizeLimit() {
        //pass option对此无效
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    fileSizeLimit(){
        // pass option对此无效
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    method(newVal) {
        //pass
        this.uploader.option('method', newVal);
    },
    multiple(newVal){
        // pass
        this.uploader.option('multiple', newVal);
    },
    /**
     * 当tip为""时，直接禁用；不为空时才激活tip
     * @param newVal
     */
    tip(newVal){
        if (this.type === 'file'){
            if (newVal.message === '') {
                this.disableTip();
            } else {
                this.destroyTip();
                this.initTip();
                this.enableTip();
            }
        }
    },
    sendAsBinary(newVal){
        //pass
        this.uploader.option('sendAsBinary', newVal);
    },
    server(server) {
        //pass
        this.uploader.option('server', server);
    },
    threads(newVal){
        // not test
        this.uploader.option('threads', newVal);
    },
    fileVal(newVal){
        // pass
        this.uploader.option('fileVal', newVal);
    },
    loading(newVal){
        if (this.type === 'file'){
            const button = this.$refs.root.getElementsByClassName('webuploader-pick')[0];
        
            if (newVal){
                button.innerHTML = '<i class="glyphicon glyphicon-refresh rotate"></i> <span class="title">上传文件中</span>';
            } else {
                button.innerHTML = '<i class="glyphicon glyphicon-import"></i> <span class="title">' + this.buttonText + '</span>'
            }
        }
    }
};
