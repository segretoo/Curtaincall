import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchMusicalDetails } from '@/utils/api';
import {
    PerformanceGrid,
    CardContainer,
    Card,
    CardFront,
    CardBack,
    StarIcon,
} from '@/features/Performances/Performances.styled';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

// Local Storage에서 즐겨찾기된 mt20id를 불러오는 함수
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


const Favourites: React.FC = () => {
    const [favouriteMusicals, setFavouriteMusicals] = useState<any[]>([]); // 뮤지컬 데이터를 저장하는 상태
    const [favourites, setFavourites] = useState<string[]>(safeParseFavourites()); // 즐겨찾기된 공연 ID를 상태로 저장
    const [isLoaded, setIsLoaded] = useState(false); // 데이터 로딩 상태
    const router = useRouter();

    // 로컬스토리지에 저장된 공연 ID로 뮤지컬 데이터를 불러오는 함수
    const fetchFavouritesDetails = async () => {
        const savedFavourites = safeParseFavourites();
        console.log('Fetched favourites from localStorage:', savedFavourites); // 로컬스토리지 데이터 확인용 로그

        const musicalsData = [];

        // 저장된 공연 ID로 뮤지컬 데이터를 불러옴
        for (const mt20id of savedFavourites) {
            const musicalDetails = await fetchMusicalDetails(mt20id);
            if (musicalDetails) {
                musicalsData.push(musicalDetails);
            }
        }

        setFavouriteMusicals(musicalsData);
        setIsLoaded(true); // 데이터가 다 로드되었음을 표시
    };

    useEffect(() => {
        fetchFavouritesDetails(); // 페이지 로드 시 즐겨찾기 데이터 불러옴
    }, []);

    // 즐겨찾기 버튼을 클릭했을 때 로컬스토리지에서 추가/삭제 처리
    const toggleFavourite = (mt20id: string) => {
        const updatedFavourites = favourites.includes(String(mt20id)) // 문자열로 변환하여 비교
            ? favourites.filter((fav) => fav !== String(mt20id))
            : [...favourites, String(mt20id)];

        console.log('Updated favourites:', updatedFavourites); // 업데이트된 즐겨찾기 목록 확인
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        setFavourites(updatedFavourites); // 상태 업데이트하여 UI에 반영
    };

    if (!isLoaded) {
        return <p>Loading...</p>; // 데이터 로딩 중
    }

    return (
        <div>
            <Header />
            <h2 style={{ textAlign: 'center', margin: '50px 0' }}>즐겨찾기한 뮤지컬</h2>
            {favouriteMusicals.length === 0 ? (
                <p style={{ textAlign: 'center' }}>즐겨찾기에 추가된 공연이 없습니다.</p>
            ) : (
                <PerformanceGrid>
                    {favouriteMusicals.map((performance, index) => (
                        <CardContainer key={index}>
                            <Card onClick={() => router.push(`/musicals/${performance.mt20id}`)}>
                                <CardFront>
                                    <img src={performance.poster} alt={performance.prfnm} />
                                    <p>{performance.prfnm}</p>
                                </CardFront>
                                <CardBack>
                                    <h3>{performance.prfnm}</h3>
                                    <p>
                                        {performance.prfpdfrom} - {performance.prfpdto}
                                    </p>
                                    <p>{performance.fcltynm}</p>
                                </CardBack>
                                <StarIcon
                                    isFavourite={favourites.includes(String(performance.mt20id))} // 문자열로 변환하여 비교
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavourite(performance.mt20id);
                                    }}>
                                    ★
                                </StarIcon>
                            </Card>
                        </CardContainer>
                    ))}
                </PerformanceGrid>
            )}
            <Footer />
        </div>
    );
};

export default Favourites;
