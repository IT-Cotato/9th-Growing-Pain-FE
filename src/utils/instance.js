import axios from 'axios'

const baseURL = 'http://43.201.210.211:8080'
const accessToken = localStorage.getItem('accessToken');

// 인스턴스 생성
export const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }
})