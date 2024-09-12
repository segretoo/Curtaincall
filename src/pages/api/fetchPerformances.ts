import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const KOPIS_API_KEY = process.env.NEXT_PUBLIC_KOPIS_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { prfstate, startDate, endDate, location, page = '1', rows = '16' } = req.query;

    try {
        if (!KOPIS_API_KEY) {
            throw new Error('KOPIS API key is missing!');
        }

        const response = await axios.get('https://kopis.or.kr/openApi/restful/pblprfr', {
            params: {
                service: KOPIS_API_KEY,
                stdate: startDate || '20240101',
                eddate: endDate || '20241231',
                cpage: page,
                rows: rows,
                prfstate: prfstate || '', // 상태 필터
                signgucode: location || '', // 지역 필터
                shcate: 'GGGA',
            },
        });

        const parsedData = await parseStringPromise(response.data);
        const performances = parsedData.dbs.db || [];
        const totalItems = parsedData.dbs.totalCount || performances.length; // 총 아이템 수

        res.status(200).json({
            performances, // 현재 페이지의 공연 데이터
            totalItems, // 전체 데이터 수
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Error fetching performances',
            error: error.message,
        });
    }
}
