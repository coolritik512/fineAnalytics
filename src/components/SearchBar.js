import React, { useEffect, useState } from 'react'
import { fetchData } from '../api/common';

export default function SearchBar({ setInfo }) {
    const symbolSearchKey = '1. symbol';
    const companySearchNameKey = '2. name';

    const [bestMatch, setbestMatch] = useState([]);

    const onSearchChange = async (event) => {
        const { value } = event.target;

        const query = `function=SYMBOL_SEARCH&keywords=${value}`;
        const { bestMatches } = await fetchData(query);
        setbestMatch(bestMatches);
    }

    const debounce = (cb) => {
        var timer;
        return (event) => {
            clearTimeout(timer);
            timer = setTimeout(() => cb(event), 100);
        }
    }

    const debounceSearch = debounce(onSearchChange);

    // console.log(bestMatch);

    const setChoosenCompany = (event) => {
        console.log(event.target.value)
        setInfo({
            symbol: bestMatch[event.target.value][symbolSearchKey],
            name: bestMatch[event.target.value][companySearchNameKey]
        })
    }

    return (
        <div >
            <div className='flex  flex-row '>
                <div>Company</div>
                <div className=' flex gap-2 flex-col'>
                    <input className=' border-none outline-none ml-3  ' placeholder={'search for company'} onChange={debounceSearch} />
                    {bestMatch?.length > 0 ? <select className='p-2 w-full outline-none   ' onChange={setChoosenCompany}>
                        {
                            bestMatch.map((info, index) => {
                                return <option className=' bg-inherit text-black' id={index} value={index}>
                                    <span>
                                        {info[companySearchNameKey]}
                                    </span>
                                </option>
                            })
                        }
                    </select> : ""
                    }
                </div>
            </div>
        </div>
    )
}


