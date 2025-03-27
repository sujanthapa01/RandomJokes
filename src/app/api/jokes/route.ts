import { NextApiRequest} from "next";
import axios from "axios";
import { NextResponse } from "next/server";

interface ParamsTypes {
    category?: string;
    flags?: string;
    joketype?: string;
    amount?: number;
}

/* 
Reusable function to get query parameters.
If the parameter doesn't exist, return the default value.
*/
function getQueryParams(searchParams: URLSearchParams, key: string, defaultValue: string): string {
    return searchParams.get(key) || defaultValue;
}

export async function GET(req: NextApiRequest) {
    if (!req.url) {
        return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);

    const params: ParamsTypes = {
        category: getQueryParams(searchParams, "category", "Any"),
        flags: getQueryParams(searchParams, "flags", ""),
        joketype: getQueryParams(searchParams, "joketype", "twopart"),
        amount: Number(getQueryParams(searchParams, "amount", "1")),
    };
    console.log(params.category);

    const apiUrl = `https://v2.jokeapi.dev/joke/${params.category}?blacklistFlags=${params.flags}&type=${params.joketype}&amount=${params.amount}`;
    // console.log(apiUrl);

    try {
        const response = await axios.get(apiUrl);
        // console.log("Fetched Data:", response.data);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("Error fetching the API:", error);
        return NextResponse.json({ error: "Failed to fetch jokes" }, { status: 500 });
    }
}
