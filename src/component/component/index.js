import props from './props';
import computed from './computed';
import watch from './watch';
import methods from './methods';
import upload from './upload';
/**
 * 事件
 * runtime-error 实时的上传文件失败信息。注意: 不存储历史错误
 * runtime-success 实时的上传文件成功信息。注意: 不存储历史信息
 * change-status 当发生错误或者成功时执行。注意: 当文件状态发生细小状态变化并不会触发该事件。file的status实时变化对使用者不可见
 */
export default {
    props: props,
    data(){
        return {
            fileList: []
        };
    },
    computed: computed,
    created(){
        this.initFileList();
    },
    mounted(){
        //初始化上传组件
        this.initUploader();
        // let i;
        // const initImgUploaderSize = ()=>{
        //     //如果是图片组件，且root存在，那么手动设置上传按钮区域设置为缩略图大小
        //     const element = this.$refs.root.querySelector('.webuploader-element-invisible');

        //     if (element !== null){
        //         clearTimeout(i);
        //         element.parentNode.style.width = this.thumbnailWidth + 'px';
        //         element.parentNode.style.height = this.thumbnailHeight + 'px';
        //     } else {
        //         i = setTimeout(()=>{
        //             initImgUploaderSize();
        //         });
        //     }
        // };

        // i = setTimeout(()=> {
        //     //如果是图片组件，且root存在，那么手动设置上传按钮区域设置为缩略图大小
        //     if (this.type === 'img' && typeof this.$refs.root !== 'undefined'){
        //         // initImgUploaderSize();
        //     }
        // });
        //如果是文件导入组件，初始化tip，如果是禁用状态，那么禁用uploader并激活tip; 因为初始化了tip，所以如果没有禁用，那么禁用tip
        if (this.type === 'file'){
            this.initTip();
            if (this.disabled) {
                this.disableUploader();
                this.enableTip();
            } else {
                // this.enableUploader();
                this.disableTip();
            }
            // this.refreshUploader();
        }
    },
    methods: Object.assign(methods, upload),
    watch: watch
};
