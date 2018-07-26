<template>
    <div class="ct-adc-uploader-wrap">
        <div class="ct-adc-img-uploader" v-if="type==='img'">
            <ul class="file-list ct-adc-img-uploader-list" ref="root" :class="{'disabled-wrap': disabled}">
                <li v-for="(thumb,index) in fileList"
                    :style="{width:thumbnailWidth+'px',height:thumbnailHeight+'px'}" 
                    :key="index">
                    <img :src="thumb.previewSrc"/>

                    <div class="thumbInfo text-center pending" v-if="isPendingFile(thumb.status)">
                        <span class="glyphicon glyphicon-refresh rotate"></span>
                    </div>
                    <div class="thumbInfo text-center success" v-if="isCompleteFile(thumb.status)">
                        <span class="glyphicon glyphicon-ok"></span>
                    </div>
                    <div class="thumbInfo text-center error" v-if="isErrorFile(thumb.status)">
                        <span class="glyphicon glyphicon-remove"></span>
                    </div>
                    <div class="file-panel">
                        <div>
                            <span class="glyphicon glyphicon-search" @click="preview(index)" v-if="hasPreview"></span>
                            <span class="glyphicon glyphicon-trash" @click="removeFile(index)"></span>
                        </div>
                    </div>
                </li>
                <li class="addThumb" ref="addThumb"
                    v-if="typeof fileNumLimit === 'undefined' || fileList.length<fileNumLimit"
                    :style="{width:thumbnailWidth+'px',height:thumbnailHeight+'px'}" 
                    v-on="{click: disabled ? null : pickerClick}">
                    <span class="glyphicon glyphicon-plus"></span>
                </li>
            </ul>
            <div class="modal fade" ref="modal" v-if="hasPreview && fileList.length > 0">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                            <h4 class="modal-title">图片预览</h4>
                        </div>
                        <div class="preview-wrap" v-if="previewIndex !== -1">
                            <template v-if="fileList[previewIndex].url !== ''">
                                <img :src="fileList[previewIndex].url" :alt="fileList[previewIndex].name">
                            </template>
                            <template v-else>
                                <img :src="fileList[previewIndex].previewSrc" alt="fileList[previewIndex].file.name">
                            </template>
                        </div>
                        <div class="modal-footer">
                            <div v-if="fileList[previewIndex].url !== ''">
                                <a class="btn btn-sm btn-primary" target="_blank" :href="fileList[previewIndex].url">
                                    <span class="glyphicon glyphicon-share-alt"></span>
                                    在新标签页中打开图片
                                </a>
                            </div>
                            <div v-else class="text-muted">
                                因该图目前没有完成上传，目前看到的图片只是预览图，尺寸和质量和原图并非完全一致
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ct-adc-importer" v-if="type==='file'">
            <div ref="root"
                 style="display:inline-block"
                 class="webuploader-container"
                 :class="{'disabled-wrap': disabled || loading}"
                 :data-placement="tip.direction"
                 :data-original-title="tip.message" 
                 v-on="{click: disabled ? null : pickerClick}">
                <!--webuploader-container是后续上传插件往外层元素span上加入的类名，这里直接绑定到class上是为了避免后续dom渲染时保持span有该类-->
                <i class="glyphicon glyphicon-import"></i>
                <span class="title">{{ buttonText }}</span>
            </div>
            <ul class="list text-muted" v-if="hasList">
                <li v-for="(item, index) in fileList" :title="item.name" :key="index">
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
    </div>
</template>
<script>
    import mixin from './component/index';
    import spec from './component/spe';
    export default{
        name: 'ct-adc-uploader',
        mixins: [spec, mixin]
    };
</script>
<style lang="scss">
    .ct-adc-uploader-wrap{
        display: inline-block;
    }
    @import '~./css/img-uploader.scss';
    @import '~./css/importer.scss';
</style>
