'use client'
import React, { useContext, createContext, useState } from "react";


interface CategoryContextType {
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    subCategories: string[];
    setSubCategories: React.Dispatch<React.SetStateAction<string[]>>;
    blacklistedFlags: string[];
    setBlacklistedFlags: React.Dispatch<React.SetStateAction<string[]>>;
    selectedTypes: string[];
    setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
    jokeAmount: number;
    setJokeAmount: React.Dispatch<React.SetStateAction<number>>;
}

interface CategoryProviderType {
    children: React.ReactNode;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

const CategoryProvider: React.FC<CategoryProviderType> = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("Any");
    const [subCategories, setSubCategories] = useState<string[]>([]);
    const [blacklistedFlags, setBlacklistedFlags] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [jokeAmount, setJokeAmount] = useState<number>(1);

    return (
        <CategoryContext.Provider
            value={{
                selectedCategory,
                setSelectedCategory,
                subCategories,
                setSubCategories,
                blacklistedFlags,
                setBlacklistedFlags,
                selectedTypes,
                setSelectedTypes,
                jokeAmount,
                setJokeAmount,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory is not useable");
    }
    return context;
};

export { CategoryProvider, useCategory };
