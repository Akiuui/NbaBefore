import React, { useEffect, useState } from 'react'
import PageSizeForFetchGames from '../utils/pageSizeForFetchGames';
import axios from 'axios';
import gamesToObjectFormatter from '../controllers/gamesToObjectFormatter';
import LoadingProtector from './loading/loadingProtector';
import ScrollListener from './ScrollListener';
import LoadingCircle from './loading/loadingCircle';
import PageFooter from './PageFooter';
import fetchGames from '../routes/fetchGames';
import fixWrongGameNames from '../controllers/fixWrongGameNames';

function FetchGames({setGames, date}) {

    const [cursor, setCursor] = useState(null);
    const [nextCursor, setNextCursor] = useState(null);
    const [firstFetch, setFirstFetch] = useState(true)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setGames([])
        setCursor(null)
        setNextCursor(null)
        setFirstFetch(true)
        setLoading(false)

    }, [date])

    useEffect(() => {
        
        const fetchData = async () => {
            if(!date) return
            console.log("fetchuje se")
            setLoading(true)

            try{
                let res = await fetchGames({cursor: cursor, date: date})
                res = fixWrongGameNames(res, date)

                setFirstFetch(false)
                setNextCursor(res.data.meta.next_cursor/*res.data.meta.next_cursor != undefined*/)

                let gamesObjects = gamesToObjectFormatter(res.data.data, date)
                setGames(games => [...games,...gamesObjects])

            }catch(err){
                setError(err.message || "Failed to fetch data")
                console.log(err)
            }finally{ 
                setLoading(false)
            }
    
        }


        fetchData()

    }, [cursor, date])

    const fetchNextPage = (setCursor, nextCursor) => {
        setCursor(nextCursor)
    }

    return(
        <>
            {loading && firstFetch && <LoadingProtector/> }
            {nextCursor && <LoadingCircle/> }
            {cursor && !nextCursor && !loading && <PageFooter/>}

            {error && <p>{error}</p>}
            {nextCursor && <ScrollListener action={fetchNextPage} setCursor={setCursor} nextCursor={nextCursor}/>}

        </>
    )





}

export default FetchGames