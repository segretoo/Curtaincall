import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { parseStringPromise } from 'xml2js'; // xml2js 라이브러리의 Promise 기반 XML 파싱 함수

const KOPIS_API_KEY = process.env.NEXT_PUBLIC_KOPIS_API_KEY; // 환경변수에서 KOPIS API 키 가져오기

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!KOPIS_API_KEY) {
            throw new Error('KOPIS API key is missing!');
        }

        // 오늘 날짜 구하기 (YYYYMMDD 형식)
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
        const dd = String(today.getDate()).padStart(2, '0');
        const stdate = `${yyyy}${mm}${dd}`; // 'YYYYMMDD' 형식의 stdate

        // eddate는 오늘로부터 한 달 후 날짜로 설정
        const nextMonth = new Date(today);
        nextMonth.setMonth(today.getMonth() + 1); // 한 달 후로 설정
        const eddate = `${nextMonth.getFullYear()}${String(nextMonth.getMonth() + 1).padStart(2, '0')}${String(
            nextMonth.getDate() 
        ).padStart(2, '0')}`;

        const response = await axios.get('https://kopis.or.kr/openApi/restful/pblprfr', {
            params: {
                service: KOPIS_API_KEY,
                stdate, // 오늘 날짜로 설정된 시작일
                eddate, // 한 달 후 날짜로 설정된 종료일
                cpage: '1',
                rows: '5',
                shcate: 'GGGA',
                // signgucode: '11',
            },
        });

        // XML 응답을 JSON으로 변환
        const parsedData = await parseStringPromise(response.data);
        console.log('Parsed KOPIS API Response:', parsedData);

        // XML 데이터에서 공연 정보를 추출하여 클라이언트에 반환
        const musicals = parsedData.dbs.db;
        res.status(200).json(musicals); // JSON 응답으로 변환한 공연 데이터 반환
    } catch (error: any) {
        console.error('Error fetching musicals from KOPIS API:', error.message);
        res.status(500).json({
            message: 'Error fetching musicals from KOPIS API',
            error: error.message,
        });
    }
}
