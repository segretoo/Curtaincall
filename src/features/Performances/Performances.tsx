import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { fetchPerformances } from '@/utils/api';
import { useRouter } from 'next/router';
import {
    FilterBar,
    PerformanceGrid,
    Card,
    CardContainer,
    CardBack,
    CardFront,
    LocationButton,
    StarIcon,
    MoreButton,
} from './Performances.styled';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Button, Select, Spin } from 'antd'; // Select 추가
import { LoadingOutlined } from '@ant-design/icons'; // Spin을 위한 아이콘 추가

const { Option } = Select;

const locations = [
    { value: '', label: '전체' },
    { value: '11', label: '서울' },
    { value: '41', label: '경기도' },
    { value: '26', label: '부산' },
    { value: '27', label: '대구' },
    { value: '28', label: '인천' },
    { value: '29', label: '광주' },
    { value: '30', label: '대전' },
    { value: '31', label: '울산' },
    { value: '36', label: '세종' },
    { value: '51', label: '강원도' },
    { value: '43', label: '충청북도' },
    { value: '44', label: '충청남도' },
    { value: '45', label: '전라북도' },
    { value: '46', label: '전라남도' },
    { value: '47', label: '경상북도' },
    { value: '48', label: '경상남도' },
    { value: '50', label: '제주도' },
];

// Local Storage에서 즐겨찾기된 mt20id를 불러오는 함수 (Favourites 페이지 로직과 동일)
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

// 로컬 스토리지에 즐겨찾기 저장 함수 (Favourites 페이지 로직과 동일)
const saveFavouritesToLocalStorage = (favourites: string[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('favourites', JSON.stringify(favourites)); // JSON으로 저장
    }
};

