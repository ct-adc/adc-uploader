import upload from './upload';
import utility from 'ct-utility';
export default {
    /**
     * 是否为已经完成上传的图片
     * @param status
     * @returns {boolean}
     */
    isCompleteFile(status){
        return status === 'complete';
    },
    /**
     * 是否为正在进行中的图片
     * @param status
     * @returns {boolean}
     */
    isPendingFile(status){
        const statuses = ['inited', 'progress', 'queued', 'progress'];

        return statuses.indexOf(status) > -1;
    },
    /**
     * 是否为错误状态的图片
     * @param status
     * @returns {boolean}
     */
    isErrorFile(status){
        const statuses = ['error', 'cancelled', 'interrupt', 'invalid'];

        return statuses.indexOf(status) > -1;
    },
    /**
     * 是否是可以被cancel的图片
     * @param status
     * @returns {boolean}
     */
    isCanBeStoppedFile(status){
        const statuses = ['inited', 'queued', 'progress', 'interrupt', 'cancelled'];

        return statuses.indexOf(status) > -1;
    },
    /**
     * 根据初始文件列表初始化fileList
     */
    initFileList(){
        const defaults = {
            file: null,
            status: '', // 文件从选择到上传经历的一系列状态
            errorText: '',//文件上传失败信息
            previewStatus: true, // 预览生成状态
            previewSrc: '', // 预览生成后的image data
            url: '', // 上传到服务器后的返回地址
            name: '' // 解析出的文件名
        };

        this.fileList = [];
        this.files.map((url)=> {
            const file = utility.base.extend(defaults, {
                url: url,
                previewSrc: url,
                status: 'complete',
                name: url.split('/').pop()
            });

            this.fileList.push(JSON.parse(JSON.stringify(file)));
        })
    },
    /**
     * 从fileList中删除文件
     * @param index 所删除文件在fileList中的索引
     */
    removeFile(index){
        if (index === this.fileList.length - 1) {
            this.$emit('runtime-error', {
                code: 'RESET',
                msg: ''
            });
            this.$emit('change-status');
        }
        this.$emit('delete', {
            index: index,
            url: this.fileList[index].url,
            status: this.fileList[index].status
        });
        if (this.fileList[index].file !== null) {
            this.uploader.removeFile(this.fileList[index].file);
        }
        this.fileList = this.fileList.filter((item, i)=> {
            return i !== index;
        })
    },
    /**
     * 初始化uploader并为其绑定事件
     */
    initUploader(){
        this.createUploader();
        this.uploaderBind();
    },
    /*****以下为对外方法******/
    /*****操作******/
    /**
     * 手动触发文件上传
     */
    upload(){
        this.uploader.upload();
    },
    /**
     * 刷新上传对象
     */
    refreshUploader(){
        this.uploader.refresh();
    },
    /**
     * 重置上传对象
     */
    resetUploader(){
        this.uploader.reset();
    },
    /**
     * 取消上传
     */
    cancelUpload(){
        this.uploader.stop(true);
        this.fileList = this.fileList.filter(item=> {
            if (this.isCanBeStoppedFile(item.status)) {
                //如果fileList中有正在上传的图片，将该文件移除
                if (item.file !== null) {
                    this.uploader.removeFile(item.file, true);
                }
            }
            //从fileList中移除取消上传的文件
            return !this.isCanBeStoppedFile(item.status);
        });
    },
    /*****判断******/
    /**
     * 是否有正在上传的图片
     * @returns {boolean}
     */
    isPending(){
        return this.pendingFiles.length > 0;
    },
    /*****获取******/
    /**
     * 获取上传成功的图片
     * @returns {uploadedFiles}
     */
    getUploadedFiles(){
        return this.uploadedFiles;
    },
    /**
     * 获取上传失败的图片
     * @returns {errorFiles}
     */
    getErrorFiles(){
        return this.errorFiles;
    },
    /**
     * 获取正在进行中的图片
     * @returns {pendingFiles}
     */
    getPendingFiles(){
        return this.pendingFiles;
    },
    /**
     * 获取上传成功的图片列表,其中每一项为一个url
     */
    getUrls(){
        return this.uploadedFiles.map(item=> {
            return item.url;
        });
    }
};
