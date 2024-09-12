import styled from 'styled-components';

export const FilterBar = styled.div`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    margin: 50px auto;
    padding: 10px;
    border: 2px solid #9851fa;
    border-radius: 10px;
    gap: 10px;
    margin-top: 80px;
`;

export const LocationButton = styled.button<{ active: boolean }>`
    padding: 10px 20px;
    margin: 5px;
    border: 2px solid #9851fa;
    border-radius: 25px;
    background-color: ${(props) => (props.active ? '#bd90fb' : 'white')};
    color: ${(props) => (props.active ? 'white' : '#bd90fb')};
    cursor: pointer;
    flex: 1 1 50%;
    max-width: 150px;
    &:hover {
        background-color: #bd90fb;
        color: white;
    }
`;

export const PerformanceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 0 auto;
    margin-bottom: 100px;
    width: 80%;
`;

export const CardContainer = styled.div`
    perspective: 1000px;
    position: relative;
    width: 280px;
    height: 400px;
    cursor: pointer;
    margin: 30px 0;
    &:hover .card-back {
        opacity: 1;
        visibility: visible;
    }
`;

export const Card = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const CardFront = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        font-size: 16px;
        color: black;
        height: 0;
        text-align: center;
        font-weight: 600;
    }
`;

export const CardBack = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    z-index: 2;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    h3 {
        font-size: 20px;
        color: #bd90fb;
        width: 80%;
    }
    p {
        width: 80%;
        font-size: 16px;
        color: white;
        margin: 5px 10px;
    }
    p:last-child {
        margin-bottom: 20%;
    }
`;

export const StarIcon = styled.div<{ isFavourite: boolean }>`
    font-size: 24px;
    cursor: pointer;
    color: ${({ isFavourite }) => {
        console.log('StarIcon active:', isFavourite); // active 값 확인
        return isFavourite ? 'gold' : '#ccc';
    }};
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
    &:hover {
        color: gold;
    }
`;



export const MoreButton = styled.button<{ active?: boolean }>`
    padding: 10px 20px;
    margin: 5px;
    border: 2px solid #9851fa;
    border-radius: 10px;
    background-color: ${(props) => (props.active ? '#bd90fb' : 'white')};
    color: ${(props) => (props.active ? 'white' : '#bd90fb')};
    cursor: pointer;
    width: 200px;
    margin-bottom: 70px;
    &:hover {
        background-color: #bd90fb;
        color: white;
    }
`;

