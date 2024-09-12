import styled from 'styled-components';

export const FooterContainer = styled.footer`
    width: 90%;
    height: 100px;
    display: flex;
    justify-content: space-between; /* 좌우로 배치 */
    align-items: center; /* 세로로 가운데 정렬 */
    padding: 20px;
    border-top: 1px solid black;
    color: white;
    margin: 0 auto;
`;

export const FooterLinksContainer = styled.div`
    display: flex;
    gap: 10px; /* FooterLink들 간의 간격 */
`;

export const FooterLink = styled.a`
    font-size: 14px;
    cursor: pointer;
    color: black;
    margin: 0 10px;
`;

export const SocialMedia = styled.div`
    display: flex;
    gap: 10px;

    a img {
        width: 25px;
        height: 25px;
    }
`;

