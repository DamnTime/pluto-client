import Axios from 'axios'
import request from '@/utils/request'

// 获取文章分类列表
export const fetchCates = () => {
  return request.get('/web/category-list')
}

// 获取文章列表
export const fetchArticles = (params) => {
  return request.get('/web/getArticleByCate', params)
}

// 获取最新文章列表
export const fetchArticlesLatest = (params) => {
  return request.get('/web/getArticleLatest', params)
}

// 获取文章详情
export const fetchArticleDetail = (params) => {
  return request.get('/web/getArticleDetail', params)
}

// 搜索文章列表
export const fetchArticleSearchList = (params) => {
  return request.get('/web/searchArticle', params)
}

// 获取所有用户标签
export const fetchUserTags = (params) => {
  return request.get('/web/userTag', params)
}

// 注册
export const register = (params) => {
  return request.post('/web/register', params)
}

// 登录
export const login = (params) => {
  return request.post('/web/login', params)
}

// 创建评论
export const createComment = (params) => {
  return request.post('/web/comment', params)
}

// 根据文章id查找评论列表
export const getCommentList = (params) => {
  return request.get('/web/comment-by-article', params)
}

// 更新文章阅读数
export const updateArticlePageNum = (params) => {
  return request.post('/web/updateArticlePageNum', params)
}

// 获取每日一言
export const getDailyWords = (params) => {
  return Axios.get('https://v1.hitokoto.cn/?c=j', params)
}
