# 更新日志

## 2024-04-12

### 接口mock调整及列表数据展示

#### 功能改动
1. 添加接口代理配置
   - 新增 `.env.development` 文件配置环境变量
   - 在 `vue.config.js` 中添加代理配置，支持接口转发
   - 配置 mock 接口地址：`http://127.0.0.1:4523/m1/6202454-5895755-default`

2. 调整职位列表样式
   - 移除列表容器背景色
   - 优化职位卡片样式
   - 调整字体大小和颜色
   - 添加卡片悬停效果
   - 优化标签样式

3. 完善列表数据展示
   - 展示职位基本信息（标题、薪资）
   - 展示公司信息（Logo、名称、行业）
   - 展示职位标签（地点、经验、学历）
   - 展示福利标签
   - 展示技能标签
   - 添加分页功能

#### 文件变更
- 新增文件：
  - `.env.development`：环境配置文件

- 修改文件：
  - `src/api/findJobApi.js`：添加接口调试日志
  - `src/assets/scss/findjob.scss`：调整样式
  - `src/utils/request.js`：调整请求配置
  - `src/views/FindJob.vue`：完善列表展示
  - `vue.config.js`：添加代理配置

#### 接口数据结构
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "list": [
            {
                "jobId": "job-100",
                "jobTitle": "产品经理",
                "enterpriseName": "腾讯科技",
                "enterpriseLogo": "https://logo.clearbit.com/mi.com",
                "industry": "人工智能",
                "jobType": "全职",
                "education": "本科",
                "workCity": "北京市",
                "workExperience": "1年",
                "salaryMin": 10642,
                "salaryMax": 17846,
                "salaryRange": "10642-17846元/月",
                "salaryUnit": "月",
                "welfareTags": [
                    "五险一金",
                    "交通补贴",
                    "加班补助"
                ],
                "skillTags": [
                    "Python",
                    "TensorFlow",
                    "PyTorch"
                ],
                "refreshTimeStr": "2024年4月12日"
            }
        ],
        "total": 25
    }
}
```

#### 样式规范
- 主色调：#4e6ef2
- 标题文字：16px, #333
- 薪资文字：16px, #ff6b6b
- 普通文字：13px, #666
- 次要文字：12px, #999
- 标签样式：
  - 背景色：#f8f9fc
  - 文字颜色：#666
  - 圆角：2px
- 卡片样式：
  - 背景色：#fff
  - 内边距：24px
  - 圆角：4px
  - 阴影：0 1px 3px rgba(0, 0, 0, 0.02)
  - 悬停阴影：0 4px 12px rgba(0, 0, 0, 0.08) 