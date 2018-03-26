export default{
    props: {
        buttonText: {
            type: String,
            default: '导入文件'
        }
    },
    data(){
        return {
            type: 'file'
        };
    },
    computed: {
        button(){
            return this.$refs.root;
        }
    },
    methods: {
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
        this.destroyTip();
    }
};
