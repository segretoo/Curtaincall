// pages/api/musical/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const KOPIS_API_KEY = process.env.NEXT_PUBLIC_KOPIS_API_KEY;
    const apiUrl = `https://kopis.or.kr/openApi/restful/pblprfr/${id}?service=${KOPIS_API_KEY}`;

    try {
        const response = await axios.get(apiUrl);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching musical details:', error);
        res.status(500).json({ error: 'Failed to fetch musical details' });
    }
}
