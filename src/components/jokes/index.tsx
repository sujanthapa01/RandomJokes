'use client'
import React, { useState } from "react";
import "./style.css"
import axios from "axios";
import { CgOptions } from "react-icons/cg";
import { Button } from "../ui/button";
import ToolTip from "./tooltip";
import JokeOptions from "@/components/jokes/OptionsCard/index"
import { useCategory } from "@/context/CategoryContext"

const Jokes: React.FC = () => {

    const [jokesData, setJokesData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    //api parameters state from CategoryContext */src/context/CategoryContext.tsx*
    const { jokeAmount, blacklistedFlags, selectedTypes, subCategories } = useCategory();

    //Resuable function for [] => string
    const OptionstoString = (value: string[] | number): string => {
        let toStringValue;
        if (Array.isArray(value)) {
            toStringValue = value.map((val) => val.toString()).join(',');
            return toStringValue;
        } else {
            return value.toString();
        }
    };

    const category = OptionstoString(subCategories);
    const amount = OptionstoString(jokeAmount);
    const flags = OptionstoString(blacklistedFlags);
    const jokeTypes = OptionstoString(selectedTypes);

    console.log([category,amount,flags,jokeTypes].map((val) => { return val}));

    const hanldeJokes = async (): Promise<void> => {
        setIsFadingOut(true);

        setTimeout(async () => {
            setLoading(prev => !prev)
            try {
                const jokes = await axios.get('/api/jokes', {
                    params: {
                         category,
                        flags: flags,
                        joketype: jokeTypes,
                        amount: amount
                    }
                });
                setJokesData(jokes?.data);
                setIsFadingOut(false);
                setLoading(prev => !prev)
            } catch (error) {
                console.log("failed to fetch /api/*",error);
            }
        }, 300)

    }


    const handleOpenJokeOptions: React.MouseEventHandler<SVGAElement> = () => {
        setIsVisible(true)
    }


    console.log(jokesData)

    const shoothShift = loading === false && "translate-y-[20px]"

    const beforeStyle = "text-black inline-flex relative duration-200 cursor-pointer before:absolute before:inset-0 before:bg-blue-300 before:opacity-30 before:-z-10 before:-rotate-0 before:translate-y-1/6 before:shadow-sm before:shadow-yellow-500  "

    return (
        <div className="flex flex-col gap-7 h-[20rem] justify-center items-center animate-open duration-200 w-screen ">
            <div></div>
            {jokesData && (
                <div className={`flex flex-col gap-2  h-[5rem]`}>

                    {loading === false && (
                        <div className={`flex flex-col gap-2 justify-center items-center animation-open  ${isFadingOut ? "animation-fadeOut" : "animate-fadeIn"} `}>
                            <p className={beforeStyle}> - {jokesData.setup}</p>
                            <p className={beforeStyle}> - {jokesData.delivery}</p>
                        </div>
                    )}

                </div>
            )
            }


            <Button className={`transition-all duration-200 cursor-pointer ${shoothShift}`} onClick={hanldeJokes} disabled={loading && true}>random joke</Button>


            <div className="flex justify-center items-center mt-8 cursor-pointer relative" ><ToolTip content="customize"><CgOptions onClick={handleOpenJokeOptions} /></ToolTip>
                <div className="">
                    {isVisible && <JokeOptions isVisible={isVisible} setVisible={setIsVisible} />}
                </div>
            </div>
        </div>
    )
}



export default Jokes