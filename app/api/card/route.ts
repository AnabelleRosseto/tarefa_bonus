import { promises } from "dns";
import next from "next";
import { NextResponse } from "next/server";


interface cardResponse {
    code: string,
    image: string,
    images: {
        svg: string,
        png: string
    },
    value: string,
    suit: string

}
export async function GET() : Promise<cardResponse> {
    const url:string = 'https://deckofcardsapi.com/api/deck/new/shuffle'
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    
    const card: cardResponse = data;

    return card as cardResponse;

}