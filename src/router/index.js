/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-11 14:06:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-11 14:11:26
 * @FilePath: /micro-child-vue2-job/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import JobDetail from '../views/JobDetail.vue'

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    component: () => import('@/views/FindJob.vue'),
  },
  {
    path: '/job/:id',
    name: 'JobDetail',
    component: JobDetail
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
