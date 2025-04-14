'use client'

import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { CgOptions } from "react-icons/cg";
import { Button } from "../ui/button";
import ToolTip from "./tooltip";
import JokeOptions from "@/components/jokes/OptionsCard/index";
import { useCategory } from "@/context/CategoryContext";
import { motion, AnimatePresence } from "framer-motion";

const Jokes: React.FC = () => {
    const [jokesData, setJokesData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // Getting API parameters from context
    const { jokeAmount, blacklistedFlags, selectedTypes, subCategories } = useCategory();

    // Utility function to convert array/number to comma-separated string
    const optionToString = (value: string[] | number): string => {
        return Array.isArray(value) ? value.join(',') : value.toString();
    };

    // Convert context data to strings for API params
    const category = optionToString(subCategories);
    const amount = optionToString(jokeAmount);
    const flags = optionToString(blacklistedFlags);
    const jokeTypes = optionToString(selectedTypes);

    const handleJokes = async (): Promise<void> => {
        setIsFadingOut(true);

        setTimeout(async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/jokes', {
                    params: {
                        category,
                        flags,
                        joketype: jokeTypes,
                        amount
                    }
                });
                const fetchedData = response?.data;
                setJokesData(fetchedData);
                console.log("Fetched jokes data:", fetchedData);

                setIsFadingOut(false);
            } catch (error) {
                console.error("Failed to fetch /api/jokes", error);
            } finally {
                setLoading(false);
            }
        }, 300);
    };

    useEffect(() => {
        if (jokesData) {
            console.log("Updated jokesData:", jokesData);
        }
    }, [jokesData]);

    const handleOpenJokeOptions: React.MouseEventHandler<SVGAElement> = () => {
        setIsVisible(true);
    };

    const renderJokes = () => {
        if (!jokesData) return <p>click to get jokes</p>;

        const jokesArray = Array.isArray(jokesData?.jokes)
            ? jokesData.jokes
            : jokesData?.jokes
                ? [jokesData.jokes]
                : Array.isArray(jokesData)
                    ? jokesData
                    : [jokesData];

        if (jokesArray.length === 0) {
            return <p>no jokes avlable</p>;
        }

        const commonStyle =
            "text-black text-center break-words whitespace-pre-wrap max-w-full text-base sm:text-lg md:text-xl px-2 sm:px-4 leading-snug inline-flex relative duration-200 cursor-pointer before:absolute before:inset-0 before:bg-blue-300 before:opacity-30 before:-z-10 before:translate-y-auto before:shadow-sm before:shadow-yellow-500";

        return jokesArray.map((joke: any, index: number) => {
            if (joke.type === "twopart") {
                return (
                    <div
                        key={`twopart-${index}`}
                        className={`flex flex-col gap-2 items-center leading-none mt-8 ${amount.length < 1 ? "border-b-2 border-dashed border-gray-300 pb-4" : ""
                            }`}
                    >
                        <p className={commonStyle}>- {joke.setup}</p>
                        <p className={commonStyle}>- {joke.delivery}</p>
                    </div>

                );
            } else {
                return (
                    <p key={`single-${index}`} className={commonStyle}>
                        - {joke.joke}
                    </p>
                );
            }
        });
    };


    const transitionClass = !loading ? "translate-y-[20px]" : "";

    return (
        <div className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 py-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={jokesData ? "hasJoke" : "noJoke"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-y-8 w-full max-w-2xl"
                >
                    <div className={`  ${isFadingOut ? "animation-fadeOut" : "animate-fadeIn"}`}>
                        {renderJokes()}


                    </div>

                    <div className="flex flex-col  items-center gap-4 w-full">
                        <Button
                            onClick={handleJokes}
                            disabled={loading}
                            className="transition-all duration-200 w-full sm:w-auto"
                        >
                            Random Joke
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Options */}
            <div className="flex justify-center items-center mt-10 cursor-pointer relative">
                <ToolTip content="Customize">
                    <CgOptions onClick={handleOpenJokeOptions} size={24} />
                </ToolTip>
                {isVisible && <JokeOptions isVisible={isVisible} setVisible={setIsVisible} />}
            </div>
        </div>
    );



};

export default Jokes;
