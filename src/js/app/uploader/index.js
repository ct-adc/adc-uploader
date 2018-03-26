import Vue from 'vue';
import Uploader from '../../../component/index';
import utility from 'ct-utility';
new Vue({
    el: '#app',
    data: {
        //importer特有属性
        buttonText: '上传文件',
        //组件公用的属性
        accept: {
            extensions: 'jpg,jpeg',
            mimeTypes: 'image/jpeg,image/jpg'
        },
        auto: false,
        chunked: true,
        chunkSize: 5242880,
        chunkRetry: 2,
        compress: false,
        disabled: false,
        duplicate: false,
        fileNumLimit: 2,
        files: [],
        fileSingleSizeLimit: 40 * 1024 * 1024,
        fileSizeLimit: 10 * 1024 * 1024,
        formData: {
            os: 1
        },
        fileVal: 'file1',
        headers: {
            contentType: 'application/json'
        },
        method: 'POST',
        multiple: false,
        resultFilter(res){
            res = utility.objTransfer.lowerKey(res);

            if (res.code === 0){
                return {
                    status: true,
                    path: res.data,
                    msg: ''
                };
            }
            return {
                status: false,
                path: '',
                msg: res.message
            }
        },
        tip: {
            message: '错误提示',
            direction: 'bottom',
        },
        thumb: {
            // width: 110,
            // height: 110,

            // 图片质量，只有type为`image/jpeg`的时候才有效。
            // quality: 70,

            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            // allowMagnify: true,

            // 是否允许裁剪。
            crop: false

            // 为空的话则保留原有图片格式。
            // 否则强制转换成指定的类型。
            // type: 'image/jpeg'
        },
        sendAsBinary: false,
        server: '/api/common/uploadpic',
        threads: 3
    },
    components: {
        Uploader
    },
    methods: {
        /*****改变属性****/
        changeAccept(){
            this.accept = {
                extensions: 'zip',
                mimeTypes: 'application/zip'
            };
        },
        changeAuto(){
            this.auto = !this.auto;
        },
        changeChunked(){
            this.chunked = !this.chunked;
        },
        changeChunkSize(){
            this.chunkSize = 1024;
        },
        changeChunkRetry(){
            this.chunkRetry = 3;
        },
        changeCompress(){
            this.compress = !this.compress;
        },
        changeDisabled(){
            this.disabled = !this.disabled;
        },
        changeDuplicate(){
            this.duplicate = !this.duplicate;
        },
        changeFileNumLimit(){
            if (Math.random() > 0.5){
                this.fileNumLimit = this.fileNumLimit * 2;
            } else {
                this.fileNumLimit = Math.floor(this.fileNumLimit / 2);
            }
        },
        changeFiles(){
            if (Math.random() > 0.5){
                this.files.push('http://a.com/a.xlsx');
            } else {
                this.files.slice(1);
            }
        },
        changeFileSingleSizeLimit(){
            if (Math.random() > 0.5){
                this.fileSingleSizeLimit = this.fileSingleSizeLimit * 5;
            } else {
                this.fileSingleSizeLimit = Math.floor(this.fileSingleSizeLimit / 5);
            }
        },
        changeFileSizeLimit(){
            if (Math.random() > 0.5){
                this.fileSizeLimit = this.fileSizeLimit * 20;
            } else {
                this.fileSizeLimit = Math.floor(this.fileSizeLimit / 20);
            }
        },
        changeFormData(){
            this.formData = {
                os: 2
            };
        },
        changeFileVal(){
            this.fileVal = this.fileVal + '1';
        },
        changeHeaders(){
            this.headers.a = +new Date();
        },
        changeMethod(){
            this.method = 'GET';
        },
        changeMultiple(){
            this.multiple = !this.multiple;
        },
        changeSendAsBinary(){
            this.sendAsBinary = !this.sendAsBinary;
        },
        changeServer(){
            this.server = '/Api/patch/uploadPatch';
        },
        changeThreads(){
            this.threads = 2;
        },
        changeResultFilter(){
            const a = Math.random();

            this.resultFilter = function(){
                return {
                    status: true,
                    path: `${a}.extension`
                };
            };
        },
        changeTip(){
            this.tip = {
                message: '错误提示2',
                direction: 'right'
            };
        },
        resetTip(){
            this.tip = '';
        },
        changeBtnText(){
            this.buttonText = '上传';
        },
        /*****方法****/
        //操作
        upload() {
            this.$refs.uploader.upload();
        },
        refreshUploader(){
            this.$refs.uploader.refreshUploader();
            console.log('----刷新成功');
        },
        resetUploader(){
            this.$refs.uploader.resetUploader();
            console.log('-----重置成功');
        },
        cancelUpload(){
            this.$refs.uploader.cancelUpload();
        },
        //获取
        getUrls(){
            console.log(this.$refs.uploader.getUrls());
        },
        getUploadedFiles(){
            console.log(this.$refs.uploader.getUploadedFiles());
        },
        getErrorFiles(){
            console.log(this.$refs.uploader.getErrorFiles());
        },
        getPendingFiles(){
            console.log(this.$refs.uploader.getPendingFiles());
        },
        //判断
        isPending(){
            console.log(this.$refs.uploader.isPending());
        },
        /*****事件****/
        deleteFile(info){
            console.log(`-----------delete: ${JSON.stringify(info)}-------------`);
        },
        success(response){
            console.log(`-----------success: ${JSON.stringify(response)}-------------`);
        },
        error(error){
            console.log(`-----------error: ${JSON.stringify(error)}-------------`);
        },
        change(){
            console.log('------------change: status of files changed!------------');
        }
    }
});
