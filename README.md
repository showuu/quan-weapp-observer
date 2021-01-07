### 介绍 ###
微信小程序页面数据data侦听器，类似Vue中的watch功能
### 安装 ###
#### 第一步 ####
``` 
# 通过npm安装 
npm i q-wx-observer -S
```
#### 第二步 ####
微信开发者工具中：
* 选择**工具->构建npm**
* 本地设置勾选**使用npm模块**

参考 [npm支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)
### 使用方法 ###
在页面js文件中引入
```
// ES6 
import { setObserver } from 'q-wx-observer' 
// ES5
const { setObserver } = request('q-wx-observer')
```