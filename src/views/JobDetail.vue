<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-13 16:25:05
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-13 16:27:07
 * @FilePath: /micro-child-vue2-job/src/views/JobDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="job-detail">
    <!-- 顶部背景区域 -->
    <div class="job-banner">
      <div class="job-banner-content">
        <h1 class="job-title">{{ jobInfo.jobTitle }}</h1>
        <div class="job-salary">{{ jobInfo.salaryRange }}</div>
        <div class="job-basic-info">
          <span><i class="el-icon-location"></i>{{ jobInfo.workCity }}</span>
          <span><i class="el-icon-time"></i>{{ jobInfo.workExperience }}</span>
          <span><i class="el-icon-user"></i>{{ jobInfo.ageRange }}</span>
        </div>
        <div class="job-tags">
          <el-tag v-for="tag in jobInfo.welfareTags" :key="tag" size="small">{{
            tag
          }}</el-tag>
        </div>
        <div class="job-update-time">{{ jobInfo.refreshTimeStr }}</div>
      </div>
    </div>

    <div class="job-detail-container">
      <div class="job-content">
        <!-- 职位描述 -->
        <div class="description-section">
          <h2>职位描述</h2>
          <div class="description-content">{{ jobInfo.jobDescription }}</div>
        </div>

        <!-- HR信息 -->
        <div class="hr-section">
          <div class="hr-avatar">
            <img :src="jobInfo.hrHeadPortrait" :alt="jobInfo.hrName" />
          </div>
          <div class="hr-info">
            <div class="hr-name">{{ jobInfo.hrName }}</div>
            <div class="hr-title">{{ jobInfo.hrPost }}</div>
          </div>
        </div>
      </div>

      <!-- 右侧公司信息 -->
      <div class="company-sidebar">
        <div class="company-info-card">
          <h3>公司基本信息</h3>
          <div class="company-header">
            <img
              :src="jobInfo.enterpriseLogo"
              :alt="jobInfo.enterpriseName"
              class="company-logo"
            />
            <div class="company-name">{{ jobInfo.enterpriseName }}</div>
          </div>
          <div class="company-details">
            <div class="detail-item">
              <i class="el-icon-office-building"></i>
              <span>{{ jobInfo.scale }}</span>
            </div>
            <div class="detail-item">
              <i class="el-icon-monitor"></i>
              <span>{{ jobInfo.industry }}</span>
            </div>
            <div class="detail-item">
              <i class="el-icon-medal"></i>
              <span>{{ jobInfo.financing }}</span>
            </div>
          </div>
          <el-button type="primary" class="company-link">公司主页 >></el-button>
        </div>

        <!-- 该公司其他职位 -->
        <div class="other-jobs-section">
          <h3>该公司其他职位</h3>
          <div class="other-job-list">
            <div
              v-for="job in jobInfo.otherJobs"
              :key="job.jobId"
              class="other-job-item"
              @click="goToJobDetail(job.jobId)"
            >
              <div class="job-header">
                <h4>{{ job.jobTitle }}</h4>
                <span class="salary">{{ job.salaryRange }}</span>
              </div>
              <div class="job-footer">
                <div class="job-tags">
                  <span>{{ job.workCity }}</span>
                  <span>{{ job.workExperience }}</span>
                </div>
                <span class="update-time">{{ job.refreshTimeStr }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getJobDetail } from '@/api/findJobApi';

export default {
  name: 'JobDetail',
  data() {
    return {
      jobInfo: {
        jobTitle: '',
        salaryRange: '',
        workCity: '',
        workExperience: '',
        ageRange: '',
        jobDescription: '',
        welfareTags: [],
        refreshTimeStr: '',
        hrName: '',
        hrPost: '',
        hrHeadPortrait: '',
        enterpriseName: '',
        enterpriseLogo: '',
        financing: '',
        industry: '',
        scale: '',
        otherJobs: [],
      },
    };
  },
  created() {
    const jobId = this.$route.params.id;
    this.getJobDetail(jobId);
  },
  methods: {
    async getJobDetail(jobId) {
      try {
        const res = await getJobDetail({ jobId });
        if (res.code === 200) {
          this.jobInfo = res.data;
        }
      } catch (error) {
        console.error('获取职位详情失败：', error);
        this.$message.error('获取职位详情失败');
      }
    },
    goToJobDetail(jobId) {
      if (jobId === this.$route.params.id) return;
      this.$router.push(`/job/${jobId}`);
      this.getJobDetail(jobId);
    },
  },
};
</script>

<style lang="scss" scoped>
.job-detail {
  min-height: 100vh;
  background-color: #f5f7fa;

  .job-banner {
    background: linear-gradient(135deg, #2b3a55 0%, #445374 100%);
    padding: 40px 0;
    color: #fff;

    .job-banner-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;

      .job-title {
        font-size: 28px;
        margin: 0 0 16px;
      }

      .job-salary {
        font-size: 24px;
        color: #ff6b6b;
        margin-bottom: 16px;
      }

      .job-basic-info {
        margin-bottom: 16px;

        span {
          margin-right: 24px;
          font-size: 14px;

          i {
            margin-right: 8px;
          }
        }
      }

      .job-tags {
        margin-bottom: 16px;

        .el-tag {
          margin-right: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          border: none;
          color: #fff;
        }
      }

      .job-update-time {
        font-size: 12px;
        opacity: 0.8;
      }
    }
  }

  .job-detail-container {
    max-width: 1200px;
    margin: -40px auto 0;
    padding: 0 20px;
    display: flex;
    gap: 24px;

    .job-content {
      flex: 1;
      background: #fff;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;

      .description-section {
        margin-bottom: 24px;

        h2 {
          font-size: 18px;
          margin: 0 0 16px;
          color: #333;
        }

        .description-content {
          color: #666;
          line-height: 1.6;
        }
      }

      .hr-section {
        display: flex;
        align-items: center;
        padding: 16px;
        background: #f8f9fc;
        border-radius: 8px;

        .hr-avatar {
          width: 48px;
          height: 48px;
          margin-right: 16px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
        }

        .hr-info {
          .hr-name {
            font-size: 16px;
            color: #333;
            margin-bottom: 4px;
          }

          .hr-title {
            font-size: 14px;
            color: #666;
          }
        }
      }
    }

    .company-sidebar {
      width: 300px;

      .company-info-card {
        background: #fff;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 24px;

        h3 {
          font-size: 16px;
          margin: 0 0 16px;
          color: #333;
        }

        .company-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          .company-logo {
            width: 48px;
            height: 48px;
            border-radius: 4px;
            margin-right: 12px;
          }

          .company-name {
            font-size: 16px;
            color: #333;
          }
        }

        .company-details {
          margin-bottom: 16px;

          .detail-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            color: #666;

            i {
              margin-right: 8px;
            }
          }
        }

        .company-link {
          width: 100%;
        }
      }

      .other-jobs-section {
        background: #fff;
        border-radius: 8px;
        padding: 24px;

        h3 {
          font-size: 16px;
          margin: 0 0 16px;
          color: #333;
        }

        .other-job-item {
          padding: 16px;
          border-bottom: 1px solid #eee;
          cursor: pointer;

          &:last-child {
            border-bottom: none;
          }

          &:hover {
            background: #f8f9fc;
          }

          .job-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;

            h4 {
              margin: 0;
              font-size: 14px;
              color: #333;
            }

            .salary {
              color: #ff6b6b;
              font-size: 14px;
            }
          }

          .job-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;

            .job-tags {
              color: #666;

              span {
                margin-right: 8px;
              }
            }

            .update-time {
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>
