import React from 'react';

export default function Template ({pageContext: {data}}) {
    return <div dangerouslySetInnerHTML={{__html: data.html}} />
}
