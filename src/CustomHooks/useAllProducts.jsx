import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export default function useAllProducts() {
    function getAllProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    const response = useQuery({
        queryKey: ['allProducts'],
        queryFn: getAllProducts,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    return response
}