const Performances: React.FC = () => {
    const [performances, setPerformances] = useState<any[]>([]);
    const [filteredPerformances, setFilteredPerformances] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [filters, setFilters] = useState({ location: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [favourites, setFavourites] = useState<string[]>(safeParseFavourites()); // favourites 상태
    const [pages, setPages] = useState(16);
    const [stdate, setStdate] = useState('');
    const [eddate, setEddate] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { search } = router.query;

    useEffect(() => {
        const today = new Date();
        setStdate(today.toISOString().split('T')[0].replace(/-/g, ''));

        const endOfYear = new Date(new Date().getFullYear(), 11, 31);
        setEddate(endOfYear.toISOString().split('T')[0].replace(/-/g, ''));

        const initialFavourites = safeParseFavourites();
        setFavourites(initialFavourites);
    }, []);

    const loadPerformances = useCallback(
        async (page: number, loadAll = false) => {
            try {
                const { performances, totalItems } = await fetchPerformances({
                    location: filters.location || '',
                    page: loadAll ? 1 : page,
                    rows: loadAll ? 1000 : pages,
                    startDate: stdate,
                    endDate: eddate,
                });

                setPerformances((prevPerformances) =>
                    page > 1 ? [...prevPerformances, ...performances] : performances
                );
                setTotalItems(totalItems);
            } catch (error) {
                console.error('Error fetching performances:', error);
                setPerformances([]);
                setTotalItems(0);
            } finally {
                setLoading(false);
            }
        },
        [filters.location, pages, stdate, eddate]
    );

    const sortPerformances = useCallback(
        (performances: any[]) => {
            let sortedPerformances = [...performances];

            if (sortOption === 'nameAsc') {
                sortedPerformances.sort((a, b) => {
                    const nameA = a.prfnm ? String(a.prfnm) : '';
                    const nameB = b.prfnm ? String(b.prfnm) : '';
                    return nameA.localeCompare(nameB);
                });
            } else if (sortOption === 'nameDesc') {
                sortedPerformances.sort((a, b) => {
                    const nameA = a.prfnm ? String(a.prfnm) : '';
                    const nameB = b.prfnm ? String(b.prfnm) : '';
                    return nameB.localeCompare(nameA);
                });
            } else if (sortOption === 'startDate') {
                sortedPerformances.sort((a, b) => {
                    const dateA = a.prfpdfrom ? new Date(a.prfpdfrom).getTime() : 0;
                    const dateB = b.prfpdfrom ? new Date(b.prfpdfrom).getTime() : 0;
                    return dateA - dateB;
                });
            }

            setPerformances(sortedPerformances);
        },
        [sortOption]
    );

    useEffect(() => {
        if (search) {
            loadPerformances(1, true);
        }
    }, [search, loadPerformances]);

    useEffect(() => {
        if (search) {
            const filtered = performances.filter((performance) => {
                const performanceName = performance.prfnm ? String(performance.prfnm) : '';
                return performanceName.toLowerCase().includes((search as string).toLowerCase());
            });
            setFilteredPerformances(filtered);
        } else {
            setFilteredPerformances(performances);
        }
    }, [performances, search]);

    const toggleFavourites = (performance: any) => {
        setFavourites((prevFavourites) => {
            const isFavourite = prevFavourites.includes(String(performance.mt20id)); // 문자열로 변환하여 비교

            console.log('Toggle Favourite:', performance.mt20id, 'Was active:', isFavourite);

            let updatedFavourites;
            if (isFavourite) {
                // 이미 즐겨찾기에 있다면 제거
                updatedFavourites = prevFavourites.filter((fav: string) => fav !== String(performance.mt20id));
            } else {
                // 즐겨찾기에 추가
                updatedFavourites = [...prevFavourites, String(performance.mt20id)];
            }

            // 로컬스토리지 업데이트
            saveFavouritesToLocalStorage(updatedFavourites);

            // 업데이트된 즐겨찾기 반환
            return updatedFavourites;
        });
    };

    const handleReturnToInitialState = () => {
        setFilters({ location: '' });
        setSortOption('');
        setCurrentPage(1);
        router.push('/performances');
    };

    const handleMusicalClick = (mt20id: string) => {
        router.push(`/musicals/${mt20id}`);
    };

    useEffect(() => {
        loadPerformances(currentPage);
    }, [currentPage, pages, filters, loadPerformances]);

    useEffect(() => {
        if (sortOption) {
            sortPerformances(performances);
        }
    }, [sortOption, performances, sortPerformances]);

    return (
        <div>
            <Header />

            {!search && (
                <FilterBar>
                    {locations.map((location) => (
                        <LocationButton
                            key={location.value}
                            onClick={() => setFilters({ location: location.value })}
                            active={filters.location === location.value}>
                            {location.label}
                        </LocationButton>
                    ))}
                </FilterBar>
            )}

            <div style={{ marginLeft: '1150px', marginBottom: '10px', marginTop: '50px' }}>
                <Select defaultValue="" style={{ width: 200 }} onChange={(value) => setSortOption(value)}>
                    <Option value="">정렬 선택</Option>
                    <Option value="nameAsc">가나다순 (오름차순)</Option>
                    <Option value="nameDesc">가나다순 (내림차순)</Option>
                    <Option value="startDate">개막일순</Option>
                </Select>
            </div>

            <PerformanceGrid>
                {loading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            marginLeft: '160%',
                        }}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#bd90fb' }} spin />} />
                    </div>
                ) : filteredPerformances.length > 0 ? (
                    filteredPerformances.map((performance: any, index: number) => (
                        <CardContainer key={index}>
                            <Card onClick={() => handleMusicalClick(performance.mt20id)}>
                                <CardFront>
                                    <img src={performance.poster} alt={performance.prfnm} />
                                    <p>{performance.prfnm}</p>
                                </CardFront>
                                <CardBack className="card-back">
                                    <h3>{performance.prfnm}</h3>
                                    <p>
                                        기간: {performance.prfpdfrom} - {performance.prfpdto}
                                    </p>
                                    <p>장소: {performance.fcltynm}</p>
                                </CardBack>
                                <StarIcon
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavourites(performance);
                                    }}
                                    isFavourite={favourites.includes(String(performance.mt20id))} // 문자열로 변환하여 비교
                                >
                                    ★
                                </StarIcon>
                            </Card>
                        </CardContainer>
                    ))
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            marginLeft: '160%',
                        }}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#bd90fb' }} spin />} />
                    </div>
                )}
            </PerformanceGrid>

            {!search && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <MoreButton
                        onClick={() => {
                            setCurrentPage((prev) => prev + 1);
                            loadPerformances(currentPage + 1);
                        }}>
                        MORE
                    </MoreButton>
                </div>
            )}

            {search && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <MoreButton onClick={handleReturnToInitialState}>처음으로 돌아가기</MoreButton>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Performances;
