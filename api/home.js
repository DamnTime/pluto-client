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
