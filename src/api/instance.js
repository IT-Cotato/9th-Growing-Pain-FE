import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// 로컬스토리지에서 토큰을 가져오는 함수
const getSessionStorage = (key) => {
	return sessionStorage.getItem(key);
};

// 로컬스토리지에 토큰을 저장하는 함수
const setSessionStorage = (key, value) => {
	sessionStorage.setItem(key, value);
};

// 로컬스토리지에서 토큰을 제거하는 함수
const removeSessionStorage = (key) => {
	sessionStorage.removeItem(key);
};

// JWT 만료 여부를 체크하는 함수
const CheckJWTExp = (token) => {
	// const decodedToken = parseJWT(token);
	const decodedToken = jwtDecode(token);
	console.log('Decoded Token:', decodedToken); // 디코딩된 토큰 로그 확인
	if (!decodedToken || !decodedToken.exp) {
		return 'INVALID_TOKEN';
	}

	const currentTime = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로 얻기
	console.log('Current Time:', currentTime, 'Token Expiry:', decodedToken.exp); // 현재 시간과 만료 시간 비교

	if (decodedToken.exp < currentTime) {
		return 'ACCESS_EXP_MESSAGE'; // 토큰이 만료된 경우
	}

	return 'VALID_TOKEN'; // 토큰이 유효한 경우
};

// Base URL 및 인스턴스 생성
const baseURL = 'http://43.201.210.211:8080';
const instance = axios.create({
	baseURL: baseURL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
	async (config) => {
		let accessToken = getSessionStorage('accessToken');
		let refreshToken = getSessionStorage('refreshToken');

		// AccessToken 유효성 검사
		if (accessToken) {
			const tokenStatus = CheckJWTExp(accessToken);

			if (tokenStatus === 'ACCESS_EXP_MESSAGE' && refreshToken) {
				try {
					// AccessToken 만료 시, RefreshToken을 이용하여 새 AccessToken 요청
					const response = await axios.post('/api/auth/reissue', {
						refreshToken: refreshToken,
					});

					if (response.status === 201) {
						// 새로운 토큰을 로컬스토리지에 저장
						accessToken = response.data.data.token.accessToken; // 데이터 구조 변경
						refreshToken = response.data.data.token.refreshToken; // 데이터 구조 변경
						setSessionStorage('accessToken', accessToken);
						setSessionStorage('refreshToken', refreshToken);
						console.log('새로운 토큰을 로컬스토리지에 저장 완료!');
					}
				} catch (error) {
					console.error('리이슈 실패:', error);
					// removeSessionStorage('accessToken');
					// removeSessionStorage('refreshToken');
					// 필요 시 로그아웃 처리
				}
			} else {
				console.log('유효기간이 남아있습니다.');
			}
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
	async (response) => {
		// 응답 데이터에서 토큰이 있을 경우
		if (response.data.data) {
			const { accessToken, refreshToken } = response.data.data || {}; // 데이터 구조 변경

			if (accessToken) {
				const checkAcces = jwtDecode(accessToken);
				console.log('Decoded Token:', checkAcces); // 디코딩된 토큰 로그 확인
				removeSessionStorage('accessToken');
				removeSessionStorage('role');
				removeSessionStorage('memberId');
				setSessionStorage('accessToken', accessToken);
				setSessionStorage('role', checkAcces.role);
				setSessionStorage('memberId', checkAcces.memberId);
			}
			if (refreshToken) {
				const checkRefresh = jwtDecode(refreshToken);
				console.log('Decoded Token:', checkRefresh); // 디코딩된 토큰 로그 확인
				removeSessionStorage('refreshToken');
				setSessionStorage('refreshToken', refreshToken);
			}
		} else {
			console.log(response.data.message);
		}

		return response;
	},
	(error) => {
		console.error('Response error:', error);
		return Promise.reject(error);
	},
);

export default instance;
