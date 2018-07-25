export default{
    props: {
        type: {
            type: String,
            default: 'file'
        },
        thumbnailWidth: {
            type: Number,
            default: 110
        },
        thumbnailHeight: {
            type: Number,
            default: 110
        },
        accept: {
            type: Object,
            default() {
                return {
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
                }
            }
        },
        //
        buttonText: {
            type: String,
            default: '导入文件'
        },
        hasPreview: {
            type: Boolean,
            default: false
        },
        hasList: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        button() {
            if (this.type === 'img'){
                return this.$refs.addThumb;
            } else if (this.type === 'file'){
                return this.$refs.root;
            }
        }
    },
    data() {
        return {
            previewIndex: 0
        };
    },
    methods: {
        //图片导入
        preview(index) {
            this.previewIndex = index;
            $(this.$refs.modal).modal('show');
        },
        //文件导入
        /**
         * 初始化tip
         */
        initTip(){
            $(this.button).tooltip({
                title: this.tip.message,
                placement: this.tip.direction
            });
        },
        /**
         * 失效tip
         */
        disableTip(){
            $(this.button).tooltip('disable');
        },
        /**
         * 激活tip
         */
        enableTip(){
            $(this.button).tooltip('enable');
        },
        /**
         * 销毁tip
         */
        destroyTip(){
            $(this.button).tooltip('destroy');
        },
        /**
         * 禁用uploader
         */
        disableUploader(){
            const classes = this.$refs.root.querySelector('.webuploader-pick').classList;

            if (!classes.contains('webuploader-pick-disable')) {
                this.$refs.root.querySelector('.webuploader-pick').classList.add('webuploader-pick-disable');
            }
        },
        /**
         * 启用uploader
         */
        enableUploader(){
            const classes = this.$refs.root.querySelector('.webuploader-pick').classList;

            if (classes.contains('webuploader-pick-disable')) {
                this.$refs.root.querySelector('.webuploader-pick').classList.remove('webuploader-pick-disable');
            }
        }
    },
    watch: {
        /**
         * 修改按钮文字时修改dom，该内容只能通过修改dom解决，因为其属于插件生成的dom
         * @param newVal
         */
        buttonText(newVal){
            const $webuploaderPick = this.$refs.root.querySelector('.webuploader-pick');

            $webuploaderPick.innerHTML = '<i class="glyphicon glyphicon-import"></i><span class="title">' + newVal + '</span>';
        }
    },
    /**
     * 销毁时
     */
    beforeDestroy(){
        if (this.type === 'file'){
            this.destroyTip();
        }
    }
};
