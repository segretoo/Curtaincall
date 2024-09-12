import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 50px 20px 20px 50px;
    background-color: #bd90fb;
`;

export const Logo = styled.a`
    font-size: 24px;
    font-weight: bold;
    color: white;
`;

export const Nav = styled.nav`
    margin-left: 100px;
    display: flex;
    gap: 50px;
`;

export const NavItem = styled.a`
    font-size: 16px;
    color: white;
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
    padding: 10px; /* 위아래로 10px 패딩을 추가 */
    position: relative;
    &:hover {
        /* color: #7212f8; */
    }
`;


export const SearchBarContainer = styled.div`
    display: flex;
    margin-right: 50px;
    input {
        padding: 10px;
        font-size: 16px;
        background-color: white;
        border: 1px solid #7212f8;
        border-radius: 12.5px;
        width: 300px;
        height: 30px;
    }
    input::placeholder {
        color: #d9d9d9;
    }
    button {
        margin-left: -40px;
        padding: 5px;
        font-size: 16px;
        cursor: pointer;
        color: #7212f8;
    }
`;
