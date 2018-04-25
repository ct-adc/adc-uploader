import utility from 'ct-utility';
export default{
    //接受的文件类型
    accept: {
        type: Object,
        default(){
            return null;
        }
    },
    //是否选择完文件后自动上传
    auto: {
        type: Boolean, // 需实现并测试
        default: false
    },
    //是否启用自动分片
    chunked: {
        type: Boolean,
        default: false
    },
    chunkSize: {
        type: Number,
        default: 5242880
    },
    chunkRetry: {
        type: Number,
        default: 2
    },
    //是否需要压缩文件
    compress: {
        type: [Boolean, Object],
        default(){
            return false;
        }
    },
    //是否禁用
    disabled: {
        type: Boolean,
        default: false
    },
    //是否可以重复上传同样的文件
    duplicate: {
        type: Boolean,
        default: false
    },
    //文件数量限制
    fileNumLimit: {
        type: Number,
        default: 5
    },
    //初始文件列表，每一项为一个图片在服务器上的地址
    files: {
        type: Array,
        default(){
            return [];
        }
    },
    //单个文件的大小限制
    fileSingleSizeLimit: {
        type: Number,
        default: 2 * 1024 * 1024
    },
    //文件整体大小限制
    fileSizeLimit: {
        type: Number,
        default: 10 * 1024 * 1024
    },
    //设置文件上传域的name
    fileVal: {
        type: String,
        default: 'file'
    },
    //需要随图片一起上传的数据
    formData: {
        type: Object,
        default(){
            return {};
        }
    },
    //需要自定义的请求hearder
    headers: {
        type: Object,
        default(){
            return {};
        }
    },
    //请求方式
    method: {
        type: String,
        default: 'post'
    },
    //是否支持文件多选
    multiple: {
        type: Boolean,
        default: false
    },
    //请求过滤函数，对响应数据进行过滤，生成固定格式的上传结果对象
    resultFilter: {
        type: Function,
        default(){
            return function(res){
                res = utility.objTransfer.lowerKey(res);

                if (res.code === 0){
                    return {
                        status: true,
                        path: res.data.path
                    };
                } else {
                    return {
                        status: false,
                        path: ''
                    };
                }
            };
        }
    },
    sendAsBinary: {
        type: Boolean,
        default: false
    },
    //上传接口地址
    server: {
        type: String,
        default: ''
    },
    //缩略图生成规则
    thumb: {
        type: Object,
        default(){
            return {
                width: 110,
                height: 110,

                // 图片质量，只有type为`image/jpeg`的时候才有效。
                quality: 70,

                // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                allowMagnify: true,

                // 是否允许裁剪。
                crop: true,

                // 为空的话则保留原有图片格式。
                // 否则强制转换成指定的类型。
                type: ''
            };
        }
    },
    //上传并发数。允许同时最大上传进程数
    threads: {
        type: Number,
        default: 3,
    },
    //错误提示
    tip: {
        type: Object,
        default(){
            return {
                message: '错误提示',
                direction: 'bottom'
            }
        }
    }
};
