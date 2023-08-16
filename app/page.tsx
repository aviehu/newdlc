'use client'

import {Container, Button} from "@mui/material";
import {useEffect} from 'react'
import {runQueries} from "./actions";

export default function HomePage() {
    return (
        <Container maxWidth="sm">
            <Button onClick={() => {runQueries()}}> Test </Button>
        </Container>
    )
}
