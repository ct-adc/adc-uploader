export default {
    /**
     * 已经上传成功的图片
     * @returns {Array}
     */
    uploadedFiles(){
        const files = [];

        this.fileList.map((item)=> {
            if (this.isCompleteFile(item.status)) {
                files.push({
                    errorText: item.errorText, // 出错信息
                    previewSrc: item.previewSrc, // 预览地址
                    previewStatus: item.previewStatus, // 预览是否生成成功
                    status: item.status, // 状态
                    url: item.url, // 上传到服务器的地址
                    name: item.name // 文件名
                });
            }
        });
        return files;
    },
    /**
     * 获取处于失败状态下的图片
     * @returns {Array}
     */
    errorFiles(){
        const files = [];

        this.fileList.map(item=> {
            if (this.isErrorFile(item.status)) {
                files.push({
                    errorText: item.errorText, // 出错信息
                    previewSrc: item.previewSrc, // 预览地址
                    previewStatus: item.previewStatus, // 预览是否生成成功
                    status: item.status, // 状态
                    url: item.url, // 上传到服务器的地址
                    name: item.name // 文件名
                });
            }
        });
        return files;
    },
    /**
     * 获取处于进行中的图片
     * @returns {Array}
     */
    pendingFiles(){
        const files = [];

        this.fileList.map((item)=> {
            if (this.isPendingFile(item.status)) {
                files.push({
                    errorText: item.errorText, // 出错信息
                    previewSrc: item.previewSrc, // 预览地址
                    previewStatus: item.previewStatus, // 预览是否生成成功
                    status: item.status, // 状态
                    url: item.url, // 上传到服务器的地址
                    name: item.name // 文件名
                });
            }
        });
        return files;
    },
    loading(){
        return this.pendingFiles.length > 0;
    }
};
