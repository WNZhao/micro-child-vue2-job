<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-11 14:09:06
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-18 13:57:05
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
            <div
              v-for="job in jobList"
              :key="job.jobId"
              class="job-item"
              @click="goToJobDetail(job.jobId)"
            >
              <div class="job-info">
                <div class="left">
                  <div class="job-title">
                    <h3>{{ job.jobTitle }}</h3>
                    <span class="salary">{{ job.salaryRange }}</span>
                  </div>
                  <div class="job-tags">
                    <span class="tag">{{ job.workCity }}</span>
                    <span class="tag">{{ job.workExperience }}</span>
                    <span class="tag">{{ job.education }}</span>
                  </div>
                  <div class="welfare-tags">
                    <el-tag
                      v-for="tag in job.welfareTags"
                      :key="tag"
                      size="small"
                      type="info"
                      >{{ tag }}</el-tag
                    >
                  </div>
                </div>
                <div class="right">
                  <div class="company-info">
                    <img
                      :src="job.enterpriseLogo"
                      :alt="job.enterpriseName"
                      class="company-logo"
                    />
                    <div class="company-detail">
                      <div class="company-name">{{ job.enterpriseName }}</div>
                      <div class="company-tags">
                        <span>{{ job.industry }}</span>
                        <span>200人以上</span>
                      </div>
                    </div>
                  </div>
                  <div class="refresh-time">{{ job.refreshTimeStr }}</div>
                </div>
              </div>
              <div class="skill-tags">
                <el-tag
                  v-for="tag in job.skillTags"
                  :key="tag"
                  size="small"
                  effect="plain"
                  >{{ tag }}</el-tag
                >
              </div>
            </div>
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
    goToJobDetail(jobId) {
      console.log('jobId', jobId);

      this.$router.push(`/job/${jobId}`);
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

.job-items {
  .job-item {
    background: #fff;
    padding: 24px;
    border-radius: 4px;
    margin-bottom: 16px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .job-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      .left {
        flex: 1;
        margin-right: 24px;

        .job-title {
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          h3 {
            margin: 0;
            font-size: 16px;
            color: #333;
            font-weight: 500;
            margin-right: 16px;
          }

          .salary {
            color: #ff6b6b;
            font-size: 16px;
            font-weight: 500;
          }
        }

        .job-tags {
          margin-bottom: 12px;

          .tag {
            color: #666;
            margin-right: 16px;
            font-size: 13px;

            &:last-child {
              margin-right: 0;
            }
          }
        }

        .welfare-tags {
          .el-tag {
            margin-right: 8px;
            margin-bottom: 8px;
            border-radius: 2px;
            background: #f8f9fc;
            border-color: transparent;
            color: #666;
          }
        }
      }

      .right {
        .company-info {
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          .company-logo {
            width: 40px;
            height: 40px;
            border-radius: 4px;
            margin-right: 12px;
            object-fit: cover;
          }

          .company-detail {
            .company-name {
              font-size: 14px;
              color: #333;
              margin-bottom: 4px;
            }

            .company-tags {
              color: #999;
              font-size: 12px;

              span {
                margin-right: 12px;

                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
        }

        .refresh-time {
          color: #999;
          font-size: 12px;
          text-align: right;
        }
      }
    }

    .skill-tags {
      .el-tag {
        margin-right: 8px;
        margin-bottom: 8px;
        background: #f8f9fc;
        border-color: transparent;
        color: #666;
      }
    }
  }
}

.pagination {
  text-align: center;
  margin-top: 24px;
}
</style>
