## 更新日志

### 1.0.0

*todo*

- 修复 修改fileNumLimit fileSingleSizeLimit fileSizeLimit的默认值为undefined，即不限

- 新增 新增hasList属性 针对文件上传

- 新增 在runtime-success时回传response，方便外部使用


### 1.0.0-alpha.3

*2018-05-17*

- 修复 图片上传时控件渲染后没有及时设置picker中div宽高的情况下，设置定时器轮询操作来设置宽高

### 1.0.0-alpha.2

*2018-04-27*

- 修改 修改thumb默认值为保留原始图片类型

- 新增 新增hasPreview

- 修复 当为图片上传时，初始化uploader后将webuploader-pick中的div样式设置为thumbnail的宽高，避免webuploader元素对不明确宽高的dom初始化后，input和label尺寸变为1*1

### 1.0.0-alpha.1

*2018-04-09*

发布1.0.0-alpha.1