import styled from 'styled-components';

export const PerformancesContainer = styled.div`
    width: 100%;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    padding: 20px;
    border: 1px solid #ccc;
    margin-bottom: 30px;
`;

export const FilterItem = styled.div`
    font-size: 16px;
    border: 1px solid #ccc;
    padding: 10px 20px;
    border-radius: 5px;
`;

export const FilterButton = styled.button`
    font-size: 16px;
    border: none;
    background-color: #bd90fb;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
`;

export const PerformanceList = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 80%;
`;

export const PerformanceCard = styled.div`
    background-color: #bd90fb;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 10px;

    h3 {
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 5px;
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

export const PaginationItem = styled.div<{ active?: boolean }>`
    margin: 0 10px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ active }) => (active ? '#bd90fb' : '#f0f0f0')};
    color: ${({ active }) => (active ? 'white' : 'black')};
`;
