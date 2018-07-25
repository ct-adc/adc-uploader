import ERRORS from './errors';
import utility from 'ct-utility';
import util from './util';
/**
 * 事件
 * runtime-error 实时的上传文件失败信息。注意: 不存储历史错误
 * runtime-success 实时的上传文件成功信息。注意: 不存储历史信息
 * change-status 当发生错误或者成功时执行。注意: 当文件状态发生细小状态变化并不会触发该事件。file的status实时变化对使用者不可见
 */
export default {
    //向fileList添加一个图片对象，后续将追踪这个图片一系列的状态变化并实时更新
    addFile(file){
        const fileData = {
            file: file,
            status: '', // 文件从选择到上传经历的一系列状态
            errorText: '',//文件上传失败信息
            previewStatus: false, // 预览生成状态
            previewSrc: '', // 预览生成后的image data
            url: '', // 上传到服务器后的返回地址
            name: file.name // 文件名
        };

        // 如果是图片上传才启用生成缩略图
        if (this.type === 'img'){
            this.uploader.makeThumb(file, function(error, src) {
                if (error) {
                    fileData.previewStatus = false;
                    return;
                }
                fileData.previewStatus = true;
                fileData.previewSrc = src;
            }, this.thumbnailWidth, this.thumbnailHeight);
        }
        //监听状态
        file.on('statuschange', function(cur) {
            /**
             * inited 初始状态
             * queued 已经进入队列, 等待上传
             * progress 上传中
             * complete 上传完成。
             * error 上传出错，可重试
             * interrupt 上传中断，可续传。
             * invalid 文件不合格，不能重试上传。会自动从队列中移除。
             * cancelled 文件被移除。
             */
            fileData.status = cur;
        });
        this.fileList.push(fileData);
    },
    /**
     * 判断要上传的文件和当前文件列表中的文件是否有重复
     * @param file
     * @returns {boolean}
     */
    isDuplicate(file){
        const hash = file.__hash || (file.__hash = util.hashString( file.name +
            file.size + file.lastModifiedDate ));
        const isDuplicate = this.fileList.filter(thumb=>{
            return thumb.file !== null && thumb.file['__hash'] === hash;
        }).length > 0;

        return isDuplicate;
    },
    /**
     * 创建上传对象
     */
    createUploader(){
        this.uploader = WebUploader.create({
            pick: {
                id: this.button,
                multiple: this.multiple
            },
            server: this.server,
            method: this.method,
            duplicate: this.duplicate,
            auto: this.auto,
            chunked: this.chunked,
            chunkSize: this.chunkSize,
            chunkRetry: this.chunkRetry,
            accept: this.accept,
            compress: this.compress,
            fileSizeLimit: this.fileSizeLimit,
            fileSingleSizeLimit: this.fileSingleSizeLimit,
            fileNumLimit: this.fileNumLimit,
            fileVal: this.fileVal,
            withCredentials: true,
            sendAsBinary: this.sendAsBinary,
            threads: this.threads,
            thumb: this.thumb
        });
    },
    uploaderBind(){
        this.uploader.on('uploadBeforeSend', function(object, data, headers){
            utility.base.extend(data, this.formData);
            utility.base.extend(headers, this.headers);
        }.bind(this));
        this.uploader.on('beforeFileQueued', function(file){
            if (!this.duplicate){
                const isDuplicate = this.isDuplicate(file);

                if ( isDuplicate ) {
                    this.$emit( 'runtime-error', {
                        code: 'F_DUPLICATE',
                        msg: ERRORS['F_DUPLICATE']
                    });
                    return false;
                }
            }
            if (typeof this.fileNumLimit !=='undefined' && this.fileList.length >= this.fileNumLimit){
                this.$emit('runtime-error', {
                    code: 'Q_EXCEED_NUM_LIMIT',
                    msg: ERRORS['Q_EXCEED_NUM_LIMIT']
                });
                return false;
            }
            return true;
        }.bind(this));
        this.uploader.on('fileQueued', function(file){
            this.addFile(file);
        }.bind(this));
        this.uploader.on('uploadSuccess', function(file, res){
            const result = this.resultFilter(res);

            this.fileList = this.fileList.map(item=> {
                if (item.file !== null && item.file.id === file.id) {
                    if (result.status) {
                        item.url = result.path;
                        this.$emit('runtime-success', res);
                        this.$emit('runtime-error', {
                            code: 'RESET',
                            msg: ''
                        });
                        this.$emit('change-status');
                        return item;
                    } else {
                        item.url = '';
                        item.status = 'error';
                        item.errorText = result.msg;
                        this.$emit('runtime-error', {
                            code: 'RESPONSE_ERROR',
                            msg: result.msg
                        });
                        this.$emit('change-status');
                        return item;
                    }

                } else {
                    return item;
                }
            })
        }.bind(this));
        this.uploader.on('uploadError', function(file, reason){
            this.fileList = this.fileList.map((item)=> {
                this.$emit('runtime-error', {
                    code: 'HTTP_ERROR',
                    msg: reason
                });
                this.$emit('change-status');
                if (item.file !== null && item.file.id === file.id) {
                    item.url = '';
                    item.errorText = reason;
                    return item;
                } else {
                    return item;
                }
            })
        }.bind(this));
        this.uploader.on('error', function(code){
            this.$emit('runtime-error', {
                code: code,
                msg: ERRORS[code] || '请检查文件是否符合要求!'
            });
            this.$emit('change-status');
        }.bind(this));
    }
};
