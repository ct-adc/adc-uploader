## ct-adc-uploader

上传组件。支持图片/文件


## 在线demo

[在线demo](https://codepen.io/rubyisapm/pen/BrwVZo)

## 功能点

1. 支持上传图片和文件
2. 支持配置图片上传的各种限制内容（如是否可重复，文件大小，文件类型等）
3. [图片]设置可变的缩略图大小


## 使用

从npm安装ct-adc-uploader

```
npm install ct-adc-uploader --save
```
在代码中使用

```
import Uploader from 'ct-adc-uploader';

//全局注册
Vue.component(Uploader.name, Uploader);

//局部注册

new Vue({
...
components:{
Uploader
},
...
})

```

## props

参数|说明|类型|默认值 | 可选值 | 描述 |
--- | --- | --- | --- | --- | ---- |
accept[详细说明](props.accept) | 上传文件类型限制 | Object | null | object/null | 设置允许上传的图片的格式
auto | 是否自动上传文件 | Boolean | false | true/false | 上传方式为自动还是手动
chunked | 是否分片上传文件 | Boolean | false | true/false |
chunkSize | 分片大小 | Number | 5242880 即5M | 数字 | 如果要分片，分多大一片？ 默认大小为5M. 单位: Byte
chunkRetry | 分片重传 | Number | 2 | 整数 | 如果某个分片由于网络问题出错，允许自动重传多少次
compress[详细说明](props.compress) | 是否压缩图片 | Object/Boolean | false | false或object(压缩选项) | 上传前是否压缩图片false
disabled | 是否禁用组件 | Boolean | false | true/false | 是否禁用组件
duplicate | 是否可重复上传 | Boolean | false | true/false | 是否允许同样的图片上传两张
fileNumLimit | 可上传文件数量 | Number | 5 | 整数 | 最多可上传几个文件
files | 已上传的文件 | Array | [] | 每项为一个文件线上链接的数组 | 初始文件列表
fileSingleSizeLimit | 单个文件的大小限制 | Number | 2 * 1024 * 1024 | 整数 | 单位: Byte
fileSizeLimit | 文件总大小限制 | Number | 10 * 1024 * 1024 | 整数 | 允许上传的文件总大小
fileVal | 文件上传域的name | String | 'file' | 字符串 | 设置文件上传域的name
formData | 表单数据 | Object | {} | | 上传图片时附加的表单数据
headers | 自定义请求hearder | Object | {} | 请求头 | 需要自定义的请求hearder
method | 上传请求类型 | String | 'post' | http方法 | 上传图片的ajax请求类型
multiple | 是否可多选 | Boolean | false | true/false | 是否可多选文件
resultFilter | 上传结果过滤器 | Function | new Function() | | 将响应数据处理为固定格式结果的过滤器
sendAsBinary | 是否以二进制方式方式传输 | Boolean | false | true/false | 是否以二进制方式方式传输, 默认按Blob格式
server | 接口地址 | String | '' | | 上传图片的接口地址，由后端人员给出
threads | 上传并发数 | Number | 3 | 整数 | 允许同时最大上传进程数

### 图片上传配置

参数|说明|类型|默认值 | 可选值 | 描述 |
--- | --- | --- | --- | --- | ---- |
thumbnailWidth | 生成缩略图的宽度 | Number | 110 | | 图片列表中每个图片缩略图的宽度
thumbnailHeight | 生成缩略图的高度 | Number | 110 | | 图片列表中每个图片缩略图的宽度
thumb[详细说明](#props.thumb) | 生成缩略图的规则 | Object| {width: 110,height: 110,quality: 70,allowMagnify: true,crop: true,type: 'image/jpeg'}| 详细说明 | 图片上传时缩略图生成规则

### 文件上传配置

参数|说明|类型|默认值 | 可选值 | 描述 |
--- | --- | --- | --- | --- | ---- |
tip | 禁用时提示文字 | String | '' | 文件 | disabled为true
buttonText | 按钮文字 | String | '' | 任何文字 | 上传按钮上的文字


### props.accept

* accept.extensions

允许的文件后缀，不带点，多个用逗号分割。如'gif,jpg,jpeg,bmp,png'

* accept.mimeTypes

可选择的文件类型。

[常用文件类型查询](https://blog.csdn.net/jk110333/article/details/9412285)

### props.compress

```
{
width: 1600,
height: 1600,

// 图片质量，只有type为`image/jpeg`的时候才有效。
quality: 90,

// 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
allowMagnify: false,

// 是否允许裁剪。
crop: false,

// 是否保留头部meta信息。
preserveHeaders: true,

// 如果发现压缩后文件大小比原来还大，则使用原来图片
// 此属性可能会影响图片自动纠正功能
noCompressIfLarger: false,

// 单位字节，如果图片大小小于此值，不会采用压缩。
compressSize: 0
}
```

### props.thumb

```
{
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
type: 'image/jpeg'
}
```

### props.resultFilter

用于开发者干预响应报文的解析，告诉组件什么样的数据是正确的。
如:
```
function(res){
if (res.IsFinish) {
return {
status: true,
path: res.ReturnPath
};
}
return {
status: false,
msg: res.msg
};
}
```
该函数接收服务端的响应数据，并解析出一个结果对象，该结果对象包含：

* status 上传是否成功

* path 上传成功后服务器返回的路径

* msg 上传失败时服务器返回的错误信息

#
# 方法

### upload

#### 参数列表

无

#### 返回值

undefined

### refreshUploader

刷新图片上传组件，例如当图片组件在初始化时处于隐藏状态，那么显示时需要调用该方法进行刷新以保证组件功能

#### 参数列表

无

#### 返回值

undefined

### resetUploader

重置图片上传组件

#### 参数列表

无

#### 返回值

undefined

### cancelUpload

取消还未上传成功的图片

#### 参数列表

无

#### 返回值

undefined

### isPending

组件是否处于上传状态，即其中有没有正在上传的图片

#### 参数列表

无

#### 返回值

类型: {Boolean}

说明:

1. true - 当前有正在上传的图片
2. false - 当前没有正在上传的图片

### getUploadedFiles

获取组件中已成功上传的文件

#### 参数列表

无

#### 返回值

类型: {Array}

说明:

Array的每一项为一个[file对象](#file)

### getErrorFiles

获取组件中上传失败的文件

#### 参数列表

无

#### 返回值

类型: {Array}

说明:

Array的每一项为一个[file对象](#file)

### getPendingFiles

获取组件中正在上传的文件

#### 参数列表

无

#### 返回值

类型: {Array}

说明:

Array的每一项为一个[file对象](#file)

### getUrls

获取组件中上传成功的文件路径集合

#### 参数列表

无

#### 返回值

类型: {Array}

说明:

Array的每一项为一个图片在服务器上的路径

#
# 事件

### runtime-success

事件名称 | 说明 | 回调参数 | 描述
runtime-success | 文件上传成功 | 无 | 文件上传成功时触发该事件
runtime-error | 实时错误 | 信息对象[Object](详见下方) | 实时错误信息发生变化时触发该事件
change-status | 状态变化 | 无 | 文件上传成功/失败（状态发生改变）时触发该事件

#### runtime-error参数详解

runtime-error的参数为一个信息对象，该对象包含两个属性，分别是code和msg；
##### code 错误码

该错误码有仅由以下几种值：

Q_EXCEED_NUM_LIMIT // '文件数量超出限制!'
Q_EXCEED_SIZE_LIMIT // '文件总大小超出限制!'
Q_TYPE_DENIED // '文件类型不正确!'
F_EXCEED_SIZE // '文件大小超出限制!'
F_DUPLICATE // '文件重复!'
HTTP_ERROR http错误, 此时msg为'http-状态码'形式 如http-404
RESET 重置错误消息，即清空实时错误，表示实时错误已不能表示当前的状态，已被其他的操作清掉；
错误消息被重置有以下两种情况：
1. 图片上传成功；例如第一张图片上传失败，实时错误信息为非空，程序展示该信息，第二张图片上传成功，那么将给出'RESET',即实时错误信息为''，不用继续展示第一张图片的错误信息
2. 图片被删除; 当图片被删除时，因为整个列表发生了变化，此时也会触发runtime-error，并将code设置为'RESET'，因为整个列表被变化，意味着整个列表的状态发生了变化

##### msg 错误信息

以下为不同的code对应的提示信息:

Q_EXCEED_NUM_LIMIT // '文件数量超出限制!'
Q_EXCEED_SIZE_LIMIT // '文件总大小超出限制!'
Q_TYPE_DENIED // '文件类型不正确!'
F_EXCEED_SIZE // '文件大小超出限制!'
F_DUPLICATE // '文件重复!'
HTTP_ERROR // 'http-状态码' 如'http-404'
RESET // ''

## 其他

### <span id = "file">file对象</span>

一个file对象包含以下内容:

* status

- inited 初始状态
- queued 已经进入队列, 等待上传
- progress 上传中
- complete 上传完成并逻辑上成功
- error 上传出错，可重试
- interrupt 上传中断，可续传
- invalid 文件不合格，不能重试上传。会自动从队列中移除
- cancelled 文件被移除

* errorText

文件上传失败或上传成功但逻辑上失败时，保存失败信息

* previewStatus

预览图片的生成状态

* previewSrc

预览图片生成的image data。

注：但是如果是外部传入的图片列表，该值等于图片的真实路径(file.url)

* url

文件在服务器上的路径

* name

文件名称


## 更新日志

[更新日志]({CHANGELOG.md的线上地址})

## 外部资源依赖列表

- [webuploader.html5only.js](http://static.uc108.com/cdn/webuploader/0.1.6/webuploader.html5only.js) V0.1.6+
