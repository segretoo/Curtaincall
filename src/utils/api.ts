// import axios from 'axios';

// export const fetchPerformances = async () => {
//     try {
//         const response = await axios.get('https://kopis.or.kr/openApi/restful/pblprfr', {
//             params: {
//                 service: process.env.KOPIS_API_KEY,
//                 stdate: '20240101',
//                 eddate: '20241231',
//                 cpage: '1',
//                 rows: '20',
//                 shcate:'GGGA'
//             },
//         });

//         return response.data.dbs.db;
//     } catch (error) {
//         console.error('Error fetching performances:', error);
//         return [];
//     }
// };


import axios from 'axios';

export const fetchMusicals = async () => {
    try {
        // Next.js API 라우트로 요청을 보내서 CORS 문제를 우회
        const response = await axios.get('/api/musicals');
        return response.data;
    } catch (error) {
        console.error('Error fetching musicals from local API route:', error);
        return [];
    }
};


// export const fetchPerformances = async () => {
//   // 실제 API URL과 KEY를 여기에 입력해야 합니다.
//   const response = await fetch('/api/performances');
//   const data = await response.json();

//   return data; // 공연 목록 데이터 반환
// };

// 공연 목록을 가져오는 함수
export const fetchPerformances = async (params: {
    status?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    page?: number;
    rows?: number;
}) => {
    try {
        const response = await axios.get('/api/fetchPerformances', {
            params: { ...params },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching performances:', error);
        return [];
    }
};

// import axios from 'axios';

// // 공연 목록을 가져오는 함수
// export const fetchPerformances = async (params: {
//     status?: string;
//     startDate?: string;
//     endDate?: string;
//     location?: string;
//     page?: number;
//     rows?: number;
// }) => {
//     try {
//         const response = await axios.get('/api/fetchPerformances', {
//             params: { ...params },
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching performances:', error);
//         return [];
//     }
// };

// // 뮤지컬 목록을 가져오는 함수
// export const fetchMusicals = async () => {
//     try {
//         const response = await axios.get('/api/fetchMusicals');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching musicals:', error);
//         return [];
//     }
// };



// import { parseStringPromise } from 'xml2js';


// src/utils/api.ts


// 각 뮤지컬의 상세 정보를 가져오는 함수

// export const fetchMusicalDetails = async (mt20id: string) => {
//     try {
//         const response = await axios.get(`/api/musical/${mt20id}`, {
//             headers: {
//                 'Cache-Control': 'no-cache', // 캐시 우회
//             },
//         });
//         return response.data; // 뮤지컬 상세 정보 반환
//     } catch (error) {
//         console.error(`Error fetching musical details for mt20id ${mt20id}:`, error);
//         return null;
//     }
// };

import { parseStringPromise } from 'xml2js'; // xml2js를 사용하여 XML 응답을 JSON으로 변환

export const fetchMusicalDetails = async (mt20id: string) => {
    try {
        const response = await axios.get(`/api/musical/${mt20id}`);

        // XML을 JSON으로 변환
        const parsedData = await parseStringPromise(response.data);

        // 파싱된 데이터 확인
        console.log('Parsed musical details:', parsedData);

        // 실제 뮤지컬 정보를 반환 (예: parsedData.dbs.db[0])
        return parsedData.dbs.db[0]; // 필요한 정보만 추출
    } catch (error) {
        console.error(`Error fetching musical details for mt20id ${mt20id}:`, error);
        return null;
    }
};