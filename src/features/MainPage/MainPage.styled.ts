import styled, { keyframes } from 'styled-components';


// 타이핑 애니메이션 정의
const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

// 깜박이는 커서 애니메이션 정의
const blink = keyframes`
  0% {
    border-right-color: rgba(255, 255, 255, 0.75);
  }
  50% {
    border-right-color: transparent;
  }
  100% {
    border-right-color: rgba(255, 255, 255, 0.75);
  }
`;

export const SloganText = styled.h1`
    font-size: 90px;
    color: white;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    letter-spacing: 0.05em;
    display: inline-block;
    animation: ${typing} 4s steps(40, end), ${blink} 0.75s step-end infinite; /* 타이핑과 커서 애니메이션 */

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    &.finished {
        border-right: none; /* 애니메이션이 끝난 후 커서 제거 */
    }
`;

// 나머지 코드 유지

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const SloganContainter = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90vh;
    background-image: url('./images/wicked.jpg');
    background-size: cover;
    background-position: center;
    background-color: #bd90fb;
    color: white;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    > * {
        position: relative;
        z-index: 2;
    }
`;

export const MainSlogan = styled.div`
    width: 75%;
    height: 800px;
    text-align: center;
    margin: 50px 0;
    color: white;
`;

// 나머지 코드 유지

export const SubText = styled.p`
    margin-top: 20px;
    font-size: 18px;
    color: white;
`;

export const MusicalSlide = styled.section`
    width: 100%;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const SlideContainer = styled.div`
    display: flex;
    gap: 40px;
    padding: 20px;
    transition: all 0.5s ease;
    margin-left: 1700px;
    margin-top: 100px;
`;

export const CardContainer = styled.div<{ index: number }>`
    perspective: 1000px;
    position: relative;
    width: 280px;
    height: 400px;
    margin-top: ${({ index }) => (index === 1 || index === 3 ? '200px' : '0')};
    /* overflow: hidden; */
    cursor: pointer;

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
    /* align-items: center; */
    /* background-color: #f0f0f0; */
    z-index: 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p {
        /* margin-top: 10px; */
        font-size: 16px;
        color: black;
        height: 0;
        /* margin-left:5px; */
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
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out; /* 부드럽게 나타나는 효과 */

    h3 {
        font-size: 20px;
        margin-bottom: 20px;
        color: #bd90fb;
        width: 80%;
        /* text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black; */
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

export const MoreMusicals = styled.div`
    margin-top: 20px;
    margin-bottom: 100px;
    font-size: 18px;
    cursor: pointer;
    color: black;
    text-align: center;
    width: 95%;
    display: flex;
    justify-content: center;

    p {
        line-height: 100px;
    }

    &:hover {
        color: #bd90fb; // hover 시 색상
    }
`;

export const SearchByLocation = styled.section`
    width: 90%;
    height: 500px;
    background-color: #d6a5ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
`;

export const SearchText = styled.h2`
    font-size: 50px;
    color: white;
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