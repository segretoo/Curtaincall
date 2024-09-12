export const saveToFavorites = (id: string) => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

export const removeFromFavorites = (id: string) => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter((favorite: string) => favorite !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const getFavorites = (): string[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
};
