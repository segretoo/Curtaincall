import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchMusicalDetails } from '@/utils/api';
import styled from 'styled-components';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

// 스타일 정의
const MusicalDetailContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 100px auto;
`;

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const PosterContainer = styled.div`
    position: relative;
`;

const Poster = styled.img`
    width: 300px;
    height: 400px;
    object-fit: cover;
`;

const StarIcon = styled.div<{ isFavourite: boolean }>`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2rem;
    color: ${(props) => (props.isFavourite ? 'gold' : '#ccc')};
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: gold;
    }
`;

const MusicalInfo = styled.div`
    flex: 1;
    margin-left: 40px;
    color: #5f4b8b;
    font-family: 'Arial', sans-serif;
    padding: 20px;

    h1 {
        margin-bottom: 20px;
        font-size: 2rem;
        color: #9e77ed;
    }

    p {
        margin: 10px 0;
    }
`;

const Tabs = styled.div`
    margin-top: 30px;
`;

const TabHeaders = styled.div`
    display: flex;
    border-bottom: 2px solid #bd90fb;

    div {
        padding: 10px 20px;
        cursor: pointer;
    }

    div.active {
        font-weight: bold;
        border-bottom: 2px solid #bd90fb;
    }
`;

const TabContent = styled.div`
    margin-top: 20px;
    padding: 20px;

    div p {
        margin-top: 10px;
    }
`;

const MusicalDetail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // URL에서 뮤지컬 ID를 추출
    const [musical, setMusical] = useState<any>(null); // API에서 불러온 뮤지컬 데이터
    const [favourite, setFavourite] = useState(false); // 즐겨찾기 상태
    const [activeTab, setActiveTab] = useState('공연정보'); // 현재 활성화된 탭

    // 안전하게 로컬스토리지 데이터를 파싱하는 함수
const safeParseFavourites = () => {
    if (typeof window === 'undefined') {
        return []; // 서버 사이드에서는 빈 배열 반환
    }

    const favourites = localStorage.getItem('favourites') || '[]'; // null일 경우 빈 배열로 대체
    try {
        return JSON.parse(favourites) || [];
    } catch {
        // 만약 JSON 형식이 아닐 경우 단순 콤마로 구분된 문자열로 처리
        return favourites ? favourites.split(',') : [];
    }
};


    useEffect(() => {
        // 뮤지컬 상세 정보 불러오기
        if (id) {
            fetchMusicalDetails(id as string).then((data) => {
                setMusical(data);
                // 로컬스토리지에서 즐겨찾기 여부 확인
                const savedFavourites = safeParseFavourites();
                setFavourite(savedFavourites.includes(id));
            });
        }
    }, [id]);

    const toggleFavourite = () => {
        const savedFavourites = safeParseFavourites();
        if (favourite) {
            // 이미 즐겨찾기에 있으면 제거
            const updatedFavourites = savedFavourites.filter((fav: string) => fav !== id);
            localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        } else {
            // 즐겨찾기에 추가
            savedFavourites.push(id);
            localStorage.setItem('favourites', JSON.stringify(savedFavourites));
        }
        setFavourite(!favourite);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case '공연정보':
                return (
                    <div>
                        <p>
                            <strong>기획제작자:</strong> {musical.entrpsnm}
                        </p>
                        <p>
                            <strong>제작사:</strong> {musical.entrpsnmP} - {musical.prfpdto}
                        </p>
                        <p>
                            <strong>줄거리:</strong> {musical.sty}
                        </p>
                    </div>
                );
            case '캐스팅정보':
                return (
                    <div>
                        <p>
                            <strong>공연출연진:</strong> {musical.prfcast}
                        </p>
                        <p>
                            <strong>공연제작진:</strong> {musical.prfcrew}
                        </p>
                    </div>
                );
            case '판매정보':
                return (
                    <div>
                        <p>
                            <strong>예매처목록:</strong> {musical.relatenm} {musical.relateurl}
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!musical) {
        return <p>로딩중...</p>;
    }

    return (
        <div>
            <Header />
            <MusicalDetailContainer>
                {/* 상단 부분 - 포스터와 정보 */}
                <TopSection>
                    <PosterContainer>
                        <Poster src={musical.poster} alt={musical.prfnm} />
                        <StarIcon onClick={toggleFavourite} isFavourite={favourite}>
                            ★
                        </StarIcon>
                    </PosterContainer>

                    <MusicalInfo>
                        <h1>{musical.prfnm}</h1>
                        <p>
                            <strong>장소:</strong> {musical.fcltynm}
                        </p>
                        <p>
                            <strong>공연기간:</strong> {musical.prfpdfrom} - {musical.prfpdto}
                        </p>
                        <p>
                            <strong>공연시간:</strong> {musical.prfruntime}
                        </p>
                        <p>
                            <strong>관람연령:</strong> {musical.prfage}
                        </p>
                        <p>
                            <strong>공연상태:</strong> {musical.prfstate}
                        </p>
                    </MusicalInfo>
                </TopSection>

                {/* 하단 부분 - 탭 */}
                <Tabs>
                    <TabHeaders>
                        <div
                            className={activeTab === '공연정보' ? 'active' : ''}
                            onClick={() => setActiveTab('공연정보')}>
                            공연정보
                        </div>
                        <div
                            className={activeTab === '캐스팅정보' ? 'active' : ''}
                            onClick={() => setActiveTab('캐스팅정보')}>
                            캐스팅정보
                        </div>
                        <div
                            className={activeTab === '판매정보' ? 'active' : ''}
                            onClick={() => setActiveTab('판매정보')}>
                            판매정보
                        </div>
                    </TabHeaders>

                    <TabContent>{renderTabContent()}</TabContent>
                </Tabs>
            </MusicalDetailContainer>
            <Footer />
        </div>
    );
};

export default MusicalDetail;
