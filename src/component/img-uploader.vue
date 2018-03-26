<template>
    <div class="ct-adc-img-uploader">
        <ul class="file-list ct-adc-img-uploader-list" ref="root" :class="{'disabled-wrap': disabled}">
            <li v-for="(thumb,index) in fileList"
                :style="{width:thumbnailWidth+'px',height:thumbnailHeight+'px'}">
                <img :src="thumb.previewSrc"/>

                <div class="thumbInfo text-center pending" v-if="isPendingImg(thumb.status)">
                    <span class="glyphicon glyphicon-refresh rotate"></span>
                </div>
                <div class="thumbInfo text-center success" v-if="isCompleteImg(thumb.status)">
                    <span class="glyphicon glyphicon-ok"></span>
                </div>
                <div class="thumbInfo text-center error" v-if="isErrorImg(thumb.status)">
                    <span class="glyphicon glyphicon-remove"></span>
                </div>
                <div class="file-panel">
                    <div>
                        <span class="glyphicon glyphicon-search" @click="preview(index)"></span>
                        <span class="glyphicon glyphicon-trash" @click="removeFile(index)"></span>
                    </div>
                </div>
            </li>
            <li class="addThumb" ref="addThumb"
                v-if="fileList.length<fileNumLimit"
                :style="{width:thumbnailWidth+'px',height:thumbnailHeight+'px'}">
                <span class="glyphicon glyphicon-plus"></span>
            </li>
        </ul>
        <div class="modal fade" ref="modal" v-if="fileList.length > 0">
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
</template>

<script>
    import mixin from './component/index';

    export default {
        mixins: [mixin],
        props: {
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
            }
        },
        computed: {
            button() {
                return this.$refs.addThumb;
            }
        },
        data() {
            return {
                type: 'img',
                previewIndex: 0
            };
        },
        methods: {
            preview(index) {
                this.previewIndex = index;
                $(this.$refs.modal).modal('show');
            }
        }
    };
</script>

<style lang="scss">
    @import '~./css/img-uploader.scss';
</style>
