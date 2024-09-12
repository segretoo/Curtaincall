import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout/Layout';
import {
    MainContainer,
    MainSlogan,
    SloganContainter,
    SloganText,
    SubText,
    MusicalSlide,
    SlideContainer,
    CardContainer,
    Card,
    CardFront,
    CardBack,
    MoreMusicals,
    SearchByLocation,
    SearchText,
    StarIcon,
} from './MainPage.styled';
import { fetchMusicals } from '@/utils/api';
import { useRouter } from 'next/router';

interface Musical {
    prfnm: string; // 공연 이름
    poster: string; // 공연 포스터 이미지 URL
    prfpdfrom: string; // 공연 시작 날짜
    prfpdto: string; // 공연 종료 날짜
    fcltynm: string; // 공연 장소 이름
    mt20id: string; // 공연 ID
}


// 로컬 스토리지에서 즐겨찾기 데이터를 불러오는 함수
const safeParseFavourites = () => {
    if (typeof window === 'undefined') {
        return []; // 서버 사이드에서는 빈 배열 반환
    }

    const favourites = localStorage.getItem('favourites');

    // favourites가 null이면 빈 배열을 반환
    if (!favourites) {
        return [];
    }

    try {
        // favourites가 null이 아니면 JSON.parse() 실행
        return JSON.parse(favourites) || [];
    } catch (error) {
        console.error('Failed to parse favourites from localStorage:', error);
        return []; // JSON 파싱에 실패하면 빈 배열을 반환
    }
};


const MainPage: React.FC = () => {
    const [musicals, setMusicals] = useState<Musical[]>([]);
    const [favourites, setFavourites] = useState<string[]>(safeParseFavourites());
    const [animationDone, setAnimationDone] = useState(false); // 애니메이션 완료 상태 관리
    const slideContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const loadMusicals = async () => {
            const data = await fetchMusicals();
            setMusicals(data);
        };
        loadMusicals();

        const handleScroll = () => {
            const slideContainer = slideContainerRef.current;
            if (slideContainer) {
                const scrollPosition = window.scrollY;
                slideContainer.style.transform = `translateX(-${scrollPosition}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 애니메이션 완료 후 실행될 콜백
    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimationDone(true); // 애니메이션 완료 상태로 설정
        }, 4000); // 애니메이션 지속 시간과 동일하게 설정 (4초)

        return () => clearTimeout(animationTimeout);
    }, []);

    const handleCardClick = (mt20id: string) => {
        router.push(`/musicals/${mt20id}`);
    };

    const handleMoreMusicalsClick = () => {
        router.push('/performances');
    };

    // 즐겨찾기 토글 기능
    const toggleFavourite = (mt20id: string) => {
        const stringId = String(mt20id); // 데이터 타입 강제 변환
        const updatedFavourites = favourites.includes(stringId)
            ? favourites.filter((fav) => fav !== stringId)
            : [...favourites, stringId];

        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        setFavourites(updatedFavourites); // 상태 업데이트하여 UI에 반영
    };

    return (
        <Layout>
            <MainContainer>
                <SloganContainter>
                    <MainSlogan>
                        <SloganText className={animationDone ? 'finished' : ''}>
                            "BECAUSE I KNEW <br />
                            YOU, I HAVE BEEN <br />
                            CHANGED FOR GOOD."
                        </SloganText>
                        <SubText>- 뮤지컬 "위키드 (WICKED)"</SubText>
                    </MainSlogan>
                </SloganContainter>

                <MusicalSlide>
                    <SlideContainer ref={slideContainerRef}>
                        {musicals.length > 0 ? (
                            musicals.map((musical, index) => (
                                <CardContainer key={index} index={index}>
                                    <Card onClick={() => handleCardClick(musical.mt20id)}>
                                        <CardFront>
                                            <img src={musical.poster} alt={musical.prfnm} />
                                            <p>{musical.prfnm}</p>
                                        </CardFront>
                                        <CardBack className="card-back">
                                            <h3>{musical.prfnm}</h3>
                                            <p>
                                                기간: {musical.prfpdfrom} - {musical.prfpdto}
                                            </p>
                                            <p>장소: {musical.fcltynm}</p>
                                        </CardBack>
                                        <StarIcon
                                            isFavourite={favourites.includes(String(musical.mt20id))} // 타입을 문자열로 변환하여 비교
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavourite(musical.mt20id);
                                            }}>
                                            ★
                                        </StarIcon>
                                    </Card>
                                </CardContainer>
                            ))
                        ) : (
                            <p>Loading musicals...</p>
                        )}
                    </SlideContainer>
                </MusicalSlide>

                <MoreMusicals onClick={handleMoreMusicalsClick}>
                    <p>MORE MUSICALS</p>
                    <img src="./images/more_arrow.png" alt="More" />
                </MoreMusicals>

                {/* <SearchByLocation>
                    <SearchText>위치로 검색하기</SearchText>
                    <SubText>SEARCH BY LOCATION</SubText>
                </SearchByLocation> */}
            </MainContainer>
        </Layout>
    );
};

export default MainPage;
