/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-11 14:27:55
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-11 15:55:51
 * @FilePath: /micro-child-vue2-job/src/api/findJobApi.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import request from '@/utils/request'

// 获取职位分页列表接口
export const searchJobList = (params) => {
  return request({
    url: '/api/recruit/job/searchJobList',
    method: 'post',
    data: params
  })
}

// 获取省市区字典数据
export const getAddressDict = (params) => {
  return request({
    url: '/api/code/common/areaTree.json',
    method: 'get',
    params
  })
}

export default {
  searchJobList,
  getAddressDict
}
