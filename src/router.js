import Vue from 'vue'
import VueRouter from 'vue-router'
import localSave from '@/tools/localSave'
Vue.use(VueRouter);
//解决路由重复点击报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
    mode: 'history',
    //配置路由规则:即设置路径对应的组件
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('./views/login.vue'),
            beforeEnter(to, from, next) {
                let user = localSave.getItem('user');
                //如果登录过直接去首页
                if (user) {
                    next('/main');
                }else{
                    next();
                }
            }

        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/register.vue')

        },
        {
            path: '/main',
            name: 'main',
            component: () => import("./views/main.vue"),
            children: [
                {
                    path:'/main',
                    redirect:'/home'

                },
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('./views/home.vue')
                },
                {
                    path: '/order',
                    name: 'order',
                    component: () => import('./views/order.vue')
                },
                {
                    path: '/user',
                    name: 'user',
                    component: () => import('./views/user.vue')
                },
                {
                    path: '/setup',
                    name: 'setup',
                    component: () => import('./views/setup.vue')
                }
            ]
        }
    ]
})