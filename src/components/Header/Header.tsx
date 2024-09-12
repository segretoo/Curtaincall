import React, { useState } from 'react';
import { useRouter } from 'next/router'; // 이 부분을 추가해야 합니다
import { HeaderContainer, Logo, Nav, NavItem, SearchBarContainer } from './Header.styled';

const Header: React.FC = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null); // 현재 호버된 아이템을 추적하는 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
    const router = useRouter(); // useRouter 훅을 사용하여 라우터 가져오기

    // 검색 실행 함수
    const handleSearch = () => {
        if (searchTerm.trim()) {
            router.push(`/performances?search=${searchTerm}`);
            setSearchTerm(''); // 검색 후 인풋 필드 초기화
        }
    };

    // NavItem의 텍스트를 변경하는 함수
    const getNavText = (item: string) => {
        if (hoveredItem === item) {
            switch (item) {
                case 'HOME':
                    return '처음 화면';
                case 'PERFORMANCES':
                    return '공연 목록';
                case 'FAVOURITES':
                    return '즐겨찾기';
                default:
                    return item;
            }
        }
        return item; // 호버되지 않았을 때는 영어로 표시
    };

    return (
        <HeaderContainer>
            <Logo href="/">CURTAINCALL</Logo>
            <Nav>
                <NavItem href="/" onMouseEnter={() => setHoveredItem('HOME')} onMouseLeave={() => setHoveredItem(null)}>
                    {getNavText('HOME')}
                </NavItem>
                <NavItem
                    href="/performances"
                    onMouseEnter={() => setHoveredItem('PERFORMANCES')}
                    onMouseLeave={() => setHoveredItem(null)}>
                    {getNavText('PERFORMANCES')}
                </NavItem>
                <NavItem
                    href="/favorites"
                    onMouseEnter={() => setHoveredItem('FAVOURITES')}
                    onMouseLeave={() => setHoveredItem(null)}>
                    {getNavText('FAVOURITES')}
                </NavItem>
            </Nav>
            <SearchBarContainer>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Enter를 누르면 검색 실행
                    placeholder="Search"
                />
                <button type="button" onClick={handleSearch}>
                    <span className="material-icons">search</span>
                </button>
            </SearchBarContainer>
        </HeaderContainer>
    );
};

export default Header;
