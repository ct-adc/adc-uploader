<template>
    <div class="ct-adc-importer">
        <div ref="root"
             style="display:inline-block"
              :class="{'disabled-wrap': disabled}"
              :data-placement="tip.direction"
              :data-original-title="tip.message">
            <!--webuploader-container是后续上传插件往外层元素span上加入的类名，这里直接绑定到class上是为了避免后续dom渲染时保持span有该类-->
            <i class="glyphicon glyphicon-import"></i>
            <span class="title">{{ buttonText }}</span>
        </div>
        <ul class="list text-muted">
            <li v-for="(item, index) in fileList">
                <span class="glyphicon glyphicon-file"></span>
                {{item.name}}
                <span v-if="item.status === ''" class="glyphicon glyphicon-hourglass"></span>
                <span v-if="item.status === 'error'" class="glyphicon glyphicon-remove-circle red"></span>
                <span v-if="item.status === 'complete'" class="glyphicon glyphicon-ok-circle text-success"></span>
                <span v-if="item.status === 'progress'" class="glyphicon glyphicon-refresh rotate"></span>
                <span class="glyphicon glyphicon-remove" @click="removeFile(index)"></span>
            </li>
        </ul>
    </div>
</template>
<script>
    import mixin from './component/index';
    export default{
        mixins: [mixin],
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
</script>
<style lang="scss">
    @import '~./css/importer.scss';
</style>
