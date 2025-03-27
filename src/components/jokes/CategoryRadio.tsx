'use client'
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCategory } from '@/context/CategoryContext'; 


const CategoryRadio: React.FC<{ onSave: (data: any) => void }> = ({ onSave }) => {
    const {
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
    } = useCategory();

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        if (value === 'Any') setSubCategories([]); 
    };

    const handleSubCategoryChange = (value: string) => {
        setSubCategories((prev) =>
            prev.includes(value)
                ? prev.filter((subCat) => subCat !== value)
                : [...prev, value]
        );
    };

    const handleFlagChange = (value: string) => {
        setBlacklistedFlags((prev) =>
            prev.includes(value)
                ? prev.filter((flag) => flag !== value)
                : [...prev, value]
        );
    };

    const handleTypeChange = (value: string) => {
        setSelectedTypes((prev) =>
            prev.includes(value)
                ? prev.filter((type) => type !== value)
                : [...prev, value]
        );
    };

    const handleSave = () => {
        const data = {
            selectedCategory,
            subCategories,
            blacklistedFlags,
            selectedTypes,
            jokeAmount,
        };
        onSave(data);
    };

    const isDisabled = selectedCategory === 'Any';
    const border = 'border-2 border-dashed border-black p-4 mb-4';

    return (
        <main className='text-sm space-y-4'>
            <header className=''>


            </header>
            <div className={border}>
                <h6 className='mb-2'>Select category:</h6>
                <RadioGroup
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                    className='flex gap-4'
                >
                    <label className='flex items-center gap-2'>
                        <RadioGroupItem value='Any' id='any' />
                        <span>Any</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <RadioGroupItem value='Custom' id='custom' />
                        <span>Custom</span>
                    </label>
                </RadioGroup>
                <div className='flex flex-wrap gap-4 mt-4'>
                    {['Programming', 'Miscellaneous', 'Dark', 'Spooky', 'Pun'].map((subCat) => (
                        <label key={subCat} className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                value={subCat}
                                onChange={() => handleSubCategoryChange(subCat)}
                                checked={subCategories.includes(subCat)}
                                disabled={isDisabled}
                                className='cursor-pointer'
                            />
                            <span>{subCat}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className={border}>
                <h6 className='mb-2'>Select a flag to blacklist:</h6>
                <div className='flex flex-wrap gap-4'>
                    {['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'].map((flag) => (
                        <label key={flag} className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                value={flag}
                                onChange={() => handleFlagChange(flag)}
                                checked={blacklistedFlags.includes(flag)}
                                className='cursor-pointer'
                            />
                            <span>{flag}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className={border}>
                <h6 className='mb-2'>Select at least one joke type:</h6>
                <div className='flex flex-wrap gap-4'>
                    {['single', 'twopart'].map((type) => (
                        <label key={type} className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                value={type}
                                onChange={() => handleTypeChange(type)}
                                checked={selectedTypes.includes(type)}
                                className='cursor-pointer'
                            />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className={border}>
                <h6 className='mb-2'>Amount of jokes:</h6>
                <input
                    type='number'
                    className='border-2 border-black p-2 w-24'
                    value={jokeAmount}
                    onChange={(e) => setJokeAmount(Number(e.target.value))}
                    placeholder='Enter a number'
                />
            </div>
            <div className='w-full flex justify-center '>
            <button onClick={handleSave} className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'>
                Save
            </button>
            </div>
        </main>
    );
};

export default CategoryRadio;
