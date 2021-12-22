# simle-vue-router
### vue-router简单实现原理
1. 插件要实现自己的install方法，通过`vue use(VueRouter)`来调用插件的install方法。其中`install`方法通过Vue的mixin在`beforeCreate` 时机将路由挂在到vue的prototype上。
2. 其次，如何将插件的router挂在到vue的proptotype上面。其中插件的`install`方法会拿到vue实例的`$options`，其中`$options`就是`new Vew({})`的入参。由于在`new vue`时候传入了`router`所以通过options可以拿到。
3. 路由实现
  - hash模式通过location.hash = 'xx'进行替换。通过`location.hash`获取路由，由于带有`#`，需要`location.hash.slice(1)`;
  - history模式，有两种方法`pushState()`和`replaceState`，其中history模式通过监听`popstate`，路由每次变化都会触发该事件。通过`location.pathname`获取路由。

4. router-view和router-link的实现。本质两个都是vue component。传入的router，我们通过vueRouter class内部为我们创建了path到component的映射。因此当我们拿到当前的路由时，那么可以拿到对应的component，通过vue的`h`函数来将组件渲染出来。router-link默认是一个a标签，通过传入`to`来代表跳转目标路由。通过`h`函数创建对应的a标签，跳转后再次通过router-view渲染。


#### 启动
 - yarn 
 - yarn serve
  