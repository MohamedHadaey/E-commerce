import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export default function useAllBrands() {
    function getAllBrands() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    };

    const response = useQuery({
        queryKey: ['allBrands'],
        queryFn: getAllBrands,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return response
}
