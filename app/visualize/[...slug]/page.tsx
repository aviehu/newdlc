'use client'

import {useEffect, useState} from "react";
import {visualize} from "../../actions";
import useLoading from "../../../hooks/useLoading";

export default function Page({ params }: { params: { slug: string[] } }) {

    const [sessionId, file, header] = params.slug
    const [html, setHTML] = useState<{__html: string}>({__html: ""});

    const {setLoading} = useLoading()

    useEffect(() => {
        async function createMarkup() {
            setLoading(true)
            const backendHtmlString = await visualize()
            setHTML({__html: backendHtmlString});
            setLoading(false)
        }
        createMarkup()
        console.log({sessionId, file, header})
    }, [])

    return <div dangerouslySetInnerHTML={html} />;
}