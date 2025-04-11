<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-11 14:09:06
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-11 17:05:13
 * @FilePath: /micro-child-vue2-job/src/views/FindJob.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="find-job">
    <!-- 搜索区域 -->
    <div class="search-banner">
      <div class="search-container">
        <el-input
          size="large"
          v-model="searchForm.keyword"
          placeholder="请输入职位名称或公司，例如：销售"
          class="search-input"
          clearable
        >
          <el-button
            size="large"
            slot="append"
            type="primary"
            @click="handleSearch"
            >搜索</el-button
          >
        </el-input>
      </div>
    </div>

    <!-- 主体内容区 -->
    <div class="main-content">
      <!-- 筛选条件区域 -->
      <div class="filter-container">
        <div class="filter-area">
          <!-- 职位类别 -->
          <div class="filter-item">
            <span class="label">职位：</span>
            <div class="options">
              <el-tag
                :class="{ active: searchForm.category === '' }"
                @click="handleCategoryClick('')"
                >全部</el-tag
              >
              <el-tag
                v-for="category in displayCategories"
                :key="category.name"
                :class="{ active: searchForm.category === category.name }"
                @click="handleCategoryClick(category.name)"
                >{{ category.name }}</el-tag
              >
            </div>
            <div class="more-btn" @click="toggleCategories">
              <span>更多</span>
              <i
                :class="[
                  'el-icon-arrow-down',
                  { 'is-reverse': showAllCategories },
                ]"
              ></i>
            </div>
          </div>

          <!-- 工作地点 -->
          <div class="filter-item">
            <span class="label">地点：</span>
            <div class="options">
              <el-tag
                :class="{ active: searchForm.location === '' }"
                @click="handleLocationClick('')"
                >全部</el-tag
              >
              <el-tag
                v-for="city in displayCities"
                :key="city"
                :class="{ active: searchForm.location === city }"
                @click="handleLocationClick(city)"
                >{{ city }}</el-tag
              >
            </div>
            <div class="more-btn" @click="toggleCities">
              <span>更多</span>
              <i
                :class="['el-icon-arrow-down', { 'is-reverse': showAllCities }]"
              ></i>
            </div>
          </div>

          <!-- 薪资范围 -->
          <div class="filter-item">
            <span class="label">薪资：</span>
            <div class="options">
              <el-tag
                :class="{ active: searchForm.salary === '' }"
                @click="handleSalaryClick('')"
                >全部</el-tag
              >
              <el-tag
                v-for="range in salaryRanges"
                :key="range.value"
                :class="{ active: searchForm.salary === range.value }"
                @click="handleSalaryClick(range.value)"
                >{{ range.label }}</el-tag
              >
            </div>
          </div>
        </div>
      </div>

      <!-- 列表和推荐区域 -->
      <div class="content-wrapper">
        <!-- 职位列表区域 -->
        <div class="job-list">
          <el-empty
            v-if="jobList.length === 0"
            description="暂无职位"
          ></el-empty>
          <div v-else class="job-items">
            <!-- 这里添加职位列表内容 -->
          </div>

          <!-- 分页 -->
          <div class="pagination" v-if="total > 0">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :current-page.sync="searchForm.page"
              :page-size="searchForm.pageSize"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>

        <!-- 推荐企业区域 -->
        <div class="recommend-companies">
          <div class="recommend-title">推荐企业</div>
          <div class="company-list">
            <!-- 这里添加推荐企业内容 -->
            <el-card class="company-card" shadow="hover">
              <div class="placeholder-img"></div>
              <div class="company-name">虚位以待</div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { categories, salaryRanges } from '@/utils/dictionary';
import { searchJobList } from '@/api/findJobApi';
import '@/assets/scss/findjob.scss';

export default {
  name: 'FindJob',
  data() {
    return {
      categories,
      salaryRanges,
      searchForm: {
        keyword: '',
        category: '',
        location: '',
        salary: '',
        page: 1,
        pageSize: 10,
      },
      jobList: [],
      total: 0,
      showAllCategories: false,
      showAllCities: false,
      cities: [
        '北京',
        '上海',
        '广州',
        '深圳',
        '杭州',
        '成都',
        '武汉',
        '西安',
        '南京',
        '天津',
        '重庆',
        '苏州',
        '长沙',
      ],
    };
  },
  computed: {
    displayCategories() {
      return this.showAllCategories
        ? this.categories
        : this.categories.slice(0, 8);
    },
    displayCities() {
      return this.showAllCities ? this.cities : this.cities.slice(0, 8);
    },
  },
  methods: {
    // 搜索处理
    handleSearch() {
      this.searchForm.page = 1;
      this.getJobList();
    },
    // 获取职位列表
    async getJobList() {
      try {
        const res = await searchJobList(this.searchForm);
        this.jobList = res.data.list || [];
        this.total = res.data.total || 0;
      } catch (error) {
        console.error('获取职位列表失败：', error);
      }
    },
    // 分类点击
    handleCategoryClick(category) {
      this.searchForm.category = category;
      this.handleSearch();
    },
    // 地点点击
    handleLocationClick(location) {
      this.searchForm.location = location;
      this.handleSearch();
    },
    // 薪资点击
    handleSalaryClick(salary) {
      this.searchForm.salary = salary;
      this.handleSearch();
    },
    // 页码改变
    handlePageChange(page) {
      this.searchForm.page = page;
      this.getJobList();
    },
    // 切换分类显示
    toggleCategories() {
      this.showAllCategories = !this.showAllCategories;
    },
    // 切换城市显示
    toggleCities() {
      this.showAllCities = !this.showAllCities;
    },
  },
  created() {
    this.getJobList();
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  width: 1200px;
  margin: 0 auto;

  ::v-deep .el-input__inner {
    height: 48px;
    line-height: 48px;
  }

  ::v-deep .el-input-group__append {
    padding: 0;
    border: none;
    background-color: transparent !important;

    .el-button.el-button--primary {
      height: 48px;
      margin: 0;
      border-radius: 0 4px 4px 0;
      background-color: #4e6ef2 !important;
      border-color: #4e6ef2 !important;
      padding: 12px 24px;
      font-size: 16px;
      color: #fff !important;

      &:hover {
        background-color: #4662d9 !important;
        border-color: #4662d9 !important;
      }

      &:active {
        background-color: #3d53c4 !important;
        border-color: #3d53c4 !important;
      }
    }
  }
}
</style>
